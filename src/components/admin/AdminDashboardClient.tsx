"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { 
  Plus, Trash2, Edit3, Image as ImageIcon, LogOut, 
  Building2, MapPin, Star, Search, LayoutDashboard, 
  Home, TrendingUp, Eye
} from "lucide-react";
import Image from "next/image";

interface PropertyItem {
  id: string;
  title: string;
  location: string;
  price: number;
  priceLabel: string;
  type: string;
  category: string;
  area: string | null;
  image: string;
  beds: number;
  baths: number;
  featured: boolean;
  createdAt: string;
}

export function AdminDashboardClient({ properties }: { properties: PropertyItem[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = properties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const stats = [
    { label: "Total Properties", value: properties.length, icon: Building2, color: "text-olive-600 bg-olive-50" },
    { label: "Featured", value: properties.filter(p => p.featured).length, icon: Star, color: "text-amber-600 bg-amber-50" },
    { label: "Apartments", value: properties.filter(p => p.category === "apartments").length, icon: Home, color: "text-blue-600 bg-blue-50" },
    { label: "Avg. Price", value: properties.length > 0 ? `₹${(properties.reduce((a, b) => a + b.price, 0) / properties.length / 10000000).toFixed(1)} Cr` : "—", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4]" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top Navigation */}
      <header className="bg-white border-b border-[#E8E4DC] sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 relative overflow-hidden">
              <Image src="/images/Colorful_Logo_icon_vector_transparent_bg.png" alt="Lifeway Logo" fill className="object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-[15px] font-bold text-[#1A1A1A] tracking-tight leading-none">Lifeway Admin</h1>
              <p className="text-[11px] text-[#8A8A8A] font-medium mt-0.5">Property Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open("/", "_blank")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#6B6B6B] hover:bg-[#F0EDE8] transition-colors"
            >
              <Eye size={15} />
              <span className="hidden sm:inline">View Site</span>
            </button>
            <div className="w-px h-6 bg-[#E8E4DC]" />
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-olive-50 border border-olive-100 flex items-center justify-center text-olive-600">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Dashboard</h2>
              <p className="text-sm text-[#8A8A8A]">Manage your property listings</p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/admin/properties/new")}
            variant="primary"
            className="gap-2 shadow-[0_4px_12px_rgba(107,142,35,0.25)]"
          >
            <Plus size={16} />
            Add Property
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#E8E4DC] p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={18} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{stat.value}</p>
              <p className="text-xs font-medium text-[#8A8A8A] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Property List Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          {/* Card Header */}
          <div className="p-5 border-b border-[#F0EDE8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-[#8A8A8A]" />
              <h3 className="font-bold text-[#1A1A1A]">All Properties</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#F0EDE8] text-[11px] font-bold text-[#6B6B6B]">{properties.length}</span>
            </div>
            <div className="relative max-w-xs w-full">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B0B0]" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-[#FAFAF8] outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm text-[#1A1A1A] placeholder:[#B0B0B0] transition-all"
              />
            </div>
          </div>

          {/* Property Rows */}
          {filteredProperties.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F0EDE8] flex items-center justify-center mx-auto mb-4">
                <Building2 size={28} className="text-[#B0B0B0]" />
              </div>
              <h4 className="text-lg font-bold text-[#1A1A1A] mb-1">
                {searchQuery ? "No results found" : "No properties yet"}
              </h4>
              <p className="text-sm text-[#8A8A8A] mb-6 max-w-sm mx-auto">
                {searchQuery
                  ? "Try adjusting your search terms."
                  : "Get started by adding your first property listing."}
              </p>
              {!searchQuery && (
                <Button onClick={() => router.push("/admin/properties/new")} variant="primary" className="gap-2">
                  <Plus size={16} /> Add Your First Property
                </Button>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-[#F0EDE8]">
              {filteredProperties.map((property) => (
                <li key={property.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FDFCFA] transition-colors group">
                  {/* Left: Image + Info */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#F0EDE8] rounded-xl overflow-hidden relative border border-[#E8E4DC] shrink-0">
                      {property.image && property.image !== "/images/hero.png" ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C0C0C0]">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-[#1A1A1A] text-sm sm:text-[15px] truncate">{property.title}</h3>
                        {property.featured && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase flex items-center gap-0.5">
                            <Star size={8} fill="currentColor" /> Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[#8A8A8A]">
                        <span className="font-semibold text-olive-600">{property.priceLabel}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-[#C0C0C0]" />
                        <MapPin size={11} className="shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#F0EDE8] text-[10px] font-semibold text-[#6B6B6B]">{property.type}</span>
                        {property.area && <span className="px-2 py-0.5 rounded-md bg-[#F0EDE8] text-[10px] font-semibold text-[#6B6B6B]">{property.area}</span>}
                        {property.beds > 0 && <span className="px-2 py-0.5 rounded-md bg-[#F0EDE8] text-[10px] font-semibold text-[#6B6B6B]">{property.beds} Bed</span>}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => router.push(`/admin/properties/${property.id}/edit`)}
                      className="w-9 h-9 rounded-lg border border-[#E8E4DC] flex items-center justify-center text-[#6B6B6B] hover:bg-[#F0EDE8] hover:text-[#1A1A1A] transition-all"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      disabled={deletingId === property.id}
                      className="w-9 h-9 rounded-lg border border-[#E8E4DC] flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === property.id ? (
                        <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
