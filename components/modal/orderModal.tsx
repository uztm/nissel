"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { crud } from "@/app/api/apiService";
import { Product } from "@/types/product";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Regions in Uzbekistan (Uzbek)
const uzbekistanRegions = [
  "Toshkent",
  "Toshkent viloyati",
  "Andijon",
  "Buxoro",
  "Fargʻona",
  "Jizzax",
  "Xorazm",
  "Namangan",
  "Navoiy",
  "Qashqadaryo",
  "Qoraqalpogʻiston",
  "Samarqand",
  "Sirdaryo",
  "Surxondaryo",
];

type OrderModalProps = {
  product: Product;
  productId?: string;
  buttonText?: string;
  classStyle?: string;
};

export function OrderModal({
  product,
  buttonText,
  classStyle,
}: OrderModalProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "+998",
    region: "",
  });

  const [loading, setLoading] = useState(false);

  const isValid =
    formData.full_name.trim().length > 1 &&
    formData.phone_number.trim().length >= 9 &&
    formData.region.trim().length > 2;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("uz-UZ").format(price) + " so'm";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      await crud.create("order", {
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        region: formData.region,
        products: [product.id], // Only UUID
      });
      alert("Buyurtma yuborildi!");
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi. Qaytadan urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!product.in_stock}
          className={`${
            classStyle ?? "bg-green-600 hover:bg-green-700"
          } flex items-center`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {buttonText || "Sotib olish"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Sotib olish</DialogTitle>
            <DialogDescription>
              Iltimos, quyidagi maʼlumotlarni toʻldiring.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="full_name">Ism va familiya</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder="To‘liq ismingizni kiriting"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone_number">Telefon raqamingiz</Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                placeholder="+998 XX XXX XX XX"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="region">Viloyat</Label>
              <Input
                id="region"
                list="region-options"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                placeholder="Masalan: Samarqand"
                required
              />
              <datalist id="region-options">
                {uzbekistanRegions.map((region) => (
                  <option key={region} value={region} />
                ))}
              </datalist>
            </div>

            {/* Product Preview */}
            <div className="grid grid-cols-2 gap-3 border border-dashed border-green-300 p-4 rounded-md">
              <img
                src={product.images?.[0]?.image || "/placeholder.svg"}
                alt={product.title}
                className="w-24 h-24 rounded-md object-cover"
              />
              <div className="flex flex-col justify-between">
                <span className="text-sm font-semibold">{product.title}</span>
                <span className="text-xs line-clamp-2">
                  {product.description}
                </span>
                <span className="text-sm text-green-600">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Bekor qilish
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!isValid || loading}>
              {loading ? "Yuborilmoqda..." : "Sotib olish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
