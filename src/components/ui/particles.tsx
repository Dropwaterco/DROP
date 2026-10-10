"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef, useMemo, useCallback } from "react"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "")
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("")
  }
  const hexInt = parseInt(hex, 16)
  const red = (hexInt >> 16) & 255
  const green = (hexInt >> 8) & 255
  const blue = hexInt & 255
  return [red, green, blue]
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const rafIdRef = useRef<number | null>(null)
  const isVisibleRef = useRef(false)
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1

  const rgb = useMemo(() => hexToRgb(color), [color])


  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)
    }
  }, [dpr])

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const pSize = Math.floor(Math.random() * 2) + size
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1
    const magnetism = 0.1 + Math.random() * 4
    return {
      x, y,
      translateX: 0, translateY: 0,
      size: pSize, alpha, targetAlpha,
      dx, dy, magnetism,
    }
  }, [size])

  const drawCircle = useCallback((circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size: circleSize, alpha } = circle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, circleSize, 0, 2 * Math.PI)
      context.current.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!update) {
        circles.current.push(circle)
      }
    }
  }, [rgb, dpr])

  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
  }, [])

  const drawParticles = useCallback(() => {
    clearContext()
    const particleCount = window.matchMedia("(max-width: 767px)").matches ? Math.min(quantity, 40) : quantity
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }, [clearContext, circleParams, drawCircle, quantity])

  const remapValue = useCallback((value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }, [])

  const animate = useCallback(function tick() {
    if (!isVisibleRef.current || document.hidden) {
      rafIdRef.current = null
      return
    }

    clearContext()
    // Iterate backwards to safely splice
    for (let i = circles.current.length - 1; i >= 0; i--) {
      const circle = circles.current[i]
      
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ]
      const closestEdge = Math.min(edge[0], edge[1], edge[2], edge[3])
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))
      
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge
      }
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease

      drawCircle(circle, true)

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1)
        const newCircle = circleParams()
        drawCircle(newCircle)
      }
    }
    rafIdRef.current = window.requestAnimationFrame(tick)
  }, [clearContext, circleParams, drawCircle, ease, remapValue, staticity, vx, vy])

  // Mouse handling via ref (no setState)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const { w, h } = canvasSize.current
        const x = event.clientX - rect.left - w / 2
        const y = event.clientY - rect.top - h / 2
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
        if (inside) {
          mouse.current.x = x
          mouse.current.y = y
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Main init + visibility observer
  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    resizeCanvas()
    drawParticles()

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      if (isVisibleRef.current && !document.hidden && !motion.matches) {
        rafIdRef.current = window.requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', sync)
    motion.addEventListener('change', sync)

    // Only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current)
    }

    const handleResize = () => {
      resizeCanvas()
      drawParticles()
    }
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      observer.disconnect()
      document.removeEventListener("visibilitychange", sync)
      motion.removeEventListener("change", sync)
      window.removeEventListener("resize", handleResize)
    }
  }, [color, animate, resizeCanvas, drawParticles])

  useEffect(() => {
    resizeCanvas()
    drawParticles()
  }, [refresh, resizeCanvas, drawParticles])

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}

export { Particles }
