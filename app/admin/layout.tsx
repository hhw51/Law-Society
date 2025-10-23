"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Gallery", href: "/admin/gallery" },
    { label: "Submissions", href: "/admin/submissions" },
    { label: "Settings", href: "/admin/settings" },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-primary text-white transition-all duration-300 flex flex-col`}
        initial={{ x: -256 }}
        animate={{ x: 0 }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-primary-light flex items-center justify-between">
          {sidebarOpen && <span className="font-serif font-bold text-lg">Admin</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-primary-light rounded transition-smooth"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary-light transition-smooth text-sm font-medium"
              title={item.label}
            >
              <div className="w-5 h-5 bg-accent rounded" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-primary-light">
          <button className="w-full px-4 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth text-sm">
            {sidebarOpen ? "Logout" : "Out"}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
