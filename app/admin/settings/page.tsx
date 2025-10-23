"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Law Society",
    email: "info@lawsociety.com",
    phone: "(555) 123-4567",
    address: "123 Legal Street, City, State 12345",
    saved: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving settings:", settings)
    // TODO: Save to Supabase
    setSettings((prev) => ({ ...prev, saved: true }))
    setTimeout(() => {
      setSettings((prev) => ({ ...prev, saved: false }))
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="font-serif text-4xl font-bold">Settings</h1>

      {/* Settings Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6 p-6 bg-card border border-border rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <label className="block text-sm font-semibold mb-2">Site Name</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={settings.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Address</label>
          <textarea
            name="address"
            value={settings.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
        >
          {settings.saved ? "Saved!" : "Save Settings"}
        </button>
      </motion.form>
    </div>
  )
}
