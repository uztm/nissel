import { OrderModal } from "@/components/modal/contact";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-[#F2F7EC] overflow-hidden w-full rounded-2xl grid grid-cols-1 md:grid-cols-2 items-center">
      {/* Left Content */}
      <div className="p-6 md:p-10 space-y-6">
        <img src="/assets/logo.svg" className="w-12" alt="" />

        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-800">
          Premium Organik Matcha bilan kuningizni yuqori darajaga olib chiqing
        </h2>

        <p className="text-gray-600 text-base md:text-lg">
          Yaponiyaning soya ostida o‘stirilgan eng yaxshi choy barglaridan
          tayyorlangan
          <span className="font-semibold text-green-700">
            {" "}
            Nissel Organik Matcha
          </span>{" "}
          — tabiiy energiya, antioksidantlar va nafis ta’m manbai.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link href={"products"}>
            <Button className="bg-green-700 hover:bg-green-800 text-white">
              Sotib oling
            </Button>
          </Link>
          <OrderModal />
        </div>
      </div>

      {/* Right - Separate Images with Fade Carousel */}
      <div className="relative p-6 md:p-10 flex justify-center items-center">
        <div className="relative w-full max-w-md md:max-w-lg aspect-[4/3]">
          <img
            src="/assets/herobanner.png"
            alt="Hero Banner 1"
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-xl transition-opacity duration-1000 ease-in-out ${
              currentImage === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
          <img
            src="/assets/herobanner2.png"
            alt="Hero Banner 2"
            className={`absolute top-0 left-0 w-full h-full object-contain rounded-xl transition-opacity duration-1000 ease-in-out ${
              currentImage === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
