import prisma from '@/lib/prisma'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { format } from 'date-fns'
import DashboardPayPalButton from '@/components/DashboardPayPalButton'

// Types for products and orders
type Product = {
  id: number;
  title: string | null;
  description: string | null;
  category: string;
  imageURL: string;
  price: any;
};
type Order = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  product: Product | null;
};

export default async function DashboardPage({ searchParams }: { searchParams?: { page?: string, orderPage?: string } }) {
  const page = Number(searchParams?.page) || 1
  const orderPage = Number(searchParams?.orderPage) || 1
  const pageSize = 10

  // Fetch products paginated
  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      orderBy: { id: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count(),
  ])

  // Fetch orders paginated (most recent first)
  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (orderPage - 1) * pageSize,
      take: pageSize,
      include: { product: true },
    }),
    prisma.order.count(),
  ])

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">Create New Product</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Products List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="space-y-4">
            {products.map((product: Product) => (
              <Card key={product.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium">{product.title}</div>
                  <div className="text-sm text-muted-foreground">{product.category}</div>
                  <div className="text-sm">${product.price.toFixed(2)}</div>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/dashboard/products/${product.id}`}>Edit</Link>
                </Button>
                {/* PayPal Buy Now Button */}
                <DashboardPayPalButton product={product} />
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={`?page=${page - 1 > 0 ? page - 1 : 1}`}/>
                </PaginationItem>
                {Array.from({ length: Math.ceil(totalProducts / pageSize) }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href={`?page=${i + 1}`} isActive={page === i + 1}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href={`?page=${page + 1 <= Math.ceil(totalProducts / pageSize) ? page + 1 : page}`}/>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        {/* Orders List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <div className="space-y-4">
            {orders.map((order: Order) => (
              <Card key={order.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium">{order.product?.title || 'Deleted Product'}</div>
                  <div className="text-sm text-muted-foreground">{order.product?.category}</div>
                  <div className="text-sm">Ordered: {format(order.createdAt, 'yyyy-MM-dd HH:mm')}</div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={`?orderPage=${orderPage - 1 > 0 ? orderPage - 1 : 1}`}/>
                </PaginationItem>
                {Array.from({ length: Math.ceil(totalOrders / pageSize) }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href={`?orderPage=${i + 1}`} isActive={orderPage === i + 1}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href={`?orderPage=${orderPage + 1 <= Math.ceil(totalOrders / pageSize) ? orderPage + 1 : orderPage}`}/>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}