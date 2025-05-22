import prisma from "@/lib/prisma";
import PolaroidImage from "@/components/PolaroidImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ProductActions from "@/components/ProductActions";
import { getCachedPricing } from "@/lib/pricing-cache";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Fetch the product from the database by id (numeric, not title)
  const print = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  if (!print)
    return <div className="p-8 text-center text-red-700">Print not found.</div>;

  const categoryTitle =
    print.category.charAt(0).toUpperCase() +
    print.category.slice(1).toLowerCase();
  const categorySlug = print.category.toLowerCase();

  // Fetch pricing from cache
  const pricing = await getCachedPricing();

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/prints/${categorySlug}`}
          className="inline-block mb-8 text-blue-900 hover:text-blue-700"
        >
          ← Back to {categoryTitle} Prints
        </Link>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/2">
            <PolaroidImage
              src={print.imageURL}
              alt={print.title ?? ""}
              title={print.description ?? ""}
              width={400}
              height={400}
              priority
              showPriceSticker={false}
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              {print.title ?? ""}
            </h1>
            <p className="text-blue-800 mb-6">{print.description ?? ""}</p>
            <ProductActions
              print={{
                id: print.id.toString(),
                title: print.title ?? "",
                description: print.description ?? "",
                category: categorySlug,
                imageSrc: print.imageURL,
              }}
              pricing={pricing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
