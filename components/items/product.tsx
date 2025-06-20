import React from "react";
import { Button } from "../ui/button";

export default function Product({ product }: any) {
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-2xl mb-4"
        />
        <h2 className="font-semibold text-lg">{product.title}</h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {product.description}
        </p>

        <div className="grid grid-cols-2 w-full gap-4 mt-4">
          <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
            Sotib oling
          </Button>
          <Button
            variant="outline"
            className="w-full border-green-600 text-green-700 hover:bg-green-50"
          >
            Batafsil
          </Button>
        </div>
      </div>
    </>
  );
}
