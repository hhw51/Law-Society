"use client"

import { motion } from "framer-motion"
import { getWordOfTheWeek } from "@/lib/lexicon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function WordOfTheWeek() {
  const entry = getWordOfTheWeek()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="border-2 border-primary/10 shadow-lg hover:shadow-xl transition-smooth overflow-hidden group">
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <span className="font-serif font-bold text-sm tracking-wider uppercase">Word of the Week</span>
          </div>
          <Link
            href={`/lexicon?q=${encodeURIComponent(entry.term)}`}
            className="text-xs font-semibold text-accent hover:text-white flex items-center gap-1 transition-colors"
          >
            Full Lexicon <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <CardHeader className="pt-6">
          <CardTitle className="font-serif text-3xl sm:text-4xl text-primary group-hover:text-primary-light transition-smooth">
            {entry.term}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-neutral-dark leading-relaxed">{entry.definition}</p>
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-sans italic text-muted-foreground">
              Reference: <span className="font-semibold text-foreground">{entry.reference}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
