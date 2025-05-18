"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface PolaroidImageProps {
  src: string
  alt: string
  title: string
  width?: number
  height?: number
  priority?: boolean
  price?: string
  showBuyButton?: boolean
  showPriceSticker?: boolean
  onBuyClick?: () => void
}

export default function PolaroidImage({
  src,
  alt,
  title,
  width = 300,
  height = 300,
  priority = false,
  price = "$10",
  showBuyButton = true,
  showPriceSticker = true,
  onBuyClick,
}: PolaroidImageProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onBuyClick) {
      onBuyClick()
    }
  }

  return (
    <div className="bg-white p-3 pt-3 pb-8 shadow-xl max-w-xs mx-auto transform transition-transform hover:rotate-1 relative">
      <div className="relative">
        <Image
          src={src || "/placeholder.svg?height=300&width=300"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          priority={priority}
        />
      </div>

      {/* Title/Description */}
      <div className="mt-2 text-center mb-4">
        <p className="font-dancing-script text-xl text-amber-900">{title}</p>
      </div>

      {/* Buy Now Button */}
      {showBuyButton && (
        <motion.button
          className="block mx-auto px-4 py-1.5 rounded-md border-2 text-sm font-medium transition-colors duration-300 focus:outline-none"
          style={{
            borderColor: "rgb(88, 28, 135)", // purple-900
            color: isButtonHovered ? "white" : "rgb(88, 28, 135)",
            backgroundColor: isButtonHovered ? "rgb(88, 28, 135)" : "transparent",
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={handleBuyClick}
          whileTap={{ scale: 0.95 }}
        >
          Buy Now
        </motion.button>
      )}

      {/* Price Sticker - Only shown when showPriceSticker is true */}
      {showPriceSticker && (
        <div className="absolute bottom-6 right-4 w-14 h-14 rotate-12">
          {/* Sticker base with worn effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-sm">
            {/* Worn edges effect */}
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 30% 40%, transparent 20%, rgba(0,0,0,0.1) 21%, transparent 35%, rgba(0,0,0,0.05) 36%, transparent 40%)",
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle at 70% 60%, transparent 20%, rgba(0,0,0,0.1) 21%, transparent 35%)",
              }}
            ></div>

            {/* Creases and folds */}
            <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-amber-300/30 transform rotate-6"></div>
            <div className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-amber-300/20 transform -rotate-3"></div>
          </div>

          {/* Price text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-dancing-script text-xl text-purple-900 font-bold">{price}</p>
          </div>
        </div>
      )}
    </div>
  )
}
