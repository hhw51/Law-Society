import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Pakistan College of Law Dignity Rights Center",
  description: "Promoting human dignity, rights, and justice through legal education and advocacy.",
  keywords: "law, dignity rights, human rights, legal education, Pakistan",
  openGraph: {
    title: "Pakistan College of Law Dignity Rights Center",
    description: "Promoting human dignity, rights, and justice",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body className="font-sans bg-background text-foreground">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatbotButton />
      </body>
    </html>
  )
}
