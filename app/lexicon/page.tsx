"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { lexicon } from "@/lib/lexicon"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Book } from "lucide-react"

const CATEGORIES = ["All", "Foundational Principles", "Legal & Political Dimensions", "Social Dignity"]

function LexiconContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialSearch = searchParams.get("q") || ""
  const initialCategory = searchParams.get("cat") || "All"

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  // Update URL when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams()
      if (searchQuery) params.set("q", searchQuery)
      if (activeCategory !== "All") params.set("cat", activeCategory)

      const query = params.toString()
      router.push(query ? `?${query}` : "/lexicon", { scroll: false })
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, activeCategory, router])

  const filteredLexicon = lexicon.filter((entry) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      entry.term.toLowerCase().includes(query) ||
      entry.definition.toLowerCase().includes(query) ||
      entry.category.toLowerCase().includes(query) ||
      entry.reference.toLowerCase().includes(query)

    const matchesCategory = activeCategory === "All" || entry.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  return (
    <>
      {/* Interactive Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <Card className="border-border shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search terms or definitions..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {CATEGORIES.map((cat) => (
                  <Badge
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    className="cursor-pointer px-4 py-1.5 transition-smooth"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-1 justify-center border-t pt-6">
              {alphabet.map((letter) => {
                const hasTerms = filteredLexicon.some((e) => e.term.startsWith(letter))
                return (
                  <button
                    key={letter}
                    disabled={!hasTerms}
                    className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-smooth ${
                      hasTerms
                        ? "text-primary hover:bg-primary hover:text-white"
                        : "text-muted-foreground opacity-30 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      const el = document.getElementById(`section-${letter}`)
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
                    }}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Lexicon Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="space-y-16">
          {alphabet.map((letter) => {
            const termsInLetter = filteredLexicon.filter((e) => e.term.startsWith(letter))
            if (termsInLetter.length === 0) return null

            return (
              <div key={letter} id={`section-${letter}`} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-serif text-4xl font-bold text-primary">{letter}</h2>
                  <div className="h-px bg-border flex-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {termsInLetter.map((entry, idx) => (
                    <motion.div
                      key={entry.term}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full border-border hover:border-accent hover:shadow-md transition-smooth">
                        <CardHeader>
                          <div className="flex justify-between items-start gap-4">
                            <CardTitle className="font-serif text-2xl text-primary">{entry.term}</CardTitle>
                            <Badge variant="outline" className="bg-primary/5">
                              {entry.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-neutral-dark leading-relaxed italic">"{entry.definition}"</p>
                          <div className="pt-4 border-t border-border space-y-2">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Reference
                            </p>
                            <p className="text-sm text-foreground font-medium">{entry.reference}</p>
                            {entry.contextNotes && (
                              <div className="bg-neutral-light p-3 rounded-md mt-4 border-l-2 border-accent">
                                <p className="text-xs font-bold text-accent uppercase mb-1 flex items-center gap-1">
                                  <Book className="w-3 h-3" /> Dignity in Context
                                </p>
                                <p className="text-sm text-neutral-dark">{entry.contextNotes}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {filteredLexicon.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground font-serif">No terms found matching your criteria.</p>
          </div>
        )}
      </section>
    </>
  )
}

export default function LexiconPage() {
  return (
    <div className="min-h-screen bg-neutral-light pb-20">
      {/* Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            className="font-serif text-5xl sm:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Dignity Dictionary
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            A comprehensive interactive lexicon of terms and concepts defining the landscape of human dignity and
            rights.
          </motion.p>
        </div>
      </section>

      <Suspense fallback={null}>
        <LexiconContent />
      </Suspense>
    </div>
  )
}
