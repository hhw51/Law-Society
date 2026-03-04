"use client"

import { motion } from "framer-motion"

export default function Members() {
  const members = [
    {
      name: "Umer H Wyne",
      title: "Director Operations and Communications",
      initials: "UW",
    },
    {
      name: "Anoushey Khurram",
      title: "Director Awareness and Outreach",
      initials: "AK",
    },
    {
      name: "Mariam Tahir",
      title: "Director Media and Communications",
      initials: "MT",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section - Refined for Desktop/Mobile */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-32 mb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Leadership
            </h1>
            <div className="h-1 w-20 bg-accent-light mb-6" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Our directors bring specialized expertise and a shared commitment 
              to excellence in legal operations and public outreach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {members.map((member, i) => (
            <motion.div
              key={i}
              className="group relative bg-card border border-border p-8 rounded-xl hover:shadow-xl transition-smooth"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Monogram Placeholder (instead of a picture) */}
              <div className="mb-8 relative">
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-secondary text-primary font-serif text-2xl font-bold group-hover:bg-primary group-hover:text-white transition-smooth">
                  {member.initials}
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-accent-light opacity-0 group-hover:opacity-100 transition-smooth" />
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary leading-tight">
                  {member.name}
                </h3>
                
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-accent" />
                  <p className="text-xs uppercase tracking-widest font-semibold text-accent leading-none">
                    Director
                  </p>
                </div>

                <p className="text-neutral-dark text-base md:text-lg leading-snug">
                  {member.title}
                </p>
              </div>

              {/* Decorative flourish */}
              <div className="mt-8 pt-6 border-t border-border opacity-50">
                <span className="text-xs font-sans text-muted-foreground uppercase tracking-tighter">
                  Executive Board Member
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}