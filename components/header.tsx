"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react" 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
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
    <header className="sticky top-0 z-[100] bg-white border-b border-border w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Always Visible */}
          <Link href="/" className="flex items-center gap-3 z-[110]">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm sm:text-base text-primary leading-tight">
                Dignity Rights Center
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-dark uppercase tracking-wider">Pakistan College of Law</span>
            </div>
          </Link>

          {/* Desktop/Tablet Navigation - Changed from lg:flex to md:flex */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-neutral-dark hover:text-primary transition-colors">
                    {item.label} <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={item.href!} className="px-3 py-2 text-sm font-semibold text-neutral-dark hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-48 bg-white border border-border shadow-xl rounded-b-lg py-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light hover:text-primary transition-colors"
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

          {/* Mobile Menu Button - Changed from md:hidden to md:hidden (visible only on small) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-primary z-[110]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Slide-over Sidebar (Drawer style) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Dark Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-[100] md:hidden"
              />
              
              {/* Sidebar Content */}
              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[105] shadow-2xl p-6 pt-24 md:hidden overflow-y-auto"
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-neutral-light py-2">
                      {item.children ? (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest px-2">
                            {item.label}
                          </span>
                          <div className="flex flex-col gap-1 pl-4">
                            {item.children.map(child => (
                              <Link 
                                key={child.href} 
                                href={child.href} 
                                onClick={() => setIsOpen(false)} 
                                className="py-2 text-base font-medium text-neutral-dark active:text-primary"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link 
                          href={item.href!} 
                          onClick={() => setIsOpen(false)} 
                          className="block px-2 py-3 text-lg font-serif font-bold text-neutral-dark active:text-primary"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
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