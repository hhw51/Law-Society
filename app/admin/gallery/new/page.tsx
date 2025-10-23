"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function UploadGalleryImage() {
  const [formData, setFormData] = useState({
    caption: "",
    category: "Events",
    file: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!formData.file) throw new Error("Please select an image")

      const supabase = getSupabaseClient()

      const fileName = `${Date.now()}-${formData.file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, formData.file)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(uploadData.path)

      const { error: insertError } = await supabase.from("gallery").insert([
        {
          image_url: urlData.publicUrl,
          caption: formData.caption,
          category: formData.category,
          visible: true,
        },
      ])

      if (insertError) throw insertError

      router.push("/admin/gallery")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl font-bold">Upload Gallery Image</h1>
        <Link href="/admin/gallery" className="text-primary hover:text-accent font-semibold transition-smooth">
          ← Back
        </Link>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
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
          <label className="block text-sm font-semibold mb-2">Image File</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full text-sm" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Caption</label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            required
            placeholder="Enter image caption"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="Events">Events</option>
            <option value="Office">Office</option>
            <option value="Team">Team</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
          <Link
            href="/admin/gallery"
            className="px-6 py-2 border border-border hover:bg-neutral-light font-semibold rounded-lg transition-smooth"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  )
}
