"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle, // added to fix link styles
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  // Reorganized navigation structure with Network and Testaments dropdowns
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Practice Areas", href: "/practice-areas" },
    {
      label: "Network",
      children: [
        { label: "Members", href: "/members" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      label: "Testaments",
      children: [
        { label: "Blog", href: "/blog" },
        { label: "Newsfeed", href: "/newsfeed" },
        { label: "Case of the Week", href: "/case-of-the-week" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50 flex-shrink-0">
            <img src="/images/logo.png" alt="PCLDRC Logo" className="w-10 h-10 object-contain" />
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-xs sm:text-sm text-primary block leading-tight">
                Dignity Rights Center
              </span>
              <span className="text-xs text-neutral-dark">Pakistan College of Law</span>
            </div>
          </Link>

          {/* Desktop Navigation with NavigationMenu for dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => {
                  if (item.children) {
                    return (
                      <NavigationMenuItem key={item.label}>
                        <NavigationMenuTrigger className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[200px] gap-1 p-2">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href} legacyBehavior passHref>
                                  <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                    <div className="text-sm font-medium leading-none">{child.label}</div>
                                  </NavigationMenuLink>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }
                  return (
                    <NavigationMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.label}</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Tablet/Mobile Navigation - simplified for medium screens */}
          <nav className="hidden md:flex lg:hidden items-center gap-1">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href || item.label}
                href={item.href || "#"}
                className="px-2 py-2 text-xs font-medium text-foreground hover:text-primary hover:bg-neutral-light rounded-md transition-smooth whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu with Sheet and Accordion */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 hover:bg-neutral-light rounded-md transition-smooth"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4">
                <Accordion type="single" collapsible className="w-full">
                  {navItems.map((item, index) => {
                    if (item.children) {
                      return (
                        <AccordionItem key={item.label} value={`item-${index}`}>
                          <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-1 pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-neutral-light rounded-md transition-smooth"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    }
                    return (
                      <div key={item.href} className="border-b last:border-b-0">
                        <Link
                          href={item.href}
                          className="block px-3 py-4 text-sm font-medium text-foreground hover:text-primary hover:bg-neutral-light transition-smooth"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </div>
                    )
                  })}
                </Accordion>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
