"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { getSupabaseClient } from "@/lib/supabase-client"

interface ChatbotModalProps {
  onClose: () => void
}

export default function ChatbotModal({ onClose }: ChatbotModalProps) {
  const [step, setStep] = useState<"options" | "consultation" | "submit-blog" | "ask-lawyer">("options")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    file: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const options = [
    {
      id: "consultation",
      label: "Book a Consultation",
      icon: "📞",
      description: "Schedule a meeting with our legal team",
    },
    {
      id: "submit-blog",
      label: "Submit Blog Post",
      icon: "✍️",
      description: "Contribute your legal insights",
    },
    {
      id: "ask-lawyer",
      label: "Ask A Lawyer",
      icon: "❓",
      description: "Get quick answers to your questions",
    },
  ]

  const lawyerTopics = [
    { value: "corporate", label: "Corporate Law" },
    { value: "family", label: "Family Law" },
    { value: "criminal", label: "Criminal Law" },
    { value: "civil", label: "Civil Rights" },
    { value: "labor", label: "Labor & Employment" },
    { value: "other", label: "Other" },
  ]

  const handleOptionClick = (optionId: string) => {
    if (optionId === "submit-blog") {
      window.open("/submit-blog", "_blank")
      onClose()
    } else {
      setStep(optionId as any)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

      const { error: insertError } = await supabase.from("ask_a_lawyer").insert([
        {
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
          file_url: fileUrl,
          status: "new",
        },
      ])

      if (insertError) throw insertError

      await fetch("/api/send-lawyer-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
        }),
      })

      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit question")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Modal - Redesigned with better spacing and visuals */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-background rounded-2xl shadow-2xl z-50 overflow-hidden border border-border"
      >
        {/* Header - Improved styling */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-5 flex justify-between items-center">
          <div>
            <h2 className="font-serif font-bold text-lg">Legal Assistance</h2>
            <p className="text-xs text-gray-200">PCLDRC Support</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-smooth" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <motion.div className="text-center py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div
                className="text-5xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                ✓
              </motion.div>
              <p className="text-primary font-semibold mb-1">Thank you!</p>
              <p className="text-sm text-neutral-dark">Your request has been submitted successfully.</p>
            </motion.div>
          ) : step === "options" ? (
            <div className="space-y-3">
              <p className="text-sm text-neutral-dark mb-4 font-medium">How can we assist you?</p>
              {options.map((option, i) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className="w-full p-4 text-left border border-border rounded-lg hover:bg-neutral-light hover:border-accent transition-smooth group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl group-hover:scale-110 transition-transform">{option.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-primary">{option.label}</p>
                      <p className="text-xs text-neutral-dark">{option.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : step === "consultation" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
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
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Topic</label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                >
                  <option value="">Select topic</option>
                  {lawyerTopics.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
                  placeholder="Tell us about your consultation needs..."
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("options")}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-neutral-light transition-smooth text-sm font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-accent hover:bg-accent-light text-primary rounded-lg transition-smooth text-sm font-medium disabled:opacity-50"
                >
                  {loading ? "Booking..." : "Book Now"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
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
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Legal Topic</label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                >
                  <option value="">Select topic</option>
                  {lawyerTopics.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Question</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
                  placeholder="Ask your legal question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Attach File (Optional)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-sm cursor-pointer file:mr-2 file:px-3 file:py-1 file:border file:border-border file:rounded file:text-sm file:bg-neutral-light"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("options")}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-neutral-light transition-smooth text-sm font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-accent hover:bg-accent-light text-primary rounded-lg transition-smooth text-sm font-medium disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </>
  )
}
