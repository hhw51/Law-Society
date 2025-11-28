"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function NewJudgement() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    case_name: "",
    wp_no: "",
    plaintiff: "",
    defendant: "",
    pdf_link: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (!formData.case_name || !formData.wp_no || !formData.plaintiff || !formData.defendant) {
        throw new Error("Please fill in all required fields")
      }

      const supabase = getSupabaseClient()

      const { error: err } = await supabase.from("judgements").insert([
        {
          case_name: formData.case_name,
          wp_no: formData.wp_no,
          plaintiff: formData.plaintiff,
          defendant: formData.defendant,
          pdf_link: formData.pdf_link || null,
        },
      ])

      if (err) throw new Error(err.message)

      router.push("/admin/judgements")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create case"
      setError(message)
      console.error("[v0] Create error:", message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-4xl font-bold mb-2">Add Case</h1>
        <p className="text-neutral-dark">Create a new case of the week</p>
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
          <label className="block text-sm font-semibold mb-2">Case Name *</label>
          <input
            type="text"
            value={formData.case_name}
            onChange={(e) => setFormData({ ...formData, case_name: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">WP Number (e.g., PLD 2013 Lahore 413) *</label>
          <input
            type="text"
            value={formData.wp_no}
            onChange={(e) => setFormData({ ...formData, wp_no: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Plaintiff *</label>
          <input
            type="text"
            value={formData.plaintiff}
            onChange={(e) => setFormData({ ...formData, plaintiff: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Defendant *</label>
          <input
            type="text"
            value={formData.defendant}
            onChange={(e) => setFormData({ ...formData, defendant: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">PDF Link</label>
          <input
            type="url"
            value={formData.pdf_link}
            onChange={(e) => setFormData({ ...formData, pdf_link: e.target.value })}
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
            {loading ? "Creating..." : "Create Case"}
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
