"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";

interface AlbumCoverProps {
  title: string;
  category: string;
  previewImage: string;
}

export default function AlbumCover({
  title,
  category,
  previewImage,
}: AlbumCoverProps) {
  return (
    <Link
      href={`/prints/${category}`}
      className="block cursor-pointer group"
      tabIndex={0}
      prefetch={true}
      aria-label={`View ${title} album`}
      style={{ textDecoration: "none" }}
    >
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Album thickness - right edge */}
        <div
          className="absolute top-0 right-0 w-8 h-full bg-amber-900 rounded-r-sm origin-right"
          style={{
            transform: "rotateY(90deg) translateZ(140px)",
            backgroundImage:
              "linear-gradient(to left, rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
          }}
        ></div>
        {/* Album thickness - bottom edge */}
        <div
          className="absolute bottom-0 left-0 w-full h-8 bg-amber-900 rounded-b-sm origin-bottom"
          style={{
            transform: "rotateX(-90deg) translateZ(140px)",
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
          }}
        ></div>
        {/* Album back cover */}
        <div
          className="absolute inset-0 w-[290px] h-[360px] bg-amber-800 rounded-lg shadow-2xl"
          style={{
            transform: "translateZ(-4px)",
            backgroundImage: "url('/leather-texture.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        {/* Album pages */}
        <div
          className="absolute inset-0 w-[280px] h-[350px] bg-amber-50 rounded-r-sm ml-[5px] mt-[5px]"
          style={{
            transform: "translateZ(-2px)",
          }}
        >
          {/* Page texture */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 19px, rgba(0,0,0,0.1) 20px)",
            }}
          ></div>
        </div>
        {/* Album front cover */}
        <div
          className="relative w-[280px] h-[350px] bg-amber-800 rounded-lg shadow-2xl overflow-hidden"
          style={{
            backgroundImage: "url('/leather-texture.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(0,0,0,0.2)",
            transformOrigin: "left center",
          }}
        >
          {/* Album binding */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[20px] bg-amber-900"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
            }}
          ></div>
          {/* Album binding details */}
          <div className="absolute left-[10px] top-[30px] bottom-[30px] w-[1px] bg-amber-700/50"></div>
          <div className="absolute left-[15px] top-[30px] bottom-[30px] w-[1px] bg-amber-700/50"></div>
          {/* Album title */}
          <div className="text-center mt-6 mb-4 px-6">
            <div className="inline-block bg-amber-100 px-6 py-2 rounded border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900">{title}</h2>
            </div>
          </div>
          {/* Preview image */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div
              className="bg-white p-3 pt-3 pb-4 shadow-md"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={previewImage || "/placeholder.svg"}
                  alt={`${title} Preview`}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-2 text-center">
                <p className="font-caveat text-lg text-amber-900">
                  {title} Collection
                </p>
              </div>
            </div>
          </div>
          {/* Decorative corner elements */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-200/50 rounded-tl-sm"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-200/50 rounded-tr-sm"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-200/50 rounded-bl-sm"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-200/50 rounded-br-sm"></div>
        </div>
      </div>
    </Link>
  );
}
