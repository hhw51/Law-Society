"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Practice Areas", href: "/practice-areas" },
    { label: "Members", href: "/members" },
    { label: "Blog", href: "/blog" },
    { label: "Newsfeed", href: "/newsfeed" },
    { label: "Case of the Week", href: "/case-of-the-week" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50 flex-shrink-0">
            <img src="/logo.png" alt="PCLDRC Logo" className="w-10 h-10 rounded-full object-cover" />
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-xs sm:text-sm text-primary block leading-tight">
                Dignity Rights Center
              </span>
              <span className="text-xs text-neutral-dark">Pakistan College of Law</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-neutral-light rounded-md transition-smooth whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Tablet/Mobile Navigation */}
          <nav className="hidden md:flex lg:hidden items-center gap-1">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-2 text-xs font-medium text-foreground hover:text-primary hover:bg-neutral-light rounded-md transition-smooth whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
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

        {/* Mobile Navigation with Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20"
                style={{ top: "64px" }}
              />
              {/* Menu */}
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg z-40"
              >
                <div className="px-4 py-2 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-neutral-light rounded-md transition-smooth"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
