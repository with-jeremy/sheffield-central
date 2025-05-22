import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "9", 10);

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    const products = await prisma.product.findMany({
      where: { category },
      orderBy: { id: "asc" },
      skip,
      take,
    });

    // Set cache control headers for frequent access with revalidation
    return NextResponse.json(products, {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Optionally add a PATCH endpoint for admin to revalidate cache when products change
export async function PATCH() {
  revalidateTag("products");
  return NextResponse.json({ revalidated: true });
}
