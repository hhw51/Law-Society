"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getSupabaseClient } from "@/lib/supabase-client"
import type { AskALawyer, ContactMessage } from "@/lib/types"

type Submission = (AskALawyer & { type: "ask-a-lawyer" }) | (ContactMessage & { type: "contact" })

export default function AdminSubmissions() {
  const [items, setItems] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const supabase = getSupabaseClient()

      const { data: askData, error: askError } = await supabase
        .from("ask_a_lawyer")
        .select("*")
        .order("created_at", { ascending: false })

      if (askError) throw askError

      const { data: contactData, error: contactError } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (contactError) throw contactError

      // Combine and sort by date
      const combined: Submission[] = [
        ...(askData?.map((item) => ({ ...item, type: "ask-a-lawyer" as const })) || []),
        ...(contactData?.map((item) => ({ ...item, type: "contact" as const })) || []),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      setItems(combined)
    } catch (err) {
      console.error("Failed to fetch submissions:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, type: "ask-a-lawyer" | "contact") => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    try {
      const supabase = getSupabaseClient()
      const table = type === "ask-a-lawyer" ? "ask_a_lawyer" : "contact_messages"

      const { error } = await supabase.from(table).delete().eq("id", id)

      if (error) throw error
      setItems(items.filter((item) => item.id !== id))
    } catch (err) {
      console.error("Failed to delete submission:", err)
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
      <h1 className="font-serif text-4xl font-bold">Submissions</h1>

      {/* Submissions Table */}
      <motion.div
        className="border border-border rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <table className="w-full">
          <thead className="bg-neutral-light border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-neutral-light transition-smooth">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-sm text-neutral-dark">{item.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {item.type === "ask-a-lawyer" ? "Ask A Lawyer" : "Contact"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-dark">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="text-primary hover:text-accent font-semibold transition-smooth">View</button>
                  <button
                    onClick={() => handleDelete(item.id, item.type)}
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
