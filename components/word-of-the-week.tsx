"use client"

import { motion } from "framer-motion"
import { getWordOfTheWeek } from "@/lib/lexicon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function WordOfTheWeekCard() {
  const entry = getWordOfTheWeek()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <Card className="border-2 border-primary/10 shadow-lg hover:shadow-xl transition-all overflow-hidden group max-w-4xl mx-auto">
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-md">
                <BookOpen className="w-4 h-4 text-accent" />
            </div>
            <span className="font-serif font-bold text-xs tracking-wider uppercase">Highlight: Word of the Week</span>
          </div>
          <Link
            href="/dictionary"
            className="text-xs font-semibold text-accent hover:text-white flex items-center gap-1 transition-colors"
          >
            Full Dictionary <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <CardHeader className="pt-6">
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-3xl sm:text-4xl text-primary group-hover:text-primary-light transition-all">
              {entry.term}
            </CardTitle>
            <span className="text-[10px] font-bold px-2 py-1 bg-neutral-light rounded-full text-neutral-dark uppercase tracking-widest">
                {entry.category}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg md:text-xl text-neutral-dark leading-relaxed italic">
            "{entry.definition}"
          </p>
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-sans text-muted-foreground leading-relaxed">
              <span className="font-bold text-primary uppercase mr-2 text-[10px] tracking-tighter">Source Citation:</span> 
              {entry.reference}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}