"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react" // Ensure lucide-react is installed

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Practice Areas", href: "/practice-areas" },
    { 
      label: "Network", 
      children: [
        { label: "Members", href: "/members" },
        { label: "Contact", href: "/contact" }
      ] 
    },
    { 
      label: "Testaments", 
      children: [
        { label: "Blog", href: "/blog" },
        { label: "Newsfeed", href: "/newsfeed" },
        { label: "Case of the Week", href: "/case-of-the-week" }
      ] 
    },
    { label: "Gallery", href: "/gallery" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
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
              <div 
                key={item.label} 
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth">
                    {item.label} <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link href={item.href!} className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth">
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-48 bg-background border border-border shadow-xl rounded-md py-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm hover:bg-neutral-light text-foreground hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 z-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed inset-0 bg-background z-40 pt-20 px-4 flex flex-col gap-4"
            >
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="flex flex-col">
                      <span className="font-bold text-primary px-4 py-2 text-lg border-b border-border">{item.label}</span>
                      <div className="pl-6 flex flex-col gap-2 mt-2">
                        {item.children.map(child => (
                          <Link key={child.href} href={child.href} onClick={() => setIsOpen(false)} className="py-2 text-foreground">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link href={item.href!} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-lg font-medium border-b border-border">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}