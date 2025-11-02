"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPubOpen, setIsPubOpen] = useState(false) // for mobile dropdown

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Publications",
      href: "#", // no main page, only dropdown
      subItems: [
        { label: "Research Papers", href: "/publications/research-papers" },
        { label: "Articles", href: "/publications/articles" },
        { label: "Newsfeed", href: "/publications/newsfeed" },
      ],
    },
    { label: "Our Team", href: "/members" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-50">
            <img src="/logo.png" alt="PCLDRC Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-sm text-primary block leading-tight">
                Dignity Rights Center
              </span>
              <span className="text-xs text-neutral-dark">PCL</span>
            </div>
          </Link>

{/* Desktop Navigation */}
<nav className="hidden md:flex items-center gap-8 relative">
  {navItems.map((item) =>
    item.subItems ? (
      <div key={item.label} className="relative group">
        <button
          className="text-sm font-medium text-foreground hover:text-primary transition-all duration-200"
          aria-haspopup="true"
        >
          {item.label}
        </button>

        {/* Dropdown (desktop) */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute left-0 mt-3 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200"
        >
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden min-w-[200px]">
            {/* Decorative bar */}
            <div className="h-1 bg-[#1e7b5c]" />

            {item.subItems.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="block px-5 py-3 text-sm text-neutral-dark hover:bg-[#1e7b5c] hover:text-white transition-all duration-200"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    ) : (
      <Link
        key={item.href}
        href={item.href}
        className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
      >
        {item.label}
      </Link>
    )
  )}
</nav>



          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-neutral-light rounded-md transition-smooth z-50"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 md:hidden"
                style={{ top: "64px" }}
              />
              {/* Menu */}
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg"
              >
                <div className="px-4 py-2 space-y-1">
                  {navItems.map((item) =>
                    item.subItems ? (
                      <div key={item.label}>
                        <button
                          onClick={() => setIsPubOpen(!isPubOpen)}
                          className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-neutral-light rounded-md transition-smooth"
                        >
                          {item.label}
                          <svg
                            className={`w-4 h-4 transform transition-transform ${
                              isPubOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {isPubOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-6 space-y-1"
                            >
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light rounded-md"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-neutral-light rounded-md transition-smooth"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
