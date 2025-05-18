"use client"

import { prints } from "@/lib/data"
import PolaroidImage from "@/components/PolaroidImage"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CategoryPageProps {
  params: { category: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const router = useRouter()
  const categoryPrints = prints.filter((print) => print.category === category)
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-900">{categoryTitle} Prints</h1>
          <p className="mt-2 text-purple-800">Historical paintings from Sheffield, Alabama</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 album-contents">
          {categoryPrints.map((print) => (
            <div key={print.id}>
              <Link href={`/prints/buy-prints/${print.id}`} className="transform transition-transform hover:scale-105 block">
                <PolaroidImage
                  src={print.imageSrc}
                  alt={print.title}
                  title={print.description}
                  width={300}
                  height={300}
                  price="$10"
                  showPriceSticker={true}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
