"use client"

import { motion } from "framer-motion"
import type { Judgement } from "@/lib/types"

interface JudgementCardProps {
  item: Judgement
}

export default function JudgementCard({ item }: JudgementCardProps) {
  const handleOpen = () => {
    if (item.pdf_link) {
      window.open(item.pdf_link, "_blank")
    }
  }

  return (
    <motion.div
      className="p-6 bg-white rounded-lg border-2 border-primary/20 hover:border-accent hover:shadow-lg transition-all cursor-pointer"
      onClick={handleOpen}
      whileHover={{ y: -4 }}
    >
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
          {item.wp_no}
        </span>
        <h3 className="font-serif text-lg font-bold text-primary mb-2">{item.case_name}</h3>
      </div>

      <div className="space-y-2 mb-4 text-sm text-neutral-dark">
        <div>
          <span className="font-semibold">Plaintiff:</span> {item.plaintiff}
        </div>
        <div>
          <span className="font-semibold">Defendant:</span> {item.defendant}
        </div>
      </div>

      {item.pdf_link && (
        <div className="flex items-center text-accent font-semibold text-sm hover:text-accent-light">
          📄 View PDF Document →
        </div>
      )}

      {item.created_at && (
        <div className="mt-4 text-xs text-neutral-light">
          {new Date(item.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      )}
    </motion.div>
  )
}
