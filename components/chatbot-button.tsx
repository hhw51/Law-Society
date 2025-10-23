"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatbotModal from "./chatbot-modal"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent hover:bg-accent-light text-primary rounded-full shadow-lg flex items-center justify-center z-30 transition-smooth"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask a lawyer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>{isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}</AnimatePresence>
    </>
  )
}
