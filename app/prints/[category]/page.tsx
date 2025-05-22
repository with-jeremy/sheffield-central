import prisma from "@/lib/prisma"
import PolaroidImage from "@/components/PolaroidImage"
import Link from "next/link"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  // Fetch prints from the database for this category (enum is uppercase in DB)
  const categoryPrints = await prisma.product.findMany({
    where: { category: category.toUpperCase() },
    orderBy: { id: "asc" },
  })
  // If no prints found, show a message
  if (!categoryPrints.length) {
    return (
      <div className="min-h-screen bg-amber-50 py-12 px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center text-red-700">
          No prints found for this category.
        </div>
      </div>
    )
  }
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8 text-sm text-purple-900" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center font-semibold text-purple-900">{categoryTitle} Prints</li>
          </ol>
        </nav>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-900">{categoryTitle} Prints</h1>
          <p className="mt-2 text-purple-800">Historical paintings from Sheffield, Alabama</p> 
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 album-contents">
          {categoryPrints.map((print) => (
            <div key={print.id}>
              <Link href={`/prints/buy-prints/${print.id}`} className="transform transition-transform hover:scale-105 block">
                <PolaroidImage
                  src={print.imageURL}
                  alt={print.title ?? ""}
                  title={print.description ?? ""}
                  width={300}
                  height={300}
                  price={print.price ? `$${typeof print.price === 'object' && 'toNumber' in print.price ? print.price.toNumber() : Number(print.price)}` : undefined}
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
