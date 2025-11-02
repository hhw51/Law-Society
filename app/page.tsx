"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <div className="space-y-0">
      {/* Hero Section with Logo */}
{/* Hero Section with Logo */}
<section className="relative min-h-[600px] flex items-center justify-center bg-[#258f6b] text-white overflow-hidden">
  {/* Background accents */}
  <div className="absolute inset-0 opacity-15">
    <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full mix-blend-multiply filter blur-3xl" />
    <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/30 rounded-full mix-blend-multiply filter blur-3xl" />
  </div>

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="/logo.png"
        alt="PCLDRC Logo"
        className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full shadow-2xl border-4 border-white/20"
      />
    </motion.div>

    <motion.h1
      className="font-serif text-5xl sm:text-6xl font-bold mb-4 text-white"
      {...fadeInUp}
    >
      Pakistan College of Law
    </motion.h1>

    <motion.p
      className="text-xl sm:text-2xl font-semibold mb-2 text-white/90"
      {...fadeInUp}
      transition={{ delay: 0.1 }}
    >
      Dignity Rights Center
    </motion.p>

    <motion.p
      className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
      {...fadeInUp}
      transition={{ delay: 0.2 }}
    >
      Advancing justice, dignity, and human rights through legal education, advocacy, and research.
    </motion.p>

    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
      {...fadeInUp}
      transition={{ delay: 0.3 }}
    >
      <Link
        href="/submit-blog"
        className="px-6 py-3 bg-white text-[#1e7b5c] font-semibold rounded-lg hover:bg-white/90 transition-smooth shadow-md"
      >
        Submit a Blog
      </Link>

      <Link
        href="/gallery"
        className="px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-smooth"
      >
        View Events
      </Link>

      <Link
        href="/contact"
        className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-smooth"
      >
        Get in Touch
      </Link>
    </motion.div>
  </div>
</section>



      {/* Mission Section */}
      <section className="py-16 bg-[#fff7e0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold mb-4 text-[#258f6b]">Our Mission</h2>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto leading-relaxed">
              The Pakistan College of Law Dignity Rights Center is dedicated to promoting and protecting human rights
              through legal education, advocacy, and groundbreaking research. We work to foster a society where dignity,
              justice, and equality are upheld for all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Focus Areas */}
      <section className="py-20 bg-[#258f6b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl text-neutral-light font-bold mb-4">What We Do</h2>
            <p className="text-neutral-light max-w-2xl mx-auto">
              Championing rights and justice across key areas of law and society
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Human Rights Advocacy",
                description: "Strategic legal advocacy for marginalized communities",
                icon: "⚖️",
              },
              {
                title: "Legal Research",
                description: "In-depth analysis on dignity, rights, and justice issues",
                icon: "📚",
              },
              {
                title: "Community Engagement",
                description: "Public awareness and grassroots rights education",
                icon: "🤝",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-smooth border border-border"
                variants={itemVariants}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-2 text-primary">{item.title}</h3>
                <p className="text-neutral-dark text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Events/Talks */}
      <section className="py-20 bg-[#fff7e0]"> {/* soft cream-yellow background */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="font-serif text-4xl font-bold mb-4 text-[#1e7b5c]">
        Recent Events & Initiatives
      </h2>
      <p className="text-neutral-700 max-w-2xl mx-auto mb-8">
        Explore our latest talks, seminars, and campaigns dedicated to advancing dignity and rights
      </p>
      <Link
        href="/gallery"
        className="inline-block px-6 py-2 bg-[#1e7b5c] hover:bg-[#258f6b] text-white font-semibold rounded-lg transition-smooth shadow-md"
      >
        View All Events
      </Link>
    </motion.div>

    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        {
          title: "Transgender Rights & Dignity Seminar",
          date: "Recent",
          category: "Seminar",
        },
        {
          title: "Environmental Law & Climate Crisis Forum",
          date: "Recent",
          category: "Forum",
        },
        {
          title: "Problem-Solving & Decision-Making Workshop",
          date: "Recent",
          category: "Workshop",
        },
        {
          title: "Legal Quiz & Knowledge Competition",
          date: "Upcoming",
          category: "Competition",
        },
      ].map((event, i) => (
        <motion.div
          key={i}
          className="p-6 bg-white rounded-lg border-l-4 border-[#ffb500] hover:shadow-md transition-smooth"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#ffb500] uppercase">
              {event.category}
            </span>
            <span className="text-sm text-gray-500">{event.date}</span>
          </div>
          <h3 className="font-serif text-lg font-bold mb-3 text-[#1e7b5c]">
            {event.title}
          </h3>
          <Link
            href="/gallery"
            className="text-sm font-semibold text-[#258f6b] hover:text-[#1e7b5c] transition-smooth"
          >
            Learn More →
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


      {/* Blog & Contributions */}
      <section className="py-20 bg-[#fff7e0] from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-bold mb-4">Share Your Voice</h2>
              <p className="text-neutral-dark text-lg mb-6 leading-relaxed">
                We believe in the power of diverse perspectives and voices. Contribute your legal insights, case
                studies, and advocacy stories to our growing community of rights champions.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <p className="text-neutral-dark">Submit blog posts on human rights and legal topics</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <p className="text-neutral-dark">Share your expertise and research findings</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <p className="text-neutral-dark">Join our network of legal professionals and activists</p>
                </div>
              </div>
              <Link
                href="/submit-blog"
                className="inline-block px-8 py-3 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
              >
                Submit a Blog Post
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm border border-border"
            >
              <h3 className="font-serif text-2xl font-bold mb-6 text-primary">Recent Blog Posts</h3>
              <div className="space-y-4">
                {[
                  "Understanding Constitutional Rights in Modern Context",
                  "Protecting Minorities: Legal Frameworks & Advocacy",
                  "The Future of Digital Rights & Privacy",
                ].map((post, i) => (
                  <Link
                    key={i}
                    href="/blog"
                    className="block p-3 border border-border rounded hover:bg-neutral-light transition-smooth text-sm font-medium text-foreground hover:text-primary"
                  >
                    → {post}
                  </Link>
                ))}
              </div>
              <Link
                href="/blog"
                className="inline-block mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-smooth text-sm"
              >
                View All Posts
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="font-serif text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join the Movement for Justice & Dignity
          </motion.h2>
          <motion.p
            className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Whether you're seeking legal guidance, want to contribute your expertise, or support our mission, we're here
            to connect.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="px-8 py-3 bg-accent hover:bg-accent-light text-primary font-semibold rounded-lg transition-smooth"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-smooth"
            >
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

