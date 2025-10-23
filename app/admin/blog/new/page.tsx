"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function NewBlogPost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
    status: "draft" as "draft" | "pending" | "approved",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = getSupabaseClient()

      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      const { error: insertError } = await supabase.from("blogs").insert([
        {
          title: formData.title,
          slug,
          content: formData.content,
          tags: formData.tags,
          status: formData.status,
          author_id: "current-user-id", // TODO: Get from auth
        },
      ])

      if (insertError) throw insertError

      router.push("/admin/blog")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl font-bold">Create New Blog Post</h1>
        <Link href="/admin/blog" className="text-primary hover:text-accent font-semibold transition-smooth">
          ← Back
        </Link>
      </div>

      {/* Form */}
      <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {error && (
          <motion.div
            className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter blog post title"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={10}
            placeholder="Write your blog post content here..."
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
          <Link
            href="/admin/blog"
            className="px-6 py-2 border border-border hover:bg-neutral-light font-semibold rounded-lg transition-smooth"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  )
}
