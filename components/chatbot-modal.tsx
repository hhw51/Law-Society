"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { getSupabaseClient } from "@/lib/supabase-client"

interface ChatbotModalProps {
  onClose: () => void
}

export default function ChatbotModal({ onClose }: ChatbotModalProps) {
  const [step, setStep] = useState<"options" | "form">("options")
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
    { id: "consultation", label: "Book a Consultation" },
    { id: "faq", label: "View FAQs" },
    { id: "submit", label: "Submit a Question" },
  ]

  const handleOptionClick = (optionId: string) => {
    if (optionId === "submit") {
      setStep("form")
    } else {
      console.log("Selected:", optionId)
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

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-background rounded-lg shadow-2xl z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h2 className="font-serif font-bold text-lg">Ask A Lawyer</h2>
          <button onClick={onClose} className="p-1 hover:bg-primary-light rounded transition-smooth" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <motion.div className="text-center py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-4xl mb-3">✓</div>
              <p className="text-primary font-semibold mb-2">Thank you!</p>
              <p className="text-sm text-neutral-dark">Your question has been submitted successfully.</p>
            </motion.div>
          ) : step === "options" ? (
            <div className="space-y-3">
              <p className="text-sm text-neutral-dark mb-4">How can we help you today?</p>
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className="w-full p-3 text-left border border-border rounded-lg hover:bg-neutral-light hover:border-accent transition-smooth text-sm font-medium"
                >
                  {option.label}
                </button>
              ))}
            </div>
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
                <label className="block text-sm font-medium mb-1">Topic</label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                >
                  <option value="">Select a topic</option>
                  <option value="corporate">Corporate Law</option>
                  <option value="family">Family Law</option>
                  <option value="criminal">Criminal Law</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
                  placeholder="Describe your question..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Attach File (Optional)</label>
                <input type="file" onChange={handleFileChange} className="w-full text-sm" />
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
