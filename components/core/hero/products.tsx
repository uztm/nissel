import { crud } from "@/app/api/apiService";
import NewProduct from "@/components/items/oldProducts";
import Product from "@/components/items/product";
import { Button } from "@/components/ui/button";
import { Product as Tps } from "@/types/product";
import React, { useEffect } from "react";

export default function Products() {
  const [products, setProducts] = React.useState<Tps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await crud.loadAll("products");
        setProducts(response);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []); // <-- add this empty array here

  return (
    <div className="mt-10 ">
      <h1 className="text-3xl font-bold mb-6">Mahsulotlar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <NewProduct key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button className="bg-green-500 px-6 py-2 ">Barcha mahsulotlar</Button>
      </div>
    </div>
  );
}
