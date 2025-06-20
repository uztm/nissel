"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, X, Grid, List, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Product from "@/components/items/product";

import { cn } from "@/lib/utils";
import ProductSkeleton from "@/components/items/product-skeleton";
import NewProduct from "@/components/items/oldProducts";

// Mock data with more comprehensive product information
const allProducts = [
  {
    id: 1,
    title: "Matcha May bilan Sencha 100g Uji (Yanoen)",
    description:
      "Premium Japanese green tea with authentic matcha flavor. Perfect for traditional tea ceremonies and daily enjoyment.",
    image: "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
    price: 45000,
    originalPrice: 55000,
    category: "choy",
    brand: "Yanoen",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    tags: ["premium", "organic", "japanese"],
    discount: 18,
  },
  {
    id: 2,
    title: "Earl Grey Classic 200g",
    description:
      "Traditional Earl Grey tea with bergamot oil. A timeless classic that delivers exceptional taste and aroma.",
    image: "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
    price: 32000,
    originalPrice: 38000,
    category: "choy",
    brand: "Twinings",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    tags: ["classic", "bergamot"],
    discount: 16,
  },
  {
    id: 3,
    title: "Arabica Coffee Beans 500g",
    description:
      "Premium Arabica coffee beans sourced from Ethiopian highlands. Rich flavor with chocolate undertones.",
    image: "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
    price: 78000,
    originalPrice: 85000,
    category: "kofe",
    brand: "Ethiopian Gold",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    tags: ["premium", "arabica", "ethiopian"],
    discount: 8,
  },
  {
    id: 4,
    title: "Chamomile Herbal Tea 150g",
    description:
      "Soothing chamomile flowers for relaxation and better sleep. Naturally caffeine-free herbal blend.",
    image: "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
    price: 28000,
    originalPrice: 32000,
    category: "o'simlik-choylari",
    brand: "Nature's Best",
    rating: 4.4,
    reviews: 67,
    inStock: true,
    tags: ["herbal", "caffeine-free", "relaxing"],
    discount: 13,
  },
  {
    id: 5,
    title: "Oolong Dragon Well 100g",
    description:
      "Semi-fermented Chinese oolong tea with complex flavor profile. Perfect balance between green and black tea.",
    image: "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
    price: 52000,
    originalPrice: 60000,
    category: "choy",
    brand: "Dragon Well",
    rating: 4.7,
    reviews: 156,
    inStock: false,
    tags: ["chinese", "oolong", "premium"],
    discount: 13,
  },
  {
    id: 6,
    title: "Espresso Blend 250g",
    description:
      "Perfect espresso blend for coffee enthusiasts. Rich crema and intense flavor for the perfect shot.",
    image: "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
    price: 65000,
    originalPrice: 72000,
    category: "kofe",
    brand: "Barista Pro",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    tags: ["espresso", "blend", "intense"],
    discount: 10,
  },
];

const categories = [
  { value: "all", label: "Barcha kategoriyalar" },
  { value: "choy", label: "Choy" },
  { value: "kofe", label: "Kofe" },
  { value: "o'simlik-choylari", label: "O'simlik choylari" },
];

const sortOptions = [
  { value: "newest", label: "Eng yangi" },
  { value: "price-low", label: "Narx: Arzondan qimmmatga" },
  { value: "price-high", label: "Narx: Qimmatdan arzonga" },
  { value: "rating", label: "Eng yuqori reyting" },
  { value: "popular", label: "Mashhur" },
];

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current filters from URL
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentMinPrice = parseInt(searchParams.get("minPrice") || "0");
  const currentMaxPrice = parseInt(searchParams.get("maxPrice") || "100000");

  // Update URL with new parameters
  const updateURL = (params: Record<string, string | number>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === "" || value === "all" || value === 1) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value.toString());
      }
    });

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(currentSearch.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(currentSearch.toLowerCase())
        );

      const matchesCategory =
        currentCategory === "all" || product.category === currentCategory;
      const matchesPrice =
        product.price >= currentMinPrice && product.price <= currentMaxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (currentSort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // newest - keep original order
        break;
    }

    return filtered;
  }, [
    currentSearch,
    currentCategory,
    currentSort,
    currentMinPrice,
    currentMaxPrice,
  ]);

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentSearch, currentCategory, currentSort, currentPage]);

  // Initialize price range from URL
  useEffect(() => {
    setPriceRange([currentMinPrice, currentMaxPrice]);
  }, [currentMinPrice, currentMaxPrice]);

  const handleSearch = (value: string) => {
    updateURL({ search: value, page: 1 });
  };

  const handleCategoryChange = (category: string) => {
    updateURL({ category, page: 1 });
  };

  const handleSortChange = (sort: string) => {
    updateURL({ sort, page: 1 });
  };

  const handlePriceRangeChange = (range: number[]) => {
    setPriceRange(range);
    updateURL({ minPrice: range[0], maxPrice: range[1], page: 1 });
  };

  const clearFilters = () => {
    router.push(pathname);
    setPriceRange([0, 100000]);
  };

  const activeFiltersCount = [
    currentSearch !== "",
    currentCategory !== "all",
    currentMinPrice !== 0 || currentMaxPrice !== 100000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mahsulotlar</h1>
              <p className="text-gray-600 mt-2">
                {filteredAndSortedProducts.length} ta mahsulot topildi
              </p>
            </div>

            {/* Search Bar
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Mahsulotlarni qidiring..."
                value={currentSearch}
                onChange={(e: any) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filtrlar</h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Tozalash
                    </Button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Kategoriya</h4>
                  <Select
                    value={currentCategory}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Narx oralig'i</h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                      max={100000}
                      min={0}
                      step={1000}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{priceRange[0].toLocaleString()} so'm</span>
                      <span>{priceRange[1].toLocaleString()} so'm</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filtrlar
                      {activeFiltersCount > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-2 px-1.5 py-0.5 text-xs"
                        >
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtrlar</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      {/* Mobile filters content - same as desktop */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Kategoriya</h4>
                        <Select
                          value={currentCategory}
                          onValueChange={handleCategoryChange}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Narx oralig'i</h4>
                        <div className="px-2">
                          <Slider
                            value={priceRange}
                            onValueChange={handlePriceRangeChange}
                            max={100000}
                            min={0}
                            step={1000}
                            className="mb-4"
                          />
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{priceRange[0].toLocaleString()} so'm</span>
                            <span>{priceRange[1].toLocaleString()} so'm</span>
                          </div>
                        </div>
                      </div>

                      {activeFiltersCount > 0 && (
                        <Button
                          variant="outline"
                          onClick={clearFilters}
                          className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Filtrlarni tozalash
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="hidden sm:flex items-center gap-2">
                    {currentSearch && (
                      <Badge variant="secondary" className="gap-1">
                        Qidiruv: {currentSearch}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleSearch("")}
                        />
                      </Badge>
                    )}
                    {currentCategory !== "all" && (
                      <Badge variant="secondary" className="gap-1">
                        {
                          categories.find((c) => c.value === currentCategory)
                            ?.label
                        }
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleCategoryChange("all")}
                        />
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={currentSort} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="px-3"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {isLoading ? (
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                )}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={i} viewMode={viewMode} />
                ))}
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Hech narsa topilmadi
                </h3>
                <p className="text-gray-600 mb-4">
                  Qidiruv so'rovingizga mos mahsulot topilmadi
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Filtrlarni tozalash
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  )}
                >
                  {paginatedProducts.map((product) => (
                    <NewProduct
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => updateURL({ page: currentPage - 1 })}
                    >
                      Oldingi
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => updateURL({ page })}
                          className="w-10 h-10 p-0"
                        >
                          {page}
                        </Button>
                      )
                    )}

                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => updateURL({ page: currentPage + 1 })}
                    >
                      Keyingi
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
