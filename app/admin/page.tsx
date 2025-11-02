"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    gallery: 0,
    submissions: 0,
    messages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const supabase = getSupabaseClient()

      const [blogsRes, galleryRes, submissionsRes, messagesRes] = await Promise.all([
        supabase.from("blogs").select("count", { count: "exact" }),
        supabase.from("gallery").select("count", { count: "exact" }),
        supabase.from("ask_a_lawyer").select("count", { count: "exact" }),
        supabase.from("contact_messages").select("count", { count: "exact" }),
      ])

      setStats({
        blogs: blogsRes.count || 0,
        gallery: galleryRes.count || 0,
        submissions: submissionsRes.count || 0,
        messages: messagesRes.count || 0,
      })
    } catch (err) {
      console.error("Failed to fetch stats:", err)
    } finally {
      setLoading(false)
    }
  }

  const dashboardStats = [
    { label: "Total Blog Posts", value: stats.blogs, href: "/admin/blog" },
    { label: "Gallery Images", value: stats.gallery, href: "/admin/gallery" },
    { label: "Ask A Lawyer", value: stats.submissions, href: "/admin/submissions" },
    { label: "Contact Messages", value: stats.messages, href: "/admin/submissions" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-neutral-dark">Welcome to PCLDRC Admin Panel</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, i) => (
          <motion.div
            key={i}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-smooth cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => (window.location.href = stat.href)}
          >
            <p className="text-neutral-dark text-sm font-medium mb-2">{stat.label}</p>
            <p className="font-serif text-4xl font-bold text-primary">{loading ? "..." : stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/admin/blog/new"
          className="p-6 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth text-center"
        >
          Create Blog Post
        </Link>
        <Link
          href="/admin/gallery/new"
          className="p-6 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-smooth text-center"
        >
          Upload Image
        </Link>
        <Link
          href="/admin/settings"
          className="p-6 border-2 border-primary text-primary hover:bg-neutral-light font-semibold rounded-lg transition-smooth text-center"
        >
          Manage Settings
        </Link>
      </motion.div>
    </div>
  )
}
