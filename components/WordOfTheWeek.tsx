"use client"

import React, { useMemo } from 'react'
import { DIGNITY_LEXICON, LexiconEntry } from './lexiconData'
import { BookOpen, Quote } from 'lucide-react'
import Link from 'next/link'

export default function WordOfTheWeek() {
  // Logic to select a word based on the current week of the year
  const selectedWord = useMemo(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const diff = now.getTime() - start.getTime()
    const oneWeek = 1000 * 60 * 60 * 24 * 7
    const weekIndex = Math.floor(diff / oneWeek)
    
    // Use modulo to wrap around if weekIndex exceeds array length
    return DIGNITY_LEXICON[weekIndex % DIGNITY_LEXICON.length]
  }, [])

  if (!selectedWord) return null

  return (
    <section className="py-12 bg-neutral-light/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-background border border-border rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative Background Icon */}
          <Quote className="absolute top-6 right-8 w-24 h-24 text-primary/5 -z-0" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Dignity Dictionary: Word of the Week
              </span>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl text-neutral-dark mb-2">
                  {selectedWord.term}
                </h2>
                <span className="inline-block px-3 py-1 rounded-full bg-neutral-light text-[10px] font-semibold text-neutral-dark uppercase tracking-tight">
                  {selectedWord.category}
                </span>
              </div>

              <div className="flex flex-col justify-between h-full">
                <p className="text-lg md:text-xl text-foreground leading-relaxed italic mb-8">
                  "{selectedWord.definition}"
                </p>

                <div className="space-y-4">
                  <div className="text-sm text-neutral-dark/70 border-l-2 border-primary/30 pl-4">
                    <span className="font-bold block text-xs uppercase mb-1">Academic Citation</span>
                    {selectedWord.reference}
                  </div>

                  <Link 
                    href="/testaments/dictionary" 
                    className="inline-flex items-center text-sm font-bold text-primary hover:underline group"
                  >
                    Explore Full Lexicon
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}