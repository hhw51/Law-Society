"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { getSupabaseClient } from "@/lib/supabase-client"
import type { Judgement } from "@/lib/types"

export default function EditJudgement() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Judgement | null>(null)

  useEffect(() => {
    fetchCase()
  }, [id])

  const fetchCase = async () => {
    try {
      setError(null)
      const supabase = getSupabaseClient()

      const { data, error: err } = await supabase.from("judgements").select("*").eq("id", id).single()

      if (err) throw new Error(err.message)
      setFormData(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch case"
      setError(message)
      console.error("[v0] Fetch error:", message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!formData || !formData.case_name || !formData.wp_no || !formData.plaintiff || !formData.defendant) {
        throw new Error("Please fill in all required fields")
      }

      const supabase = getSupabaseClient()

      const { error: err } = await supabase.from("judgements").update(formData).eq("id", id)

      if (err) throw new Error(err.message)

      router.push("/admin/judgements")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update case"
      setError(message)
      console.error("[v0] Update error:", message)
    } finally {
      setSaving(false)
    }
  }

  if (error) {
    return (
      <div className="space-y-8">
        <h1 className="font-serif text-4xl font-bold">Edit Case</h1>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold mb-2">Error Loading Case</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (loading || !formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-4xl font-bold mb-2">Edit Case</h1>
        <p className="text-neutral-dark">Update case of the week</p>
      </motion.div>

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
          <label className="block text-sm font-semibold mb-2">WP Number *</label>
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
            value={formData.pdf_link || ""}
            onChange={(e) => setFormData({ ...formData, pdf_link: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-6 py-3 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
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
