"use client"

import { motion } from "framer-motion"
import Link from "next/link"

// TODO: Fetch from Supabase based on slug
const blogPost = {
  id: "1",
  title: "Understanding Corporate Contracts",
  slug: "understanding-corporate-contracts",
  content: `
    Corporate contracts are the backbone of business relationships. They establish clear terms, conditions, and expectations between parties.
    
    Key elements of a corporate contract include:
    - Parties involved
    - Scope of work or services
    - Payment terms
    - Liability and indemnification
    - Dispute resolution mechanisms
    
    Understanding these elements is crucial for protecting your business interests.
  `,
  excerpt: "A comprehensive guide to corporate contract essentials.",
  date: "2024-01-15",
  category: "Corporate Law",
  author: "John Smith",
}

export default function BlogPost() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/blog" className="text-accent hover:text-accent-light transition-smooth mb-4 inline-block">
              ← Back to Blog
            </Link>
            <h1 className="font-serif text-5xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-200">
              <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{blogPost.category}</span>
              <span>•</span>
              <span>By {blogPost.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.article
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-6 text-neutral-dark leading-relaxed">
            {blogPost.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </motion.article>
      </section>

      {/* Related Posts */}
      <section className="bg-neutral-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Contract Negotiation Tips", slug: "contract-negotiation-tips" },
              { title: "Legal Compliance Checklist", slug: "legal-compliance-checklist" },
            ].map((post, i) => (
              <motion.div
                key={i}
                className="p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-smooth"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif text-lg font-bold text-primary mb-2">{post.title}</h3>
                <Link href={`/blog/${post.slug}`} className="text-accent hover:text-accent-light font-semibold">
                  Read More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
