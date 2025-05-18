"use client"

import { prints } from "@/lib/data"
import PolaroidImage from "@/components/PolaroidImage"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PrintDetailPageProps {
  params: { id: string }
}

export default function PrintDetailPage({ params }: PrintDetailPageProps) {
  const print = prints.find((p) => p.id === params.id)

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

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <PolaroidImage
              src={print.imageSrc}
              alt={print.title}
              title={print.description}
              width={400}
              height={400}
              priority
              showPriceSticker={false}
            />
          </div>

          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-purple-900 mb-4">{print.title}</h1>
            <p className="text-purple-800 mb-6">{print.description}</p>
            <div className="flex flex-row gap-4 mb-6">
              <Button className="flex-1 bg-purple-800 hover:bg-purple-700 text-white px-6 py-4 text-lg">
                Buy 10x12 $12
              </Button>
              <Button className="flex-1 bg-purple-700 hover:bg-purple-600 text-white px-6 py-4 text-lg">
                Buy 11x13 $15
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
