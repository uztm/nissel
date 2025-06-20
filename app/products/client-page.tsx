"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import your ProductsPage component
const ProductsPage = dynamic(() => import("@/components/ProductsPage"), {
  ssr: false,
});

export default function ProductsClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
