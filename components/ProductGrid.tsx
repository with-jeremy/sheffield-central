"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PolaroidImage from "@/components/PolaroidImage";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

type Product = {
  id: number;
  title: string | null;
  description: string | null;
  imageURL: string;
  price: any;
  category: string;
};

export default function ProductGrid({ category }: { category: string }) {
  const PAGE_SIZE = 9;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const skip = products.length;

  // Fetch products (initial and on load more)
  async function fetchProducts(skipCount: number) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/products?category=${category.toUpperCase()}&skip=${skipCount}&take=${PAGE_SIZE}`
      );
      let newProducts = await res.json();
      if (!Array.isArray(newProducts)) {
        newProducts = [];
      }
      if (skipCount === 0) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }
      setHasMore(newProducts.length === PAGE_SIZE);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchProducts(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Intersection observer for lazy loading
  const isIntersecting = useIntersectionObserver(loadMoreRef, {
    threshold: 0.5,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      fetchProducts(products.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  // Show message if no products
  if (!isLoading && products.length === 0) {
    return (
      <div className="text-center text-red-700 py-12">
        No prints found for this category.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 album-contents">
        {products.map((print) => (
          <div key={print.id}>
            <Link
              href={`/prints/buy-prints/${print.id}`}
              className="transform transition-transform hover:scale-105 block"
            >
              <PolaroidImage
                src={print.imageURL}
                alt={print.title ?? ""}
                title={print.description ?? ""}
                width={300}
                height={300}
                price={
                  print.price
                    ? `$${
                        typeof print.price === "object" &&
                        "toNumber" in print.price
                          ? print.price.toNumber()
                          : Number(print.price)
                      }`
                    : undefined
                }
                showPriceSticker={true}
              />
            </Link>
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isLoading ? (
            <div className="loading-spinner w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <div className="h-10" />
          )}
        </div>
      )}
    </>
  );
}
