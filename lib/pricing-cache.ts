import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getCachedPricing = unstable_cache(
  async () => {
    return await prisma.pricing.findMany({ orderBy: { id: "asc" } });
  },
  ["pricing-table"],
  { tags: ["pricing"], revalidate: 2592000 } // 30 days
);
