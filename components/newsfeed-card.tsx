"use client"

import { motion } from "framer-motion"
import type { Newsfeed } from "@/lib/types"
import { useState } from "react"

interface NewsfeedCardProps {
  item: Newsfeed
}

export default function NewsfeedCard({ item }: NewsfeedCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  const newspaperColors: Record<string, string> = {
    "daily times": "from-blue-600 to-blue-700",
    "dawn posts": "from-orange-600 to-orange-700",
    miscellaneous: "from-gray-600 to-gray-700",
    "the guardian": "from-green-600 to-green-700",
    "the news": "from-red-600 to-red-700",
    tribune: "from-purple-600 to-purple-700",
  }

  return (
    <motion.div
      className="relative h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ y: -4 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image_url})` }}>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
      </div>

      {/* Newspaper Badge */}
      <div
        className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${newspaperColors[item.source_newspaper] || newspaperColors.miscellaneous} text-white text-xs font-bold rounded-full uppercase shadow-lg`}
      >
        {item.source_newspaper}
      </div>

      {/* Base Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="font-serif text-2xl font-bold mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-200">
          {new Date(item.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Hover Content */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-between p-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div />
        <div>
          <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
          <p className="text-sm text-gray-100 mb-4 line-clamp-3">{item.description}</p>
          <a
            href={item.article_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-accent hover:bg-accent-light text-primary font-semibold rounded transition-smooth"
          >
            Read Full Article →
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
