import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PropertyForm } from "@/components/admin/PropertyForm";
import Image from "next/image";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;
  let propertyStr = null;
  
  try {
    const property = await prisma.property.findUnique({
      where: { id }
    });
    
    if (property) {
      // Serialize dates so they can be passed to client component
      propertyStr = {
        ...property,
        createdAt: property.createdAt.toISOString(),
        updatedAt: property.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.error("Failed to load property:", error);
  }

  if (!propertyStr) {
    return (
      <div className="min-h-screen bg-cream-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cream-900 mb-2">Property Not Found</h1>
          <a href="/admin" className="text-olive-600 hover:text-olive-700 underline">Return to Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pb-20 text-cream-900" style={{ fontFamily: "var(--font-sans)" }}>
      <header className="bg-white border-b border-cream-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href="/admin"
              className="w-8 h-8 rounded-full border border-cream-200 flex items-center justify-center text-cream-600 hover:bg-cream-100 transition-colors"
            >
              <ArrowLeft size={16} />
            </a>
            <div className="w-8 h-8 relative overflow-hidden">
              <Image src="/images/Colorful_Logo_icon_vector_transparent_bg.png" alt="Lifeway Logo" fill className="object-contain" />
            </div>
            <h1 className="font-bold text-cream-900 tracking-tight">Edit Property</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <PropertyForm initialData={propertyStr} isEdit={true} />
      </main>
    </div>
  );
}
