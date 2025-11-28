"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import NewsfeedCard from "@/components/newsfeed-card"
import type { Newsfeed } from "@/lib/types"

export default function NewsfeedPage() {
  const [newsfeed, setNewsfeed] = useState<Newsfeed[]>([])
  const [selectedNewspaper, setSelectedNewspaper] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const newspapers = ["all", "daily times", "dawn posts", "miscellaneous", "the guardian", "the news", "tribune"]

  useEffect(() => {
    fetchNewsfeed()
  }, [selectedNewspaper])

  async function fetchNewsfeed() {
    try {
      setLoading(true)
      setError(null)
      const params = selectedNewspaper !== "all" ? `?newspaper=${encodeURIComponent(selectedNewspaper)}` : ""
      const res = await fetch(`/api/newsfeed${params}`)
      const data = await res.json()

      if (res.ok && Array.isArray(data)) {
        setNewsfeed(data)
      } else {
        setError(data.error || "Failed to fetch newsfeed")
        setNewsfeed([])
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      console.error("[v0] Error fetching newsfeed:", err)
      setError(errorMessage)
      setNewsfeed([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-5xl font-bold mb-4">Newsfeed</h1>
            <p className="text-xl text-gray-100">
              Stay updated with legal news, insights, and developments from top publications
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h3 className="font-semibold text-primary mb-4">Filter by Newspaper:</h3>
          <div className="flex flex-wrap gap-3">
            {newspapers.map((newspaper) => (
              <button
                key={newspaper}
                onClick={() => setSelectedNewspaper(newspaper)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedNewspaper === newspaper
                    ? "bg-accent text-primary shadow-md"
                    : "bg-neutral-light text-primary hover:bg-neutral-lighter border border-border"
                }`}
              >
                {newspaper.charAt(0).toUpperCase() + newspaper.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsfeed Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
              <p className="mt-4 text-neutral-dark">Loading newsfeed...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-lg border border-red-200">
              <p className="text-red-600 text-lg font-semibold">Error</p>
              <p className="text-red-500 mt-2">{error}</p>
            </div>
          ) : newsfeed.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <p className="text-neutral-dark text-lg">No articles found</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {newsfeed.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <NewsfeedCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
