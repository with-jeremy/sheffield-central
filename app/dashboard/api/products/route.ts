import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "10", 10);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  const where: any = {};
  if (category) {
    where.category = category;
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { id: isNaN(Number(search)) ? undefined : Number(search) },
    ].filter(Boolean);
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: { id: "asc" },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total });
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    // Use the uploaded image URL from Uploadthing if provided, else fallback to existingImageURL
    let imageURL =
      formData.get("imageURL") || formData.get("existingImageURL") || null;

    const data: any = {
      title,
      description,
      category,
      imageURL,
    };

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json({ product: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    // Use the uploaded image URL from Uploadthing if provided
    let imageURL = formData.get("imageURL") || null;

    const data: any = {
      title,
      description,
      category,
      imageURL,
    };

    const created = await prisma.product.create({ data });
    return NextResponse.json({ product: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
