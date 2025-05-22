import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, orderID, printId, size } = await req.json();
    // Find the product in the DB by id (printId is now the DB id)
    const product = await prisma.product.findUnique({
      where: { id: Number(printId) },
    });
    if (!product) {
      return NextResponse.json(
        { error: "Product not found in DB", debug: { id: printId } },
        { status: 404 }
      );
    }
    // Save the order
    const order = await prisma.order.create({
      data: {
        productId: product.id,
        size: size || "default",
        price: amount,
        payerName: name || null,
        payerEmail: email || null,
        paypalOrderId: orderID || null,
      },
      include: { product: true },
    });
    return NextResponse.json({
      message: "Order saved",
      order,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error in payment API." },
      { status: 500 }
    );
  }
}
