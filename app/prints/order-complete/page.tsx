import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function OrderCompletePage({ searchParams }: { searchParams: { orderId?: string } }) {
  const orderId = Number(searchParams?.orderId)
  if (!orderId) return <div className="p-8 text-center text-red-700">Order not found.</div>
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { product: true },
  })
  if (!order) return notFound()
  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 pt-20">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-purple-900 mb-4">Thank you for your order!</h1>
        <div className="mb-4">Your order has been received and saved.</div>
        <div className="mb-2"><b>Order ID:</b> {order.id}</div>
        <div className="mb-2"><b>Product:</b> {order.product?.title}</div>
        <div className="mb-2"><b>Category:</b> {order.product?.category}</div>
        <div className="mb-2"><b>Price:</b> ${order.price.toFixed(2)}</div>
        <div className="mb-2"><b>Size:</b> {order.size}</div>
        <div className="mb-2"><b>Ordered at:</b> {order.createdAt.toLocaleString()}</div>
        <div className="mt-6">
          <a href="/prints/buy-prints" className="text-purple-900 hover:underline">Back to Prints</a>
        </div>
      </div>
    </div>
  )
}
