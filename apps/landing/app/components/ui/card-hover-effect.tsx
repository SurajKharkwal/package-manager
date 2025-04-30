"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function CardHoverEffect({
  items,
  className,
}: {
  items: {
    title: string
    description: string
  }[]
  className?: string
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30 opacity-0 group-hover:opacity-100 rounded-xl transition duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative bg-card border border-border p-6 rounded-xl h-full z-10">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
