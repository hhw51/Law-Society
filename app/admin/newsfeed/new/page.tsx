"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getSupabaseClient } from "@/lib/supabase-client"

const newspapers = ["Daily Times", "Dawn Posts", "Miscellaneous", "The Guardian", "The News", "Tribune"]

export default function NewNewsfeed() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    article_url: "",
    image_url: "",
    source_newspaper: newspapers[0],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (!formData.title || !formData.description || !formData.source_newspaper) {
        throw new Error("Please fill in all required fields")
      }

      const supabase = getSupabaseClient()

      const { error: err } = await supabase.from("newsfeed").insert([
        {
          title: formData.title,
          description: formData.description,
          article_url: formData.article_url,
          image_url: formData.image_url,
          source_newspaper: formData.source_newspaper,
        },
      ])

      if (err) throw new Error(err.message)

      router.push("/admin/newsfeed")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create newsfeed item"
      setError(message)
      console.error("[v0] Create error:", message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-4xl font-bold mb-2">Add News</h1>
        <p className="text-neutral-dark">Create a new newsfeed entry</p>
      </motion.div>

      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold mb-2">Error</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 bg-card border border-border rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <label className="block text-sm font-semibold mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Newspaper Source *</label>
          <select
            value={formData.source_newspaper}
            onChange={(e) => setFormData({ ...formData, source_newspaper: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            {newspapers.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Article URL</label>
          <input
            type="url"
            value={formData.article_url}
            onChange={(e) => setFormData({ ...formData, article_url: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image URL</label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create News"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border-2 border-primary text-primary hover:bg-neutral-light font-semibold rounded-lg transition-smooth"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  )
}
