import ProductAdminTable from "@/components/admin/ProductAdminTable";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Product Dashboard</h1>
        <a
          href="/dashboard/products/new"
          className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800"
        >
          + New Product
        </a>
      </div>
      <ProductAdminTable />
    </div>
  );
}
