"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Blog Posts", value: "12", href: "/admin/blog" },
    { label: "Gallery Images", value: "24", href: "/admin/gallery" },
    { label: "Pending Submissions", value: "3", href: "/admin/submissions" },
    { label: "Contact Messages", value: "8", href: "/admin/submissions" },
  ]

  const recentActivity = [
    { type: "Blog Post", title: "Understanding Corporate Contracts", date: "2024-01-15" },
    { type: "Gallery Upload", title: "Annual Conference 2024", date: "2024-01-14" },
    { type: "Submission", title: "Legal Consultation Request", date: "2024-01-13" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-neutral-dark">Welcome back to the Law Society admin panel</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-smooth cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => (window.location.href = stat.href)}
          >
            <p className="text-neutral-dark text-sm font-medium mb-2">{stat.label}</p>
            <p className="font-serif text-4xl font-bold text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        className="p-6 bg-card border border-border rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-serif text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex justify-between items-center pb-4 border-b border-border last:border-0">
              <div>
                <p className="font-semibold text-primary">{activity.title}</p>
                <p className="text-sm text-neutral-dark">{activity.type}</p>
              </div>
              <p className="text-sm text-neutral-dark">{new Date(activity.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </motion.div>

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
