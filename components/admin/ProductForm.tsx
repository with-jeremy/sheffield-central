"use client";
import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";

const categories = [
  { label: "Village", value: "VILLAGE" },
  { label: "Historic", value: "HISTORIC" },
  { label: "Contemporary", value: "CONTEMPORARY" },
];

export default function ProductForm({ product }) {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "VILLAGE");
  const [imageUrl, setImageUrl] = useState(product?.imageURL || "");
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData();
    if (product?.id) formData.append("id", product.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (imageUrl) {
      formData.append("imageURL", imageUrl);
    } else if (product?.imageURL) {
      formData.append("existingImageURL", product.imageURL);
    }
    const method = product?.id ? "PUT" : "POST";
    let errorMsg = "";
    try {
      const res = await fetch("/dashboard/api/products", {
        method,
        body: formData,
      });
      setIsSaving(false);
      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await res.json().catch(() => ({}));
        errorMsg = data?.error || "Failed to save product. Please try again.";
        alert(errorMsg);
      }
    } catch (err) {
      setIsSaving(false);
      errorMsg = err?.message || "Network error. Please try again.";
      alert(errorMsg);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="border rounded px-2 py-1 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-1">Image</label>
        <div className="mb-2">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mx-auto max-h-48 mb-2 rounded shadow"
            />
          )}
        </div>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res[0]?.url) {
              setImageUrl(res[0].url);
              setUploadError("");
            } else {
              setUploadError("Upload failed. Please try again.");
            }
          }}
          onUploadError={(error) => {
            setUploadError(error.message);
          }}
        />
        {uploadError && <div className="text-red-600 mt-2">a{uploadError}</div>}
      </div>
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 disabled:opacity-50"
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
