"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-light rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 className="font-serif text-5xl sm:text-6xl font-bold mb-6 text-balance" {...fadeInUp}>
            Trusted Legal Expertise
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto text-balance"
            {...fadeInUp}
            transition={{ delay: 0.1 }}
          >
            Professional legal services dedicated to protecting your rights and advancing your interests.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="px-8 py-3 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-smooth"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-neutral-dark max-w-2xl mx-auto">
            Decades of experience combined with modern legal expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Expert Team", description: "Highly qualified attorneys with specialized expertise" },
            { title: "Client Focused", description: "Your needs and goals are our top priority" },
            { title: "Proven Results", description: "Track record of successful case outcomes" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 border border-border rounded-lg hover:shadow-lg transition-smooth"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-neutral-dark text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="font-serif text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-neutral-dark mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Contact us today for a consultation with one of our experienced attorneys.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-smooth"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
