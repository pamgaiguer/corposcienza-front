"use client"

import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  showLabel?: boolean
  className?: string
}

export default function ThemeToggle({
  variant = "ghost",
  size = "icon",
  showLabel = false,
  className = "",
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme()

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant={variant} size={size} className={`relative overflow-hidden ${className}`} disabled>
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          {showLabel && <span className="text-sm font-medium">Light</span>}
        </div>
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={`relative overflow-hidden ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        className="flex items-center gap-2"
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        {showLabel && <span className="text-sm font-medium">{theme === "light" ? "Light" : "Dark"}</span>}
      </motion.div>

      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-600/20 dark:to-purple-600/20"
        initial={false}
        animate={{
          opacity: theme === "dark" ? 1 : 0,
          scale: theme === "dark" ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
    </Button>
  )
}
