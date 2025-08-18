import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlassNavbarProps {
  className?: string
}

export default function GlassNavbar({ className }: GlassNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        // Base positioning and layout
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "px-6 py-3 rounded-full",
        "transition-all duration-300 ease-in-out",

        // Initial state - thin and transparent
        "bg-transparent border border-transparent",

        // Glass effect on hover or scroll
        "hover:bg-white/10 hover:backdrop-blur-md hover:border-white/20",
        "hover:shadow-lg hover:shadow-black/5",

        // Scrolled state - glass effect
        isScrolled && ["bg-white/10 backdrop-blur-md border-white/20", "shadow-lg shadow-black/5"],

        // Dark mode support
        "dark:hover:bg-black/10 dark:hover:border-white/10",
        isScrolled && "dark:bg-black/10 dark:border-white/10",

        className,
      )}
    >
      <div className="flex items-center justify-center space-x-8">
        <a href="#home" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
          Home
        </a>
        <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
          About
        </a>
        <a href="#services" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
          Services
        </a>
        <a href="#contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
          Contact
        </a>
      </div>
    </nav>
  )
}
