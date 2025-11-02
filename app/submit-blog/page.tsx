"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function SubmitBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author_name: "",
    author_email: "",
    tags: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const { error: insertError } = await supabase.from("blogs").insert([
        {
          title: formData.title,
          slug,
          content: formData.content,
          author_name: formData.author_name,
          author_email: formData.author_email,
          tags: tagsArray,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])

      if (insertError) throw insertError

      setSuccess(true)
      setTimeout(() => {
        router.push("/blog")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit blog post")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="text-6xl mb-4">✓</div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Thank You!</h1>
          <p className="text-neutral-dark mb-6">
            Your blog post has been submitted for review. <br />
            Admin will approve it shortly.
          </p>
          <Link
            href="/blog"
            className="inline-block px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
          >
            View Blog
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-serif text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Submit Your Blog Post
          </motion.h1>
          <motion.p
            className="text-lg text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Share your legal insights and contribute to our community
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error && (
            <motion.div
              className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">Your Name *</label>
            <input
              type="text"
              name="author_name"
              value={formData.author_name}
              onChange={handleInputChange}
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Your Email *</label>
            <input
              type="email"
              name="author_email"
              value={formData.author_email}
              onChange={handleInputChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Blog Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter an engaging blog title"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={12}
              placeholder="Write your blog post content here... Be detailed and informative."
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g. law, rights, corporate, family"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>

          <p className="text-xs text-neutral-dark">
            Note: Your submission will be reviewed by our admin team before being published.
          </p>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Blog Post"}
            </button>
            <Link
              href="/blog"
              className="px-6 py-2 border border-border hover:bg-neutral-light font-semibold rounded-lg transition-smooth"
            >
              Cancel
            </Link>
          </div>
        </motion.form>
      </section>
    </div>
  )
}
