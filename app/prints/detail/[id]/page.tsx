"use client"

import { useEffect, useState } from "react"
import { prints } from "@/lib/data"
import PolaroidImage from "@/components/PolaroidImage"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"

interface PrintDetailPageProps {
  params: { id: string }
}

export default function PrintDetailPage({ params }: PrintDetailPageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const print = prints.find((p) => p.id === params.id)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (!print) {
    notFound()
  }

  const categoryTitle = print.category.charAt(0).toUpperCase() + print.category.slice(1)

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <Link href={`/prints/${print.category}`} className="inline-block mb-8 text-purple-900 hover:text-purple-700">
          ← Back to {categoryTitle} Prints
        </Link>

        {isLoaded ? (
          <motion.div
            className="flex flex-col md:flex-row gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-1/2">
              <PolaroidImage
                src={print.imageSrc}
                alt={print.title}
                title={print.description}
                width={400}
                height={400}
                priority
                showBuyButton={false}
                showPriceSticker={false}
              />
            </div>

            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-purple-900 mb-4">{print.title}</h1>
              <p className="text-purple-800 mb-6">{print.description}</p>
              <p className="text-2xl font-bold text-purple-900 mb-6">$10.00</p>
              <Button className="bg-purple-800 hover:bg-purple-700 text-white px-8 py-6 text-lg">Buy Now</Button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 items-center animate-pulse">
            <div className="md:w-1/2 bg-white p-3 pt-3 pb-16 shadow-md">
              <div className="bg-amber-100 aspect-square w-full"></div>
              <div className="h-6 bg-amber-100 w-3/4 mx-auto mt-4 rounded"></div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-amber-100 w-3/4 rounded mb-4"></div>
              <div className="h-4 bg-amber-100 w-full rounded mb-2"></div>
              <div className="h-4 bg-amber-100 w-5/6 rounded mb-6"></div>
              <div className="h-6 bg-amber-100 w-1/4 rounded mb-6"></div>
              <div className="h-12 bg-purple-200 w-1/3 rounded"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
