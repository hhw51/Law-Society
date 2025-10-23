"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"
import type { Gallery } from "@/lib/types"

export default function AdminGallery() {
  const [images, setImages] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const supabase = getSupabaseClient()

      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setImages(data || [])
    } catch (err) {
      console.error("Failed to fetch images:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from("gallery").delete().eq("id", id)

      if (error) throw error
      setImages(images.filter((img) => img.id !== id))
    } catch (err) {
      console.error("Failed to delete image:", err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl font-bold">Gallery Management</h1>
        <Link
          href="/admin/gallery/new"
          className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
        >
          Upload Image
        </Link>
      </div>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {images.map((image, i) => (
          <motion.div
            key={image.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-smooth"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <img
              src={image.image_url || "/placeholder.svg"}
              alt={image.caption}
              className="w-full aspect-square object-cover"
            />
            <div className="p-4 space-y-2">
              <p className="font-medium text-sm">{image.caption}</p>
              <p className="text-xs text-neutral-dark">{image.category}</p>
              <p className="text-xs text-neutral-dark">{new Date(image.created_at).toLocaleDateString()}</p>
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/admin/gallery/${image.id}`}
                  className="flex-1 px-3 py-1 text-center text-primary hover:text-accent font-semibold transition-smooth text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="flex-1 px-3 py-1 text-center text-red-600 hover:text-red-800 font-semibold transition-smooth text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
