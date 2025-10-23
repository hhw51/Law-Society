import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Law Society</h3>
            <p className="text-sm text-gray-300">
              Providing trusted legal expertise and professional services since 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition-smooth">
                  About
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-accent transition-smooth">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-smooth">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-accent transition-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-smooth">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-accent transition-smooth">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-300 mb-2">123 Legal Street</p>
            <p className="text-sm text-gray-300 mb-2">City, State 12345</p>
            <p className="text-sm text-gray-300">(555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-primary-light pt-8">
          <p className="text-center text-sm text-gray-300">© {currentYear} Law Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
