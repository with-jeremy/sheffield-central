"use client";
import { useState, useEffect } from "react";
import PolaroidImage from "../PolaroidImage";

const categories = [
  { label: "All", value: "" },
  { label: "Village", value: "VILLAGE" },
  { label: "Historic", value: "HISTORIC" },
  { label: "Contemporary", value: "CONTEMPORARY" },
];

export default function ProductAdminTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const params = new URLSearchParams({
        skip: String((page - 1) * pageSize),
        take: String(pageSize),
      });
      if (category) params.append("category", category);
      if (search) params.append("search", search);
      // Use the dashboard-specific API route
      const res = await fetch(`/dashboard/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setIsLoading(false);
    }
    fetchProducts();
  }, [search, category, page]);

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <input
          className="border rounded px-2 py-1"
          placeholder="Search by title, description, or ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border rounded px-2 py-1"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2 text-sm text-gray-700">
        Showing {total === 0 ? 0 : from}-{to} of {total} results
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 album-contents">
        {isLoading ? (
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div>No products found.</div>
        ) : (
          products.map((product) => (
            <a
              key={product.id}
              href={`/dashboard/products/${product.id}`}
              className="transform transition-transform hover:scale-105 block"
            >
              <PolaroidImage
                src={product.imageURL}
                alt={product.title ?? ""}
                title={product.description ?? ""}
                width={300}
                height={300}
                showPriceSticker={false}
              />
            </a>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          <button
            className="border rounded px-2 py-1"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="border rounded px-2 py-1"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
