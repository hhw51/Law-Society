"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([])

  useEffect(() => {
    const fetch = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })
      setBlogs(data || [])
    }
    fetch()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    const supabase = getSupabaseClient()
    await supabase.from("blogs").update({ status }).eq("id", id)
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
      <div className="space-y-6">
        {blogs.map((b) => (
          <div key={b.id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{b.title}</h2>
            <p className="text-sm text-gray-500 mb-2">Status: {b.status}</p>
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(b.id, "approved")}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(b.id, "rejected")}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
