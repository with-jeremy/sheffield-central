"use client";

import type React from "react";

import Image from "next/image";

interface PolaroidImageProps {
  src: string;
  alt: string;
  title: string;
  width?: number;
  height?: number;
  priority?: boolean;
  price?: string;
  showPriceSticker?: boolean;
}

export default function PolaroidImage({
  src,
  alt,
  title,
  width = 300,
  height = 300,
  priority = false,
  price = "$10",
  showPriceSticker = true,
}: Omit<PolaroidImageProps, "onBuyClick" | "showBuyButton">) {
  return (
    <div className="bg-white p-3 pt-3 pb-3 shadow-xl max-w-xs mx-auto transform transition-transform hover:rotate-1 relative">
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
      <div className="mt-2 text-center mb-2">
        <p className="font-caveat text-xl text-amber-900">{title}</p>
      </div>
    </div>
  );
}
