import ProductForm from "@/components/admin/ProductForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductEditPage(props: {
  params: { id: string };
}) {
  const params = await props.params;
  const isNew = params.id === "new";
  let product = null;
  if (!isNew) {
    product = await prisma.product.findUnique({
      where: { id: Number(params.id) },
    });
    if (!product) return notFound();
  }
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? "Add New Product" : "Edit Product"}
      </h1>
      <ProductForm product={product} />
    </div>
  );
}
