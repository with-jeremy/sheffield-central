"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTransition } from "@/context/TransitionContext"

export default function AlbumTransition() {
  const { albumTransition, completeAlbumTransition } = useTransition()
  const { isTransitioning, sourceRect } = albumTransition
  const [animationComplete, setAnimationComplete] = useState(false)

  // Reset animation state when transitioning ends
  useEffect(() => {
    if (!isTransitioning) {
      setAnimationComplete(false)
    }
  }, [isTransitioning])

  if (!isTransitioning || !sourceRect) return null

  // Calculate initial dimensions and position
  const initialWidth = sourceRect.width
  const initialHeight = sourceRect.height
  const initialX = sourceRect.left
  const initialY = sourceRect.top

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: animationComplete ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            if (animationComplete) {
              completeAlbumTransition()
            }
          }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Album zoom animation */}
          <motion.div
            className="absolute bg-amber-50 rounded-lg overflow-hidden"
            style={{
              width: initialWidth,
              height: initialHeight,
              x: initialX,
              y: initialY,
              transformOrigin: "center center",
            }}
            animate={{
              width: "100vw",
              height: "100vh",
              x: 0,
              y: 0,
              borderRadius: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Custom ease curve for natural motion
            }}
            onAnimationComplete={() => setAnimationComplete(true)}
          >
            {/* Skeleton loading content */}
            <div className="w-full h-full p-8">
              <div className="max-w-6xl mx-auto">
                {/* Skeleton header */}
                <div className="mb-8 text-center">
                  <div className="h-10 w-64 bg-amber-200/50 rounded-lg mx-auto mb-4 animate-pulse"></div>
                  <div className="h-6 w-96 bg-amber-200/40 rounded-lg mx-auto animate-pulse"></div>
                </div>

                {/* Skeleton grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-white p-3 pt-3 pb-12 shadow-md">
                        <div className="bg-amber-200/40 w-full aspect-square rounded"></div>
                        <div className="mt-4 h-6 bg-amber-200/30 rounded-lg w-3/4 mx-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
