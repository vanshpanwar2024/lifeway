"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PropertyForm } from "@/components/admin/PropertyForm";
import Image from "next/image";

export default function NewPropertyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-cream-50 pb-20 text-cream-900" style={{ fontFamily: "var(--font-sans)" }}>
      <header className="bg-white border-b border-cream-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full border border-cream-200 flex items-center justify-center text-cream-600 hover:bg-cream-100 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="w-8 h-8 relative overflow-hidden">
              <Image src="/images/Colorful_Logo_icon_vector_transparent_bg.png" alt="Lifeway Logo" fill className="object-contain" />
            </div>
            <h1 className="font-bold text-cream-900 tracking-tight">Add New Property</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <PropertyForm />
      </main>
    </div>
  );
}
