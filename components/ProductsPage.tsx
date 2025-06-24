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
import { crud } from "@/app/api/apiService";

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

  const [allProducts, setallProduct] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await crud.loadAll("products");
        console.log("Fetched products:", response);
        setallProduct(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Updated allProducts:", allProducts);
  }, [allProducts]);

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
    let filtered = allProducts.filter((product: any) => {
      const matchesSearch =
        product.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(currentSearch.toLowerCase()) ||
        product.tags.some((tag: any) =>
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
    allProducts,
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
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}

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
                  {paginatedProducts.map((product: any) => (
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
