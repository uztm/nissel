import Product from "@/components/items/product";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Products() {
  const products = [
    {
      id: 1,
      title: "Matcha May bilan Sencha 100g Uji (Yanoen)",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "/assets/product.png",
    },
    {
      id: 2,
      title: "Matcha May bilan Sencha 100g Uji (Yanoen)",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "/assets/product.png",
    },
    {
      id: 3,
      title: "Matcha May bilan Sencha 100g Uji (Yanoen)",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "/assets/product.png",
    },
  ];

  return (
    <div className="mt-10 ">
      <h1 className="text-3xl font-bold mb-6">Mahsulotlar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button
          variant="outline"
          className="border border-green-600 text-green-700 hover:bg-green-50 px-6 py-2 "
        >
          Barcha mahsulotlar
        </Button>
      </div>
    </div>
  );
}
