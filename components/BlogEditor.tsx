"use client"

import { useCallback } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { getSupabaseClient } from "@/lib/supabase-client"

interface BlogEditorProps {
  content: string
  setContent: (value: string) => void
}

export default function BlogEditor({ content, setContent }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  const addImage = useCallback(async () => {
    if (!editor) return

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
        alert("Image upload failed: " + error.message)
        return
      }

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName)

      // 👇 Use type assertion here to silence TS safely
      ;(editor.chain() as any).focus().setImage({ src: data.publicUrl }).run()
    }

    input.click()
  }, [editor])

  if (!editor) return null

  return (
    <div className="border rounded-lg p-3 space-y-3 bg-white shadow-sm">
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

        <button
          onClick={addImage}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          🖼️ Add Image
        </button>
      </div>

      <EditorContent editor={editor} className="prose max-w-none min-h-[300px]" />
    </div>
  )
}
