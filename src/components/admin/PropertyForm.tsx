"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Save, UploadCloud, X } from "lucide-react";

interface PropertyFormProps {
  initialData?: Record<string, any>;
  isEdit?: boolean;
}

export function PropertyForm({ initialData, isEdit = false }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || (initialData?.image ? [initialData.image] : []));
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setError("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newBase64 = reader.result as string;
      setGallery(prev => {
        const next = [...prev];
        next[index] = newBase64;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      location: formData.get("location"),
      price: parseFloat(formData.get("price") as string),
      priceLabel: formData.get("priceLabel"),
      type: formData.get("type"),
      category: formData.get("category"),
      area: formData.get("area"),
      areaNum: parseFloat(formData.get("areaNum") as string) || 0,
      image: gallery[0] || "/images/hero.png", 
      beds: parseInt(formData.get("beds") as string) || 0,
      baths: parseInt(formData.get("baths") as string) || 0,
      parking: parseInt(formData.get("parking") as string) || 0,
      yearBuilt: parseInt(formData.get("yearBuilt") as string) || new Date().getFullYear(),
      description: formData.get("description"),
      featured: formData.get("featured") === "on",
      features: (formData.get("features") as string)?.split(",").map((f: string) => f.trim()).filter(Boolean) || [],
      gallery: gallery.filter(Boolean), 
      developer: formData.get("developer"),
      possession: formData.get("possession"),
      rera: formData.get("rera")
    };

    try {
      const endpoint = isEdit ? `/api/properties/${initialData?.id}` : "/api/properties";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Failed to save property. Note: Neon DB Free Tier limits data sizes, ensure images are small.");
      
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl border border-cream-200 shadow-sm relative">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div>
        <h2 className="text-xl font-bold text-cream-900 mb-6 border-b border-cream-100 pb-2">Basic Information</h2>
        
        {/* Image Upload Area */}
        <div className="mb-6">
           <label className="text-sm font-semibold text-cream-700 mb-2 block">Property Images (Max 2) *</label>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {/* Slot 1 */}
             <div className="space-y-2">
               <div 
                 className={`w-full h-48 rounded-xl border-2 border-dashed border-cream-200 bg-cream-50 flex flex-col items-center justify-center relative overflow-hidden transition-all hover:bg-cream-100 cursor-pointer ${!gallery[0] && 'group'}`}
                 onClick={() => fileInputRef1.current?.click()}
               >
                 {gallery[0] ? (
                   <>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={gallery[0]} alt="Property preview 1" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                       <p className="text-white font-medium flex items-center gap-2">
                         <UploadCloud size={18} /> Change
                       </p>
                     </div>
                   </>
                 ) : (
                   <div className="text-center p-4">
                     <UploadCloud size={20} className="text-olive-500 mx-auto mb-2" />
                     <p className="text-xs font-bold text-cream-900">Main Image</p>
                   </div>
                 )}
                 <input ref={fileInputRef1} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 0)} />
               </div>
               {gallery[0] && (
                 <button type="button" onClick={() => removeImage(0)} className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                   <X size={12} /> Remove
                 </button>
               )}
             </div>

             {/* Slot 2 */}
             <div className="space-y-2">
               <div 
                 className={`w-full h-48 rounded-xl border-2 border-dashed border-cream-200 bg-cream-50 flex flex-col items-center justify-center relative overflow-hidden transition-all hover:bg-cream-100 cursor-pointer ${!gallery[1] && 'group'}`}
                 onClick={() => fileInputRef2.current?.click()}
               >
                 {gallery[1] ? (
                   <>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={gallery[1]} alt="Property preview 2" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                       <p className="text-white font-medium flex items-center gap-2">
                         <UploadCloud size={18} /> Change
                       </p>
                     </div>
                   </>
                 ) : (
                   <div className="text-center p-4">
                     <UploadCloud size={20} className="text-olive-500 mx-auto mb-2" />
                     <p className="text-xs font-bold text-cream-900">Gallery Image</p>
                   </div>
                 )}
                 <input ref={fileInputRef2} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 1)} />
               </div>
               {gallery[1] && (
                 <button type="button" onClick={() => removeImage(1)} className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                   <X size={12} /> Remove
                 </button>
               )}
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Property Title *</label>
            <input required defaultValue={initialData?.title} name="title" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm" placeholder="e.g. Premium 3 BHK Apartment" />
          </div>
          
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Location *</label>
            <input required defaultValue={initialData?.location} name="location" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm" placeholder="e.g. Sector 150, Noida" />
          </div>

          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Price (Exact Number) *</label>
            <input required defaultValue={initialData?.price} type="number" name="price" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm" placeholder="15000000" />
          </div>

          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Price Label (Display) *</label>
            <input required defaultValue={initialData?.priceLabel} name="priceLabel" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm" placeholder="e.g. ₹1.5 Cr Onwards" />
          </div>

          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Property Type *</label>
            <select required defaultValue={initialData?.type} name="type" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm">
              <option value="">Select Type</option>
              <option value="Residential Plot">Residential Plot</option>
              <option value="Apartment">Apartment</option>
              <option value="House/Villa">House/Villa</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Category filter *</label>
            <select required defaultValue={initialData?.category} name="category" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm">
              <option value="">Select Category</option>
              <option value="plots">Plots</option>
              <option value="apartments">Apartments</option>
              <option value="houses">Houses & Villas</option>
              <option value="farmhouses">Farmhouses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Details & Specs */}
      <div>
        <h2 className="text-xl font-bold text-cream-900 mb-6 border-b border-cream-100 pb-2">Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="col-span-2">
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Area Label</label>
            <input defaultValue={initialData?.area} name="area" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="1,200 sq. ft." />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Area Number (Sq Ft)</label>
            <input defaultValue={initialData?.areaNum} type="number" name="areaNum" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="1200" />
          </div>

          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Beds</label>
            <input defaultValue={initialData?.beds} type="number" name="beds" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="3" />
          </div>
          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Baths</label>
            <input defaultValue={initialData?.baths} type="number" name="baths" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="3" />
          </div>
          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Parking</label>
            <input defaultValue={initialData?.parking} type="number" name="parking" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Year Built</label>
            <input defaultValue={initialData?.yearBuilt} type="number" name="yearBuilt" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="2025" />
          </div>
        </div>
      </div>

      {/* Description & Features */}
      <div>
        <h2 className="text-xl font-bold text-cream-900 mb-6 border-b border-cream-100 pb-2">Description & Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Description *</label>
            <textarea required defaultValue={initialData?.description} name="description" rows={4} className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm resize-none" placeholder="Elaborate details about the property..." />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Features (comma separated)</label>
            <input defaultValue={initialData?.features?.join(", ")} name="features" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="Swimming Pool, Gym, Club House..." />
          </div>

          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Developer</label>
            <input defaultValue={initialData?.developer} name="developer" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="ATS Group" />
          </div>
          
          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Date of Possession</label>
            <input defaultValue={initialData?.possession} name="possession" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="Dec 2025" />
          </div>

          <div>
            <label className="text-sm font-semibold text-cream-700 mb-1.5 block">RERA ID</label>
            <input defaultValue={initialData?.rera} name="rera" className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 text-sm" placeholder="UPRERAA..." />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-cream-200 bg-cream-50 w-full hover:bg-cream-100 transition-colors">
              <input defaultChecked={initialData?.featured} type="checkbox" name="featured" className="w-5 h-5 rounded border-cream-300 text-olive-500 focus:ring-olive-500" />
              <span className="text-sm font-bold text-cream-900">Mark as Featured Property</span>
            </label>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-cream-200 flex items-center justify-end gap-4 relative z-10">
        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
        <Button variant="primary" type="submit" disabled={loading} className="gap-2">
          {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
          {isEdit ? "Update Property" : "Save Property"}
        </Button>
      </div>
    </form>
  );
}
