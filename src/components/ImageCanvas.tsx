'use client'
import { useEffect, useRef } from 'react'

export default function ImageCanvas({ src, alt, className = '', width, height }: {
  src: string
  alt?: string
  className?: string
  width?: number
  height?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = src
    img.crossOrigin = 'anonymous' // requires server to set Access-Control-Allow-Origin
    img.onload = () => {
      canvas.width = width || img.naturalWidth
      canvas.height = height || img.naturalHeight
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    // optional error handler: set to placeholder graphic
    img.onerror = () => {
      ctx.fillStyle = '#111'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#fff'
      ctx.fillText('Image unavailable', 10, 20)
    }
  }, [src, width, height])

  return (
    // keep an aria-label or visually-hidden img for accessibility if you can
    <canvas ref={canvasRef} className={className} role="img" aria-label={alt ?? 'image'} />
  )
}