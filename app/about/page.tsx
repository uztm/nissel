"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Target,
  Heart,
  Award,
  Calendar,
  TrendingUp,
  Globe,
  Leaf,
  Shield,
  Star,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"



const values = [
  {
    icon: Heart,
    title: "Mijozlar muhabbati",
    description: "Har bir mijozimizni qadrlaymiz va ularning ehtiyojlarini birinchi o'ringa qo'yamiz.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Shield,
    title: "Sifat kafolati",
    description: "Faqat eng yuqori sifatli mahsulotlarni tanlaymiz va sifat nazoratini ta'minlaymiz.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Leaf,
    title: "Ekologik mas'uliyat",
    description: "Atrof-muhitni himoya qilish va barqaror rivojlanishni qo'llab-quvvatlaymiz.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Globe,
    title: "Global standartlar",
    description: "Xalqaro standartlarga rioya qilamiz va dunyoning eng yaxshi amaliyotlarini qo'llaymiz.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
]

const stats = [
  { number: "14+", label: "Yillik tajriba", icon: Calendar },
  { number: "15,000+", label: "Baxtli mijozlar", icon: Users },
  // { number: "500+", label: "Mahsulot turi", icon: Award },
  { number: "99%", label: "Mijoz mamnunligi", icon: Star },
]

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("mission")

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Biz haqimizda</h1>
            <p className="text-xl lg:text-2xl text-green-100 mb-8 leading-relaxed">
              2010 yildan beri O'zbekistonda eng sifatli choy va kofe mahsulotlarini taklif qilib kelmoqdamiz
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Play className="w-5 h-5 mr-2" />
                Bizning hikoyamiz
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                Jamoamiz bilan tanishing
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Bizning qadriyatlarimiz</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Biz faqat biznes emas, balki mijozlarimizning hayotiga ijobiy ta'sir ko'rsatishga intiluvchi jamoamiz
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="mission">Missiya</TabsTrigger>
              <TabsTrigger value="vision">Vizyon</TabsTrigger>
              <TabsTrigger value="values">Qadriyatlar</TabsTrigger>
            </TabsList>

            <TabsContent value="mission" className="space-y-6">
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Bizning missiyamiz</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Biz O'zbekiston xalqiga dunyoning eng sifatli choy va kofe mahsulotlarini yetkazib berish, har bir
                    mijozimizga mukammal xizmat ko'rsatish va mahalliy iqtisodiyotni rivojlantirishga hissa qo'shishni
                    o'z missiyamiz deb bilamiz.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold mb-1">Sifat kafolati</h4>
                        <p className="text-gray-600 text-sm">Har bir mahsulot ehtiyot bilan tanlanadi</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold mb-1">Mijoz mamnunligi</h4>
                        <p className="text-gray-600 text-sm">Mijozlarimizning ehtiyojlari birinchi o'rinda</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vision" className="space-y-6">
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Bizning vizyonimiz</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    2030 yilga kelib Markaziy Osiyoda choy va kofe sohasida yetakchi kompaniya bo'lish, innovatsion
                    yechimlar va barqaror rivojlanish orqali mijozlarimizga eng yaxshi tajribani taqdim etish.
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">Kelajak rejalari:</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        Yangi mahsulot liniyalarini ishlab chiqish
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        Xalqaro bozorga chiqish
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        Ekologik mahsulotlar ishlab chiqarish
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="values" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const IconComponent = value.icon
                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div
                          className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", value.bgColor)}
                        >
                          <IconComponent className={cn("w-6 h-6", value.color)} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Company History Timeline */}
      

      {/* Team Section */}
      

      {/* Video Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Bizning hikoyamizni tomosha qiling</h2>
            <p className="text-xl text-green-100 mb-8">
              Qanday qilib kichik orzudan katta kompaniyaga aylanganligimizni bilib oling
            </p>

            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Company video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Bizga qo'shiling!</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sifatli mahsulotlar va mukammal xizmat tajribasini his qilish uchun bugun bizdan xarid qiling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/products">Mahsulotlarni ko'rish</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Biz bilan bog'laning</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
