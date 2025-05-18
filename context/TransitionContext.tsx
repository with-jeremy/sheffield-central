"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type AlbumTransitionState = {
  isTransitioning: boolean
  category: string | null
  sourceRect: DOMRect | null
  startPosition: { x: number; y: number } | null
}

type TransitionContextType = {
  albumTransition: AlbumTransitionState
  startAlbumTransition: (category: string, sourceElement: HTMLElement) => void
  completeAlbumTransition: () => void
}

const defaultContext: TransitionContextType = {
  albumTransition: {
    isTransitioning: false,
    category: null,
    sourceRect: null,
    startPosition: null,
  },
  startAlbumTransition: () => {},
  completeAlbumTransition: () => {},
}

const TransitionContext = createContext<TransitionContextType>(defaultContext)

export const useTransition = () => useContext(TransitionContext)

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [albumTransition, setAlbumTransition] = useState<AlbumTransitionState>({
    isTransitioning: false,
    category: null,
    sourceRect: null,
    startPosition: null,
  })

  // Reset transition state when navigating back
  useEffect(() => {
    const handlePopState = () => {
      setAlbumTransition({
        isTransitioning: false,
        category: null,
        sourceRect: null,
        startPosition: null,
      })
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const startAlbumTransition = (category: string, sourceElement: HTMLElement) => {
    const rect = sourceElement.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    setAlbumTransition({
      isTransitioning: true,
      category,
      sourceRect: rect,
      startPosition: {
        x: rect.left + scrollX,
        y: rect.top + scrollY,
      },
    })
  }

  const completeAlbumTransition = () => {
    setAlbumTransition((prev) => ({
      ...prev,
      isTransitioning: false,
    }))
  }

  return (
    <TransitionContext.Provider
      value={{
        albumTransition,
        startAlbumTransition,
        completeAlbumTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  )
}
