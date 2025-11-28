"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import JudgementCard from "@/components/judgement-card"
import type { Judgement } from "@/lib/types"

export default function CaseOfTheWeekPage() {
  const [judgements, setJudgements] = useState<Judgement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJudgements()
  }, [])

  async function fetchJudgements() {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/judgements")
      const data = await res.json()

      if (res.ok && Array.isArray(data)) {
        setJudgements(data)
      } else {
        setError(data.error || "Failed to fetch cases")
        setJudgements([])
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      console.error("[v0] Error fetching judgements:", err)
      setError(errorMessage)
      setJudgements([])
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
            <h1 className="font-serif text-5xl font-bold mb-4">Case of the Week</h1>
            <p className="text-xl text-gray-100">Landmark judgements and important legal precedents</p>
          </motion.div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
              <p className="mt-4 text-neutral-dark">Loading cases...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-lg border border-red-200">
              <p className="text-red-600 text-lg font-semibold">Error</p>
              <p className="text-red-500 mt-2">{error}</p>
            </div>
          ) : judgements.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <p className="text-neutral-dark text-lg">No cases available</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {judgements.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <JudgementCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
