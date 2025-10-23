"use client"

import { motion } from "framer-motion"

export default function PracticeAreas() {
  const areas = [
    {
      title: "Corporate Law",
      description: "Comprehensive legal services for business formation, contracts, and corporate governance.",
    },
    {
      title: "Family Law",
      description: "Compassionate representation in divorce, custody, and family matters.",
    },
    {
      title: "Criminal Law",
      description: "Vigorous defense and representation in criminal proceedings.",
    },
    {
      title: "Real Estate",
      description: "Expert guidance in property transactions and real estate disputes.",
    },
    {
      title: "Intellectual Property",
      description: "Protection and enforcement of patents, trademarks, and copyrights.",
    },
    {
      title: "Employment Law",
      description: "Advice on employment contracts, disputes, and workplace issues.",
    },
  ]

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
            Practice Areas
          </motion.h1>
          <motion.p
            className="text-lg text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Specialized legal expertise across multiple practice areas
          </motion.p>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              className="p-6 border border-border rounded-lg hover:shadow-lg hover:border-accent transition-smooth"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-xl font-bold mb-3 text-primary">{area.title}</h3>
              <p className="text-neutral-dark text-sm leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
