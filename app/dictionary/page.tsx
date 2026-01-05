"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DIGNITY_LEXICON } from '@/components/lexiconData'
import WordOfTheWeekCard from "@/components/word-of-the-week"
import { Search, Book, Tag, Scale, Globe, Lightbulb, ShieldCheck } from 'lucide-react'

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter logic for search
  const filteredLexicon = useMemo(() => {
    return DIGNITY_LEXICON.filter(item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Helper to get icons for categories
  const getCategoryIcon = (category: string) => {
    if (category.includes("Legal")) return <Scale className="w-4 h-4" />
    if (category.includes("Global")) return <Globe className="w-4 h-4" />
    if (category.includes("Foundational")) return <ShieldCheck className="w-4 h-4" />
    if (category.includes("Emerging")) return <Lightbulb className="w-4 h-4" />
    return <Tag className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-neutral-light/20 pb-20">
      {/* Header Section */}
      <section className="bg-primary text-white pt-20 pb-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Dignity Dictionary
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Explore the vocabulary of human worth. A comprehensive guide to the foundational, 
              legal, and emerging concepts in Dignity Rights.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-24">
        {/* FEATURED WORD OF THE WEEK */}
        <WordOfTheWeekCard />

        {/* SEARCH BAR */}
        <div className="sticky top-24 z-30 mb-12">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors w-6 h-6" />
            <input 
              type="text"
              placeholder="Search terms, categories, or keywords..."
              className="w-full pl-14 pr-6 py-5 rounded-2xl border border-border bg-white shadow-xl focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* DICTIONARY LIST */}
        <div className="space-y-6">
          <AnimatePresence mode='popLayout'>
            {filteredLexicon.map((item : any, index : any) => (
              <motion.div 
                key={item.term}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="font-serif text-2xl font-bold text-primary group-hover:text-primary-light transition-colors">
                        {item.term}
                      </h2>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-light text-neutral-dark text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                    </div>
                    
                    <p className="text-neutral-dark leading-relaxed text-lg mb-6">
                      {item.definition}
                    </p>

                    <div className="pt-4 border-t border-neutral-light/50">
                      <p className="text-xs text-neutral-dark/50 leading-tight">
                        <span className="font-bold text-neutral-dark/70 uppercase text-[9px] mr-2">Citation:</span> 
                        {item.reference}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* EMPTY STATE */}
          {filteredLexicon.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-2xl border border-dashed border-border"
            >
              <Book className="mx-auto w-16 h-16 text-neutral-light mb-4" />
              <h3 className="text-xl font-serif font-bold text-neutral-dark">No terms found</h3>
              <p className="text-neutral-dark/60 mt-2">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => setSearchTerm("")}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}