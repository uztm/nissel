"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, ShoppingCart, Share2, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import { cn } from "@/lib/utils"
import Link from "next/link"
import ProductGallery from "@/components/items/product-gallery"
import ProductReviews from "@/components/items/product-reviews"

import ProductSkeleton from "@/components/items/product-detail-skeleton"

// Extended mock data with more details
const allProducts = [
  {
    id: 1,
    title: "Matcha May bilan Sencha 100g Uji (Yanoen)",
    description:
      "Premium Japanese green tea with authentic matcha flavor. Perfect for traditional tea ceremonies and daily enjoyment. This exceptional blend combines the finest Uji matcha with premium sencha leaves, creating a harmonious balance of umami and sweetness.",
    images: [
      "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
      "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
      "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
      "https://optim.tildacdn.com/tild3132-3430-4039-a131-396162653830/-/format/webp/fukamushi-1.jpg.webp",
    ],
    price: 45000,
    originalPrice: 55000,
    category: "choy",
    brand: "Yanoen",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stockCount: 15,
    tags: ["premium", "organic", "japanese"],
    discount: 18,
    specifications: {
      "Og'irligi": "100g",
      "Kelib chiqishi": "Yaponiya, Uji",
      "Turi": "Matcha Sencha",
      "Organik": "Ha",
      "Kafeyin miqdori": "O'rtacha",
      "Saqlash muddati": "2 yil",
    },
    features: [
      "100% organik yapon choyi",
      "Uji hududidan premium matcha",
      "Antioksidantlarga boy",
      "Kafeyin miqdori muvozanatli",
      "Choy marosimi uchun ideal",
    ],
    shippingInfo: {
      freeShipping: true,
      estimatedDays: "2-3 kun",
      shippingCost: 0,
    },
    returnPolicy: "30 kun ichida qaytarish mumkin",
    warranty: "Sifat kafolati",
  },
  {
    id: 2,
    title: "Earl Grey Classic 200g",
    description:
      "Traditional Earl Grey tea with bergamot oil. A timeless classic that delivers exceptional taste and aroma.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    price: 32000,
    originalPrice: 38000,
    category: "choy",
    brand: "Twinings",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    stockCount: 8,
    tags: ["classic", "bergamot"],
    discount: 16,
    specifications: {
      "Og'irligi": "200g",
      "Kelib chiqishi": "Angliya",
      "Turi": "Earl Grey",
      "Bergamot moyi": "Ha",
      "Kafeyin miqdori": "Yuqori",
      "Saqlash muddati": "3 yil",
    },
    features: [
      "Klassik Earl Grey ta'mi",
      "Tabiiy bergamot moyi",
      "Premium qora choy",
      "Kuchli aroma",
      "Har qanday vaqt uchun ideal",
    ],
    shippingInfo: {
      freeShipping: false,
      estimatedDays: "3-5 kun",
      shippingCost: 15000,
    },
    returnPolicy: "15 kun ichida qaytarish mumkin",
    warranty: "Sifat kafolati",
  },
  // Add more products as needed...
]

const reviews = [
  {
    id: 1,
    productId: 1,
    userName: "Aziza Karimova",
    rating: 5,
    comment: "Juda sifatli choy! Ta'mi ajoyib, aroma ham zo'r. Tavsiya qilaman!",
    date: "2024-01-15",
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    userName: "Bobur Toshmatov",
    rating: 4,
    comment: "Yaxshi mahsulot, lekin narxi biroz qimmat. Ammo sifati bunga loyiq.",
    date: "2024-01-10",
    verified: true,
  },
  {
    id: 3,
    productId: 1,
    userName: "Malika Abdullayeva",
    rating: 5,
    comment: "Eng yaxshi matcha choy! Har kuni ichaman, energiya beradi.",
    date: "2024-01-05",
    verified: false,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const productId = Number.parseInt(params.id as string)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundProduct = allProducts.find(p => p.id === productId)
      setProduct(foundProduct)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [productId])

  if (isLoading) {
    return <ProductSkeleton />
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Mahsulot topilmadi</h1>
          <p className="text-gray-600 mb-6">Kechirasiz, siz qidirayotgan mahsulot mavjud emas.</p>
          <Button onClick={() => router.push("/products")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Mahsulotlarga qaytish
          </Button>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of product ${product.id} to cart`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const productReviews = reviews.filter(review => review.productId === product.id)
  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Asosiy</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-blue-600">Mahsulotlar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            <ProductGallery 
              images={product.images} 
              productTitle={product.title}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                {discountPercentage > 0 && (
                  <Badge className="bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>
                )}
                {product.stockCount <= 5 && (
                  <Badge variant="destructive">Kam qoldi!</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="font-medium ml-2">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviews} ta sharh)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-green-600">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  product.inStock ? "bg-green-500" : "bg-red-500"
                )} />
                <span className={cn(
                  "font-medium",
                  product.inStock ? "text-green-600" : "text-red-600"
                )}>
                  {product.inStock ? `Mavjud (${product.stockCount} ta)` : "Tugagan"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Asosiy xususiyatlar:</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Miqdor:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                    className="h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-green-600 hover:bg-green-700 h-12"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Savatga qo'shish
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="h-12"
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-red-500 text-red-500")} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="h-12"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Yetkazib berish</p>
                      <p className="text-sm text-gray-600">
                        {product.shippingInfo.freeShipping ? "Bepul yetkazib berish" : `${formatPrice(product.shippingInfo.shippingCost)} yetkazib berish`}
                      </p>
                      <p className="text-sm text-gray-600">{product.shippingInfo.estimatedDays}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Qaytarish</p>
                      <p className="text-sm text-gray-600">{product.returnPolicy}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Kafolat</p>
                      <p className="text-sm text-gray-600">{product.warranty}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
