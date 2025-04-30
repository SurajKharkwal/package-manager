"use client"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
}: {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const createParticles = () => {
      const density = particleDensity || 50
      const particles = []

      for (let i = 0; i < density; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * (maxSize || 3) + (minSize || 1)
        const color = particleColor || "#ffffff"
        const speedFactor = speed || 1

        particles.push({
          x,
          y,
          size,
          color,
          speedX: (Math.random() - 0.5) * speedFactor,
          speedY: (Math.random() - 0.5) * speedFactor,
        })
      }

      return particles
    }

    particlesRef.current = createParticles()

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (background) {
        ctx.fillStyle = background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      particlesRef.current.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [background, maxSize, minSize, particleColor, particleDensity, speed])

  return <canvas ref={canvasRef} id={id} className={cn("h-full w-full", className)} />
}
