import { prints } from "@/lib/data"
import PolaroidImage from "@/components/PolaroidImage"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import PrintDetailActions from "@/components/PrintDetailActions"

export default async function PrintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const print = prints.find((p) => p.id === id)
  if (!print) return <div className="p-8 text-center text-red-700">Print not found.</div>

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
            <PrintDetailActions print={print} />
          </div>
        </div>
      </div>
    </div>
  )
}
