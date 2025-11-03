"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function BlogSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/blog")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white p-10 rounded-xl shadow-lg border"
      >
        <h1 className="text-3xl font-bold text-[#1e7b5c] mb-2">
          🎉 Blog Submitted!
        </h1>
        <p className="text-gray-600">
          Your blog post has been submitted for review. You’ll be redirected shortly.
        </p>
      </motion.div>
    </div>
  )
}
