"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// TODO: Fetch from Supabase based on id
const blogPost = {
  id: "1",
  title: "Understanding Corporate Contracts",
  content: "A comprehensive guide to corporate contract essentials.",
  category: "Corporate Law",
  status: "published",
}

export default function EditBlogPost() {
  const [formData, setFormData] = useState(blogPost)
  const [saved, setSaved] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving blog post:", formData)
    // TODO: Save to Supabase
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl font-bold">Edit Blog Post</h1>
        <Link href="/admin/blog" className="text-primary hover:text-accent font-semibold transition-smooth">
          ← Back
        </Link>
      </div>

      {/* Form */}
      <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Corporate Law">Corporate Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Criminal Law">Criminal Law</option>
            </select>
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
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={10}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
          >
            {saved ? "Saved!" : "Save Changes"}
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
