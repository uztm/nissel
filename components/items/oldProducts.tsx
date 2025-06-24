"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, ShoppingCart, Eye, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Product } from "@/types/product";
import { OrderModal } from "../modal/orderModal";

interface ProductProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function NewProduct({
  product,
  viewMode = "grid",
}: ProductProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
  };

  const discountPercentage = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0;

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative sm:w-64 h-48 sm:h-auto flex-shrink-0">
              <img
                src={product.images[0].image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                  -{discountPercentage}%
                </Badge>
              )}
              {!product.in_stock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary">Tugagan</Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge variant="outline" className="mb-2 text-xs">
                        {product.brand}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="flex-shrink-0"
                    >
                      <Heart
                        className={cn(
                          "w-5 h-5",
                          isFavorite && "fill-red-500 text-red-500"
                        )}
                      />
                    </Button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    {/* <span className="text-sm text-gray-600">
                      {product.re} ta sharh
                    </span> */}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.original_price && (
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <OrderModal product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0].image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">
                -{discountPercentage}%
              </Badge>
            )}
            {!product.in_stock && <Badge variant="secondary">Tugagan</Badge>}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={cn(
                "w-5 h-5",
                isFavorite && "fill-red-500 text-red-500"
              )}
            />
          </Button>

          {/* Quick Actions - Show on Hover */}
          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            )}
          >
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 hover:bg-white"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 hover:bg-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!product.in_stock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Savatga
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              {/* <span className="text-xs text-gray-500">({product.reviews})</span> */}
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4 min-h-[1.5rem]">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <OrderModal product={product} />
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50"
              asChild
            >
              <Link href={`/products/${product.id}`}>Batafsil</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
