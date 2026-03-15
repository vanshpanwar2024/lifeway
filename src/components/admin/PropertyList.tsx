"use client";

import { useState } from "react";
import { Plus, Trash, Pencil, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export function PropertyList({ properties }: { properties: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    setLoading(id);
    try {
      await fetch(`/api/properties/${id}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cream-900">Properties</h2>
          <p className="text-cream-500">Manage your real estate listings</p>
        </div>
        <Button onClick={() => router.push("/admin/properties/new")} variant="primary" className="gap-2">
          <Plus size={16} />
          Add Property
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm">
        <ul className="divide-y divide-cream-100">
          {properties.length === 0 ? (
            <li className="p-8 text-center text-cream-500">No properties found. Click "Add Property" to create one.</li>
          ) : (
            properties.map((property) => (
              <li key={property.id} className="p-5 flex items-center justify-between hover:bg-cream-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-cream-100 rounded-xl overflow-hidden relative border border-cream-200 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {property.image ? (
                           // eslint-disable-next-line @next/next/no-img-element
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cream-400">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-cream-900">{property.title}</h3>
                    <div className="text-sm text-cream-500 mt-1 flex items-center gap-3">
                      <span className="font-medium text-olive-600">{property.priceLabel}</span>
                      <span className="w-1 h-1 rounded-full bg-cream-300" />
                      <span>{property.type}</span>
                      <span className="w-1 h-1 rounded-full bg-cream-300" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="p-2 h-auto"
                    onClick={() => alert('Editing functionality available soon.')}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    className="p-2 h-auto text-red-500 hover:text-red-700 hover:bg-red-50 border-cream-200 hover:border-red-200"
                    onClick={() => handleDelete(property.id)}
                    disabled={loading === property.id}
                  >
                    {loading === property.id ? (
                      <span className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
                    ) : (
                      <Trash size={16} />
                    )}
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
