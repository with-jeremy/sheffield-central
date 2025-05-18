"use client"

import { useEffect, useState } from "react"
import { prints } from "@/lib/data"
import PolaroidImage from "@/components/PolaroidImage"
import Link from "next/link"
import { useTransition } from "@/context/TransitionContext"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface CategoryPageProps {
  params: { category: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const router = useRouter()
  const categoryPrints = prints.filter((print) => print.category === category)
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  const { albumTransition } = useTransition()
  const [isLoaded, setIsLoaded] = useState(false)
  const isTransitioningFromAlbum = albumTransition.isTransitioning && albumTransition.category === category

  // Simulate data loading
  useEffect(() => {
    // If we're transitioning from an album, delay the "loading" to match the animation
    const timer = setTimeout(
      () => {
        setIsLoaded(true)
      },
      isTransitioningFromAlbum ? 1000 : 300,
    )

    return () => clearTimeout(timer)
  }, [isTransitioningFromAlbum])

  const handleBuyClick = (printId: string) => {
    router.push(`/prints/detail/${printId}`)
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 pt-20">
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-purple-900">{categoryTitle} Prints</h1>
              <p className="mt-2 text-purple-800">Historical paintings from Sheffield, Alabama</p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {categoryPrints.map((print) => (
                <motion.div
                  key={print.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={`/prints/detail/${print.id}`}
                    className="transform transition-transform hover:scale-105 block"
                  >
                    <PolaroidImage
                      src={print.imageSrc}
                      alt={print.title}
                      title={print.description}
                      width={300}
                      height={300}
                      price="$10"
                      showBuyButton={true}
                      showPriceSticker={true}
                      onBuyClick={() => handleBuyClick(print.id)}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
