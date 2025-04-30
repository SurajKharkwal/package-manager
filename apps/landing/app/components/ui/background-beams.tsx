"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function BackgroundBeams({
  className,
}: {
  className?: string
}) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Call initially and on resize
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation
    let animationFrameId: number
    const animate = () => {
      if (!context || !canvas) return

      context.clearRect(0, 0, canvas.width, canvas.height)

      // Create a radial gradient
      const gradient = context.createRadialGradient(
        mousePosition.x,
        mousePosition.y,
        0,
        mousePosition.x,
        mousePosition.y,
        canvas.width * 0.3,
      )

      gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = window.requestAnimationFrame(animate)
    }

    animate()

    // Track mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition])

  return <canvas ref={canvasRef} className={cn("pointer-events-none absolute inset-0", className)} />
}
