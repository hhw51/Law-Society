"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"
import type { Newsfeed } from "@/lib/types"

export default function AdminNewsfeed() {
  const [items, setItems] = useState<Newsfeed[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setError(null)
      const supabase = getSupabaseClient()

      const { data, error: err } = await supabase.from("newsfeed").select("*").order("created_at", { ascending: false })

      if (err) throw new Error(err.message)
      setItems(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch newsfeed items"
      setError(message)
      console.error("[v0] Newsfeed fetch error:", message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this newsfeed item?")) return

    try {
      const supabase = getSupabaseClient()

      const { error: err } = await supabase.from("newsfeed").delete().eq("id", id)

      if (err) throw new Error(err.message)
      setItems(items.filter((item) => item.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete item"
      setError(message)
      console.error("[v0] Delete error:", message)
    }
  }

  if (error) {
    return (
      <div className="space-y-8">
        <h1 className="font-serif text-4xl font-bold">Newsfeed Management</h1>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold mb-2">Error Loading Newsfeed</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    )
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold">Newsfeed Management</h1>
        <Link
          href="/admin/newsfeed/new"
          className="px-4 md:px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth text-sm md:text-base whitespace-nowrap"
        >
          Add News
        </Link>
      </div>

      <motion.div
        className="border border-border rounded-lg overflow-hidden hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full">
          <thead className="bg-neutral-light border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Source</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-neutral-light transition-smooth">
                <td className="px-6 py-4 font-medium text-sm">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-light text-accent">
                    {item.source_newspaper}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-dark">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    href={`/admin/newsfeed/${item.id}`}
                    className="text-primary hover:text-accent font-semibold transition-smooth text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 font-semibold transition-smooth text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="md:hidden space-y-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="p-4 border border-border rounded-lg bg-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="font-semibold mb-2 text-sm">{item.title}</h3>
            <div className="space-y-2 text-xs">
              <p className="text-neutral-dark">
                <span className="font-semibold">Source:</span> {item.source_newspaper}
              </p>
              <p className="text-neutral-dark">
                <span className="font-semibold">Date:</span> {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <Link
                href={`/admin/newsfeed/${item.id}`}
                className="flex-1 text-center px-2 py-2 text-xs bg-primary text-white rounded hover:bg-primary-light transition-smooth"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 px-2 py-2 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-smooth"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
