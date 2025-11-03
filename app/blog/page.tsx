"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"
import type { BlogPost } from "@/lib/types"

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = getSupabaseClient()

        const { data, error: fetchError } = await supabase
          .from("blogs")
          .select("*")
          .eq("status", "approved")
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError
        setPosts(data || [])
      } catch (err) {
        console.error("Failed to fetch posts:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch blog posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e7b5c]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-[#1e7b5c] text-white py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-serif text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Blog
          </motion.h1>
          <motion.p
            className="text-lg text-gray-100 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Legal insights and updates from our team
          </motion.p>

          {/* ✅ Submit a Blog Button (Visible for everyone) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/submit-blog"
              className="inline-block px-6 py-3 bg-white text-[#1e7b5c] font-semibold rounded-lg shadow hover:bg-gray-100 transition-all"
            >
              ✍️ Submit a Blog
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {error ? (
          <motion.div
            className="p-6 bg-red-50 border border-red-200 rounded-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-900 font-medium">{error}</p>
          </motion.div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-dark">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                className="p-6 border border-border rounded-lg hover:shadow-lg transition-smooth bg-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="font-serif text-2xl font-bold text-[#1e7b5c] flex-1">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#ffb500] transition-smooth">
                      {post.title}
                    </Link>
                  </h2>
                  <span className="text-sm text-neutral-dark whitespace-nowrap ml-4">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-neutral-dark mb-4">{post.content.substring(0, 150)}...</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags?.map((tag) => (
                      <span key={tag} className="text-xs bg-[#1e7b5c]/10 text-[#1e7b5c] px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#1e7b5c] hover:text-[#ffb500] font-semibold transition-smooth"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
