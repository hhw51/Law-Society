"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    file: null as File | null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = getSupabaseClient()

      let fileUrl = null
      if (formData.file) {
        const fileName = `${Date.now()}-${formData.file.name}`
        const { data, error: uploadError } = await supabase.storage
          .from("ask_a_lawyer_uploads")
          .upload(fileName, formData.file)

        if (uploadError) throw uploadError
        fileUrl = data?.path || null
      }

      const { error: insertError } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          file_url: fileUrl,
        },
      ])

      if (insertError) throw insertError

      await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "", file: null })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-serif text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-lg text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            We're here to help. Reach out to us with any questions or inquiries.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-semibold text-primary mb-2">Address</h3>
              <p className="text-neutral-dark">123 Legal Street, City, State 12345</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Phone</h3>
              <p className="text-neutral-dark">(555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Email</h3>
              <p className="text-neutral-dark">info@lawsociety.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Hours</h3>
              <p className="text-neutral-dark">Mon - Fri: 9:00 AM - 5:00 PM</p>
              <p className="text-neutral-dark">Sat - Sun: Closed</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {error && (
              <motion.div
                className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            {submitted && (
              <motion.div
                className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Your message..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Attach File (Optional)</label>
              <input type="file" onChange={handleFileChange} className="w-full text-sm" />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-smooth disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
