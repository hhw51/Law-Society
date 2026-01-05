"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Hero() {
  const colors = ["#1e7b5c", "#ffb500", "#ff8288", "#fffcf0"]
  const [bgColor, setBgColor] = useState(colors[0])

  // Framer motion color value
  const color = useMotionValue(colors[0])
  const backgroundColor = useTransform(color, (latest) => latest)

  useEffect(() => {
    let index = 0

    const cycleColors = async () => {
      while (true) {
        const nextIndex = (index + 1) % colors.length
        animate(color, colors[nextIndex], {
          duration: 3,
          ease: "easeInOut",
        })
        setBgColor(colors[nextIndex])
        index = nextIndex
        await new Promise((res) => setTimeout(res, 4000))
      }
    }

    cycleColors()
  }, [color])

  // helper to adjust text color for light backgrounds
  const isLight = (color: string): boolean => {
    const c = color.substring(1)
    const rgb = Number.parseInt(c, 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = rgb & 0xff
    const luma = 0.299 * r + 0.587 * g + 0.114 * b
    return luma > 180
  }

  const textColor = isLight(bgColor) ? "text-gray-900" : "text-white"
  const accentColor = isLight(bgColor) ? "text-primary" : "text-yellow-200"

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <motion.section
      style={{ backgroundColor }}
      className={`relative min-h-[600px] flex items-center justify-center overflow-hidden transition-colors duration-1000 ${textColor}`}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img src="/images/transgender-rights-dignity.jpg" className="w-full h-full object-cover" alt="" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/images/logo.png" alt="PCLDRC Logo" className="w-32 h-32 sm:w-40 sm:h-40 mx-auto drop-shadow-2xl" />
        </motion.div>

        {/* Title */}
        <motion.h1 className={`font-serif text-5xl sm:text-6xl font-bold mb-4 ${textColor}`} {...fadeInUp}>
          Pakistan College of Law
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={`text-xl sm:text-2xl font-semibold mb-2 ${accentColor}`}
          {...fadeInUp}
          transition={{ delay: 0.1 }}
        >
          Dignity Rights Center
        </motion.p>

        {/* Description */}
        <motion.p
          className={`text-lg mb-8 max-w-2xl mx-auto ${isLight(bgColor) ? "text-gray-700" : "text-gray-100"}`}
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Advancing justice, dignity, and human rights through legal education, advocacy, and research.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/submit-blog"
            className={`px-6 py-3 rounded-lg font-semibold transition-smooth ${
              isLight(bgColor)
                ? "bg-primary text-white hover:bg-primary-light"
                : "bg-yellow-300 text-gray-900 hover:bg-yellow-200"
            }`}
          >
            Submit a Blog
          </Link>

          <Link
            href="/gallery"
            className={`px-6 py-3 rounded-lg font-semibold transition-smooth ${
              isLight(bgColor)
                ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            View Events
          </Link>

          <Link
            href="/contact"
            className={`px-6 py-3 border-2 rounded-lg font-semibold transition-smooth ${
              isLight(bgColor)
                ? "border-gray-700 text-gray-800 hover:bg-gray-100"
                : "border-white text-white hover:bg-white/10"
            }`}
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
