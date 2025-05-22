import prisma from "@/lib/prisma";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8 text-sm text-blue-900" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center font-semibold text-blue-900">
              {categoryTitle} Prints
            </li>
          </ol>
        </nav>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900">
            {categoryTitle} Prints
          </h1>
          <p className="mt-2 text-blue-800">
            Historical paintings from Sheffield, Alabama
          </p>
        </div>

        {/* Let ProductGrid handle all fetching, including initial load */}
        <ProductGrid category={category} />
      </div>
    </div>
  );
}
