"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"
import type { Blog } from "@/lib/types"

export default function AdminBlog() {
  const [posts, setPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const supabase = getSupabaseClient()

      const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      console.error("Failed to fetch posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const supabase = getSupabaseClient()

      const { error } = await supabase.from("blogs").delete().eq("id", id)

      if (error) throw error
      setPosts(posts.filter((p) => p.id !== id))
    } catch (err) {
      console.error("Failed to delete post:", err)
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
        <h1 className="font-serif text-4xl font-bold">Blog Management</h1>
        <Link
          href="/admin/blog/new"
          className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
        >
          New Post
        </Link>
      </div>

      {/* Blog Posts Table */}
      <motion.div
        className="border border-border rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full">
          <thead className="bg-neutral-light border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border hover:bg-neutral-light transition-smooth">
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      post.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : post.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-dark">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-primary hover:text-accent font-semibold transition-smooth"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800 font-semibold transition-smooth"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
