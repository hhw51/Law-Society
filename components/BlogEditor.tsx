"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { useCallback } from "react"
import { getSupabaseClient } from "@/lib/supabase-client"

interface BlogEditorProps {
  content: string
  setContent: (value: string) => void
}

export default function BlogEditor({ content, setContent }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: { class: "mx-auto my-4 rounded-lg" },
      }),
      Placeholder.configure({
        placeholder: "Write your amazing blog here...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  })

  const addImage = useCallback(async () => {
    const supabase = getSupabaseClient()
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      const fileName = `${Date.now()}-${file.name}`
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file)

      if (error) {
        console.error(error)
        return
      }

      const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName)
      editor?.chain().focus().setImage({ src: data.publicUrl }).run()
    }
    input.click()
  }, [editor])

  if (!editor) return null

  return (
    <div className="border rounded-lg p-3 space-y-3 bg-white">
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
        {[ 
          { label: "Bold", action: () => editor.chain().focus().toggleBold().run() },
          { label: "Italic", action: () => editor.chain().focus().toggleItalic().run() },
          { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
          { label: "List", action: () => editor.chain().focus().toggleBulletList().run() },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            {btn.label}
          </button>
        ))}

        <button onClick={addImage} className="px-2 py-1 border rounded hover:bg-gray-100">
          🖼️ Add Image
        </button>

        {/* Optional image alignment tools */}
        <button
          onClick={() => editor.chain().focus().updateAttributes("image", { class: "float-left mr-4 my-2 rounded" }).run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          ⬅️ Left
        </button>
        <button
          onClick={() => editor.chain().focus().updateAttributes("image", { class: "mx-auto my-4 rounded" }).run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          ⬆️ Center
        </button>
        <button
          onClick={() => editor.chain().focus().updateAttributes("image", { class: "float-right ml-4 my-2 rounded" }).run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          ➡️ Right
        </button>
      </div>

      <EditorContent editor={editor} className="prose max-w-none min-h-[300px]" />
    </div>
  )
}
