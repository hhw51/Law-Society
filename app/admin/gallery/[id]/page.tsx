"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// TODO: Fetch from Supabase based on id
const galleryImage = {
  id: "1",
  caption: "Annual Conference 2024",
  category: "Events",
}

export default function EditGalleryImage() {
  const [formData, setFormData] = useState(galleryImage)
  const [saved, setSaved] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving image:", formData)
    // TODO: Save to Supabase
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl font-bold">Edit Gallery Image</h1>
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
        <div>
          <label className="block text-sm font-semibold mb-2">Caption</label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            required
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
            className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
          >
            {saved ? "Saved!" : "Save Changes"}
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
