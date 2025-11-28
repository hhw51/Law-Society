"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"
import type { Judgement } from "@/lib/types"

export default function AdminJudgements() {
  const [cases, setCases] = useState<Judgement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCases()
  }, [])

  const fetchCases = async () => {
    try {
      setError(null)
      const supabase = getSupabaseClient()

      const { data, error: err } = await supabase
        .from("judgements")
        .select("*")
        .order("created_at", { ascending: false })

      if (err) throw new Error(err.message)
      setCases(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch cases"
      setError(message)
      console.error("[v0] Cases fetch error:", message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case?")) return

    try {
      const supabase = getSupabaseClient()

      const { error: err } = await supabase.from("judgements").delete().eq("id", id)

      if (err) throw new Error(err.message)
      setCases(cases.filter((c) => c.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete case"
      setError(message)
      console.error("[v0] Delete error:", message)
    }
  }

  if (error) {
    return (
      <div className="space-y-8">
        <h1 className="font-serif text-4xl font-bold">Case of the Week Management</h1>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold mb-2">Error Loading Cases</p>
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl font-bold">Case of the Week Management</h1>
        <Link
          href="/admin/judgements/new"
          className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
        >
          Add Case
        </Link>
      </div>

      {/* Cases Table */}
      <motion.div
        className="border border-border rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full">
          <thead className="bg-neutral-light border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Case Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">WP No.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Plaintiff</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Defendant</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="border-b border-border hover:bg-neutral-light transition-smooth">
                <td className="px-6 py-4 font-medium">{caseItem.case_name}</td>
                <td className="px-6 py-4 text-sm">{caseItem.wp_no}</td>
                <td className="px-6 py-4 text-sm">{caseItem.plaintiff}</td>
                <td className="px-6 py-4 text-sm">{caseItem.defendant}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    href={`/admin/judgements/${caseItem.id}`}
                    className="text-primary hover:text-accent font-semibold transition-smooth"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(caseItem.id)}
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
