"use client"

import { motion } from "framer-motion"

export default function Members() {
  const members = [
    {
      name: "John Smith",
      title: "Senior Partner",
      specialty: "Corporate Law",
    },
    {
      name: "Sarah Johnson",
      title: "Partner",
      specialty: "Family Law",
    },
    {
      name: "Michael Chen",
      title: "Associate",
      specialty: "Criminal Law",
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
            Our Team
          </motion.h1>
          <motion.p
            className="text-lg text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Meet our experienced legal professionals
          </motion.p>
        </div>
      </section>

      {/* Members Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-light rounded-full" />
              <h3 className="font-serif text-xl font-bold text-primary">{member.name}</h3>
              <p className="text-sm font-medium text-accent mb-2">{member.title}</p>
              <p className="text-neutral-dark text-sm">{member.specialty}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
