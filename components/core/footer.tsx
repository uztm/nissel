"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp,
  Globe,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerSections = {
  company: {
    title: "Kompaniya",
    links: [
      { label: "Biz haqimizda", href: "/about" },
      { label: "Biz bilan aloqa", href: "/contacts" },
      { label: "Mahsulot sotib olish", href: "/products" },
    ],
  },
  products: {
    title: "Mahsulotlar",
    links: [
      { label: "Choylar", href: "/products?category=" },
      { label: "Damlamalar", href: "/products?category=" },
      { label: "O'simlik choylari", href: "/products" },
    ],
  },

  legal: {
    title: "Huquqiy",
    links: [
      { label: "Maxfiylik siyosati", href: "/" },
      { label: "Foydalanish shartlari", href: "/" },
      { label: "Cookie siyosati", href: "/" },
      { label: "Qaytarish siyosati", href: "/" },
    ],
  },
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/tm_bekzod",
    icon: Instagram,
    color: "hover:text-pink-600",
    bgColor: "hover:bg-pink-50",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/tmbekzod",
    icon: Linkedin,
    color: "hover:text-blue-700",
    bgColor: "hover:bg-blue-50",
  },
  {
    name: "YouTube",
    href: "https://t.me/tmbekzod",
    icon: Youtube,
    color: "hover:text-red-600",
    bgColor: "hover:bg-red-50",
  },
];

const contactInfo = {
  address: "Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi 1-uy",
  phone: "+998 33 225 55 05",
  email: "info@company.uz",
  workingHours: "Dush-Juma: 9:00-18:00, Shanba: 9:00-15:00",
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    setEmail("");
    // Show success message (you can implement toast notification here)
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background text-white relative">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo & Description */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <img src="/assets/logo.svg" className="w-20" alt="" />
              </Link>
              <p className="text-gray-700 leading-relaxed mb-6">
                Biz eng sifatli choy va kofe mahsulotlarini taklif qilamiz. 2010
                yildan beri mijozlarimizga xizmat ko'rsatib kelmoqdamiz va har
                doim sifat va ta'mni birinchi o'ringa qo'yamiz.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Aloqa ma'lumotlari</h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-700 hover:text-green-500 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-700 hover:text-green-500 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  {contactInfo.workingHours}
                </p>
              </div>
            </div>

            {/* Newsletter Signup */}
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-700 hover:text-green-500 transition-colors text-sm block py-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media & Language */}
          <div className="lg:col-span-2 space-y-6">
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Ijtimoiy tarmoqlar</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-10 h-10 rounded-full bg-green-500 flex items-center justify-center transition-all duration-200",
                        social.bgColor,
                        social.color,
                        "hover:scale-110 hover:shadow-lg"
                      )}
                      aria-label={`${social.name}da kuzatib boring`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Certifications/Awards */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sertifikatlar</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  ISO 9001:2015
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Organik sertifikat
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Halol sertifikat
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} LOGO. Barcha huquqlar himoyalangan.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Saytdan foydalanish orqali siz{" "}
                <Link href="/terms" className="hover:text-green-500 underline">
                  foydalanish shartlari
                </Link>{" "}
                va{" "}
                <Link
                  href="/privacy"
                  className="hover:text-green-500 underline"
                >
                  maxfiylik siyosati
                </Link>
                ga rozilik bildirasiz.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">To'lov usullari:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  UZ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                <span className="text-green-500">
                  <a href="https://neurobit.me">Neurobit Systems</a>
                </span>{" "}
                tomonidan ishlab chiqilgan.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Build with code felt as art.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-900 rounded-[10px] p-2">
                <a href="https://neurobit.me">
                  <img src="/assets/neurobit.png" className="w-20" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-50 transition-all duration-300"
        size="icon"
        aria-label="Yuqoriga ko'tarish"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
}
