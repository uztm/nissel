"use client";
import Rowgrid3 from "@/components/core/hero/3rowgrid";
import Hero from "@/components/core/hero/hero";
import Matcha from "@/components/core/hero/matcha";
import Products from "@/components/core/hero/products";

export default function Home() {
  return (
    <div className="w-full bg-background min-h-screen container mx-auto px-6 py-12">
      <Hero />
      <Rowgrid3 />
      <Matcha />
      <Products />
    </div>
  );
}
