"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BlogEditor from "@/components/BlogEditor"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function NewBlogPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!title || !content) return alert("Please fill all fields.")
    setLoading(true)

    const supabase = getSupabaseClient()
    const slug = title.toLowerCase().replace(/\s+/g, "-")

    const { error } = await supabase.from("blogs").insert([
      {
        title,
        slug,
        content,
        status: "pending",
        tags: tags.split(",").map((t) => t.trim()),
      },
    ])

    setLoading(false)
    if (error) return alert(error.message)

    alert("Blog submitted for approval!")
    router.push("/dashboard/blog/manage")
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

      <input
        className="w-full border rounded p-2 mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <BlogEditor content={content} setContent={setContent} />

      <input
        className="w-full border rounded p-2 my-4"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#1e7b5c] text-white px-6 py-2 rounded hover:bg-[#166549]"
      >
        {loading ? "Submitting..." : "Submit for Approval"}
      </button>
    </div>
  )
}
