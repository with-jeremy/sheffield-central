"use client";

import React from "react";

interface PrintSizeSelectorProps {
  selectedSize: string | null;
  onSelect: (size: string, price: number) => void;
  pricing: Array<{ id: number; description: string; amount: number }>;
}

export default function PrintSizeSelector({
  selectedSize,
  onSelect,
  pricing,
}: PrintSizeSelectorProps) {
  if (!pricing) return null;

  return (
    <div className="mb-4">
      <div className="font-semibold mb-2 text-blue-800">Choose a size:</div>
      <div className="flex flex-col gap-2">
        {pricing.map((size) => (
          <label
            key={size.id}
            className="flex items-center gap-2 cursor-pointer text-blue-800"
          >
            <input
              type="radio"
              name="print-size"
              value={size.description}
              checked={selectedSize === size.description}
              onChange={() => onSelect(size.description, size.amount)}
              className="accent-blue-600"
            />
            <span>
              {size.description} - ${Number(size.amount).toFixed(2)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
