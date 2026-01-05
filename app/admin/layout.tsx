"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { adminSignOut } from "@/lib/auth-actions"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Blog", href: "/admin/blog", icon: "📝" },
    { label: "Gallery", href: "/admin/gallery", icon: "🖼️" },
    { label: "Newsfeed", href: "/admin/newsfeed", icon: "📰" },
    { label: "Case of the Week", href: "/admin/judgements", icon: "⚖️" },
    { label: "Submissions", href: "/admin/submissions", icon: "📬" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" },
  ]

  const handleLogout = async () => {
    await adminSignOut()
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex h-screen bg-background flex-col lg:flex-row">
      <div className="lg:hidden bg-primary text-white p-4 flex items-center justify-between border-b border-primary-light">
        <h1 className="font-serif font-bold text-lg">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-primary-light rounded transition-smooth"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} />}
      </AnimatePresence>

      <motion.aside
        className={`fixed lg:relative top-0 left-0 h-screen lg:h-auto z-50 w-64 bg-primary text-white flex flex-col lg:w-64 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        initial={false}
        animate={{ x: sidebarOpen ? 0 : typeof window !== "undefined" && window.innerWidth >= 1024 ? 0 : -256 }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-primary-light flex items-center justify-between">
          <span className="font-serif font-bold text-lg">Admin Panel</span>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 hover:bg-primary-light rounded transition-smooth"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-light transition-smooth text-sm font-medium"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-light">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth text-sm"
          >
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
