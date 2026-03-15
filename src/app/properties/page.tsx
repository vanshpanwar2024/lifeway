"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { 
  MapPin, PhoneCall, Search, X, ArrowRight, ArrowUpDown, 
  Grid3x3, LayoutList, ChevronDown, Check, Maximize2,
  Ruler, BedDouble, Bath, Car, Trees, Shield, Wifi, Dumbbell,
  Building2, Star, Mail, User, MessageSquare, Send
} from "lucide-react";
import { useState, useEffect, useRef, useMemo, Suspense } from "react";

/* ───────── Property Type Definition ───────── */
type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  priceLabel: string;
  type: string;
  category: string;
  area: string;
  areaNum: number;
  image: string;
  beds: number;
  baths: number;
  parking: number;
  yearBuilt: number;
  featured: boolean;
  description: string;
  features: string[];
  gallery: string[];
  developer: string;
  possession: string;
  rera: string;
};

// Removed hardcoded allProperties array
type SortOption = "price-asc" | "price-desc" | "area-asc" | "area-desc" | "newest";

const categoryOptions = [
  { value: "all", label: "All Types" },
  { value: "plots", label: "Plots" },
  { value: "apartments", label: "Apartments" },
  { value: "houses", label: "Houses & Villas" },
  { value: "farmhouses", label: "Farmhouses" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-asc", label: "Area: Small to Large" },
  { value: "area-desc", label: "Area: Large to Small" },
  { value: "newest", label: "Newest First" },
];

const featureIcons: Record<string, React.ElementType> = {
  "Swimming Pool": Bath,
  "Gymnasium": Dumbbell,
  "Private Garden": Trees,
  "24/7 Security": Shield,
  "Smart Home Ready": Wifi,
  "Private Pool": Bath,
  "Gated Community": Shield,
  "Club House": Building2,
  "RERA Registered": Shield,
};

/* ═══════════════════════════════════════════════ */
/* ──────── PROPERTY MODAL COMPONENT ─────────── */
/* ═══════════════════════════════════════════════ */
function PropertyModal({ property, onClose }: { property: Property; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setEnquirySubmitted(true);
      setTimeout(() => {
        setShowEnquiry(false);
        setEnquirySubmitted(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 3000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm modal-overlay" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-3xl max-w-5xl w-[95vw] max-h-[92vh] overflow-y-auto modal-content shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
        {/* Header Actions */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-xl border-b border-cream-200/50">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-olive-50 text-olive-700 text-xs font-bold uppercase">{property.type}</span>
            {property.featured && (
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase flex items-center gap-1">
                <Star size={12} fill="currentColor" /> Featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="p-2.5 rounded-full bg-cream-100 border border-cream-200 text-cream-600 hover:bg-cream-200 hover:text-cream-900 transition-all cursor-pointer ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {/* Main Image */}
            <div className="md:col-span-2 relative h-72 md:h-96 rounded-2xl overflow-hidden group">
              <Image
                src={property.gallery && property.gallery.length > 0 ? property.gallery[activeImage] : property.image || "/images/hero.png"}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3">
              {(property.gallery && property.gallery.length > 0 ? property.gallery : [property.image]).filter(Boolean).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-1 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    activeImage === idx 
                      ? 'ring-2 ring-olive-500 ring-offset-2' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="relative h-24 md:h-full min-h-[96px]">
                    <Image src={img || "/images/hero.png"} alt="" fill className="object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Property Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Price */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-cream-900 tracking-tight mb-3">{property.title}</h2>
                <div className="flex items-center gap-2 text-cream-600 mb-4">
                  <MapPin size={16} className="text-olive-500" />
                  <span className="text-[15px]">{property.location}</span>
                </div>
                <div className="text-3xl font-bold text-olive-600 tracking-tight">{property.priceLabel}</div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Ruler, label: "Area", value: property.area },
                  { icon: BedDouble, label: "Bedrooms", value: property.beds > 0 ? `${property.beds} Bed` : "N/A" },
                  { icon: Bath, label: "Bathrooms", value: property.baths > 0 ? `${property.baths} Bath` : "N/A" },
                  { icon: Car, label: "Parking", value: `${property.parking} Spot${property.parking > 1 ? 's' : ''}` },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-cream-50 rounded-xl p-4 text-center border border-cream-200">
                    <stat.icon size={20} className="mx-auto text-olive-500 mb-2" strokeWidth={1.5} />
                    <p className="text-xs text-cream-500 font-medium mb-1">{stat.label}</p>
                    <p className="text-sm font-bold text-cream-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-cream-900 mb-3" style={{ fontFamily: 'var(--font-sans)' }}>About this Property</h3>
                <p className="text-cream-600 leading-relaxed text-[15px]">{property.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-bold text-cream-900 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>Key Features & Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((feature, idx) => {
                    const Icon = featureIcons[feature] || Check;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-cream-50 border border-cream-200 hover:border-olive-200 hover:bg-olive-50/50 transition-all duration-200">
                        <div className="w-8 h-8 rounded-lg bg-olive-100 flex items-center justify-center text-olive-600 shrink-0">
                          <Icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-cream-800">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-cream-50 border border-cream-200">
                {[
                  { label: "Developer", value: property.developer },
                  { label: "Possession", value: property.possession },
                  { label: "RERA ID", value: property.rera },
                  { label: "Year Built", value: property.yearBuilt.toString() },
                  { label: "Category", value: property.type },
                  { label: "Status", value: property.featured ? "Featured" : "Available" },
                ].map((detail, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-semibold text-cream-500 uppercase tracking-wide mb-1">{detail.label}</p>
                    <p className="text-sm font-bold text-cream-800">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Enquiry Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* CTA Card */}
                <div className="bg-cream-50 border border-cream-200 rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-cream-900" style={{ fontFamily: 'var(--font-sans)' }}>Interested in this property?</h3>
                  <p className="text-sm text-cream-600">Contact our experts for site visits, detailed pricing, and more information.</p>
                  <Button 
                    variant="primary" 
                    className="w-full gap-2 h-12" 
                    onClick={() => setShowEnquiry(true)}
                  >
                    <PhoneCall size={16} />
                    Enquire Now
                  </Button>
                  <Button variant="outline" className="w-full gap-2 h-12">
                    <MessageSquare size={16} />
                    WhatsApp
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="bg-olive-50 border border-olive-200 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-olive-800 mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Why Choose This Property?</h4>
                  <ul className="space-y-2.5">
                    {["Verified by Lifeway Experts", "Best Price Guarantee", "Free Site Visit", "Loan Assistance"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm text-olive-700">
                        <div className="w-5 h-5 rounded-full bg-olive-200 flex items-center justify-center">
                          <Check size={12} className="text-olive-700" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEnquiry(false)} />
          <div className="relative z-10 bg-white rounded-2xl max-w-md w-[92vw] p-8 modal-content shadow-[0_40px_80px_rgba(0,0,0,0.2)]">
            <button 
              onClick={() => setShowEnquiry(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-cream-100 text-cream-500 hover:bg-cream-200 hover:text-cream-700 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            {enquirySubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-olive-100 flex items-center justify-center mx-auto mb-5 animate-scale-in">
                  <Check size={28} className="text-olive-600" />
                </div>
                <h3 className="text-2xl font-bold text-cream-900 mb-2">Enquiry Sent!</h3>
                <p className="text-cream-600 text-sm">Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-cream-900 mb-2">Enquire About</h3>
                <p className="text-sm text-cream-600 mb-6">{property.title} — {property.location}</p>
                <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm text-cream-900 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="you@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm text-cream-900 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Phone</label>
                    <div className="relative">
                      <PhoneCall size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm text-cream-900 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-cream-700 mb-1.5 block">Message (Optional)</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="I'm interested in visiting this property..."
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 outline-none focus:border-olive-400 focus:ring-2 focus:ring-olive-100 text-sm text-cream-900 transition-all resize-none"
                    />
                  </div>
                  <Button variant="primary" className="w-full h-12 gap-2" type="submit">
                    <Send size={16} />
                    Submit Enquiry
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/* ──────── PROPERTIES PAGE CONTENT ──────────── */
/* ═══════════════════════════════════════════════ */
function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Sync state with URL params
  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory);
  const [prevInitialSearch, setPrevInitialSearch] = useState(initialSearch);

  if (initialCategory !== prevInitialCategory) {
    setPrevInitialCategory(initialCategory);
    setSelectedCategory(initialCategory);
  }
  if (initialSearch !== prevInitialSearch) {
    setPrevInitialSearch(initialSearch);
    setSearchQuery(initialSearch);
  }

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSortDropdown]);

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          setAllProperties(data);
        }
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "area-asc":
        result.sort((a, b) => a.areaNum - b.areaNum);
        break;
      case "area-desc":
        result.sort((a, b) => b.areaNum - a.areaNum);
        break;
      case "newest":
        result.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
    }

    return result;
  }, [allProperties, selectedCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("price-asc");
  };

  const activeFiltersCount = (selectedCategory !== "all" ? 1 : 0) + (searchQuery.trim() ? 1 : 0);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-olive-gradient text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        {/* Floating orbs */}
        <div className="absolute top-10 right-20 w-40 h-40 bg-olive-300/20 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-olive-400/15 rounded-full blur-[60px] animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <h1 className="section-heading mb-6">Explore Properties</h1>
            <p className="text-xl md:text-2xl text-cream-600 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
              Curated listings of the finest homes, plots, and investment opportunities.
            </p>
          </AnimatedSection>

          {/* Search Bar */}
          <AnimatedSection delay={0.15}>
            <div className="max-w-2xl mx-auto relative">
              <div className="flex items-center bg-white rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-cream-200 overflow-hidden transition-all duration-300 focus-within:shadow-[0_8px_40px_rgba(107,142,35,0.15)] focus-within:border-olive-300">
                <div className="pl-5 pr-3">
                  <Search size={20} className="text-cream-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, location, features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-4 pr-2 bg-transparent outline-none text-cream-900 placeholder:text-cream-400 text-[15px] font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="p-2 mr-1 rounded-full hover:bg-cream-100 transition-colors text-cream-400 hover:text-cream-600 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                )}
                <button className="bg-olive-500 hover:bg-olive-600 text-white px-6 py-2.5 rounded-full mr-1.5 font-semibold text-sm transition-all cursor-pointer active:scale-95 flex items-center gap-2">
                  <Search size={16} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Bar + Properties Grid */}
      <section className="section-padding bg-cream min-h-screen !pt-0">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl -mt-6 relative z-10">
          
          {/* Filter/Sort Bar */}
          <div className="bg-white rounded-2xl border border-cream-200 shadow-(--shadow-soft) p-4 md:p-5 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Left: Category + Filter Toggle */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Category Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                        selectedCategory === cat.value
                          ? 'bg-olive-500 text-white shadow-[0_4px_12px_rgba(107,142,35,0.25)]'
                          : 'bg-cream-100 text-cream-700 hover:bg-cream-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Clear filters */}
                {activeFiltersCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="px-3 py-2 rounded-full text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <X size={12} />
                    Clear ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Right: Sort + View Toggle */}
              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div ref={sortRef} className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cream-200 bg-cream-50 hover:bg-cream-100 transition-all text-sm font-medium text-cream-700 cursor-pointer"
                  >
                    <ArrowUpDown size={16} />
                    <span className="hidden sm:inline">{sortOptions.find(s => s.value === sortBy)?.label}</span>
                    <ChevronDown size={14} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl border border-cream-200 shadow-[0_12px_40px_rgba(0,0,0,0.1)] py-2 w-52 z-30 animate-slide-down">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-all cursor-pointer flex items-center justify-between ${
                            sortBy === option.value
                              ? 'bg-olive-50 text-olive-700 font-semibold'
                              : 'text-cream-700 hover:bg-cream-50'
                          }`}
                        >
                          {option.label}
                          {sortBy === option.value && <Check size={14} className="text-olive-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-cream-100 rounded-xl p-1 border border-cream-200">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all cursor-pointer ${
                      viewMode === "grid" ? 'bg-white text-cream-900 shadow-sm' : 'text-cream-500 hover:text-cream-700'
                    }`}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all cursor-pointer ${
                      viewMode === "list" ? 'bg-white text-cream-900 shadow-sm' : 'text-cream-500 hover:text-cream-700'
                    }`}
                  >
                    <LayoutList size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-3 pt-3 border-t border-cream-100">
              <p className="text-sm text-cream-500">
                Showing <span className="font-bold text-cream-800">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
                {selectedCategory !== "all" && <span> in <span className="font-semibold text-olive-600">{categoryOptions.find(c => c.value === selectedCategory)?.label}</span></span>}
                {searchQuery && <span> matching &ldquo;<span className="font-semibold text-cream-800">{searchQuery}</span>&rdquo;</span>}
              </p>
            </div>
          </div>

          {/* Properties Grid/List */}
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-olive-200 border-t-olive-600 rounded-full animate-spin mb-4" />
              <p className="text-cream-600 font-medium font-sans">Loading properties...</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "flex flex-col gap-5"
            }>
              {filteredProperties.map((prop, idx) => (
                <AnimatedSection key={prop.id} delay={idx * 0.08} direction="up">
                  {viewMode === "grid" ? (
                    /* ── Grid Card ── */
                    <div className="olive-card !p-0 flex flex-col group overflow-hidden h-full">
                      {/* Image */}
                      <div className="relative h-60 overflow-hidden">
                        <Image 
                          src={prop.image} 
                          alt={prop.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-white/95 text-cream-900 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md uppercase">
                            {prop.type}
                          </span>
                          {prop.featured && (
                            <span className="bg-amber-400/90 text-amber-900 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                              <Star size={10} fill="currentColor" /> Featured
                            </span>
                          )}
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={() => setSelectedProperty(prop)}
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-cream-700 hover:bg-white hover:scale-110 transition-all cursor-pointer opacity-0 group-hover:opacity-100 shadow-sm"
                        >
                          <Maximize2 size={16} />
                        </button>

                        {/* Price overlay */}
                        <div className="absolute bottom-4 right-4 bg-olive-500/90 backdrop-blur-md text-white text-sm font-bold px-4 py-2 rounded-full">
                          {prop.priceLabel}
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="p-6 flex flex-col grow">
                        <h3 className="text-xl font-bold mb-2 text-cream-900 tracking-tight">{prop.title}</h3>
                        <div className="flex items-center text-cream-600 mb-3">
                          <MapPin size={14} className="mr-2 text-olive-500" strokeWidth={1.5} />
                          <span className="text-sm">{prop.location}</span>
                        </div>
                        
                        {/* Quick Features */}
                        <div className="flex items-center gap-4 text-cream-500 text-xs font-medium mb-4">
                          <span className="flex items-center gap-1"><Ruler size={12} /> {prop.area}</span>
                          {prop.beds > 0 && <><span className="w-px h-3 bg-cream-300" /><span className="flex items-center gap-1"><BedDouble size={12} /> {prop.beds} Bed</span></>}
                          {prop.baths > 0 && <><span className="w-px h-3 bg-cream-300" /><span className="flex items-center gap-1"><Bath size={12} /> {prop.baths} Bath</span></>}
                        </div>

                        {/* Feature tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {prop.features.slice(0, 3).map((feature, fIdx) => (
                            <span key={fIdx} className="px-2.5 py-1 rounded-full bg-cream-100 text-cream-600 text-[11px] font-medium">
                              {feature}
                            </span>
                          ))}
                          {prop.features.length > 3 && (
                            <span className="px-2.5 py-1 rounded-full bg-olive-50 text-olive-600 text-[11px] font-bold">
                              +{prop.features.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-auto">
                          <Button 
                            variant="dark" 
                            className="flex-1 gap-2 h-11 text-sm"
                            onClick={() => setSelectedProperty(prop)}
                          >
                            View Details
                            <ArrowRight size={14} />
                          </Button>
                          <button 
                            onClick={() => setSelectedProperty(prop)}
                            className="w-11 h-11 rounded-full border border-cream-200 flex items-center justify-center text-olive-500 hover:bg-olive-50 hover:border-olive-200 transition-all cursor-pointer shrink-0"
                          >
                            <PhoneCall size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ── List Card ── */
                    <div className="olive-card !p-0 flex flex-col md:flex-row group overflow-hidden">
                      {/* Image */}
                      <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
                        <Image 
                          src={prop.image} 
                          alt={prop.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-white/95 text-cream-900 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full backdrop-blur-md uppercase">
                            {prop.type}
                          </span>
                          {prop.featured && (
                            <span className="bg-amber-400/90 text-amber-900 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                              <Star size={10} fill="currentColor" /> Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-cream-900 tracking-tight">{prop.title}</h3>
                            <span className="text-xl font-bold text-olive-600 shrink-0 ml-4">{prop.priceLabel}</span>
                          </div>
                          <div className="flex items-center text-cream-600 mb-3">
                            <MapPin size={14} className="mr-2 text-olive-500" strokeWidth={1.5} />
                            <span className="text-sm">{prop.location}</span>
                          </div>
                          <p className="text-sm text-cream-600 leading-relaxed mb-4 line-clamp-2">{prop.description}</p>
                          
                          <div className="flex items-center gap-4 text-cream-500 text-xs font-medium mb-4">
                            <span className="flex items-center gap-1"><Ruler size={12} /> {prop.area}</span>
                            {prop.beds > 0 && <><span className="w-px h-3 bg-cream-300" /><span className="flex items-center gap-1"><BedDouble size={12} /> {prop.beds} Bed</span></>}
                            {prop.baths > 0 && <><span className="w-px h-3 bg-cream-300" /><span className="flex items-center gap-1"><Bath size={12} /> {prop.baths} Bath</span></>}
                            <span className="w-px h-3 bg-cream-300" />
                            <span className="flex items-center gap-1"><Car size={12} /> {prop.parking} Parking</span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {prop.features.slice(0, 4).map((feature, fIdx) => (
                              <span key={fIdx} className="px-2.5 py-1 rounded-full bg-cream-100 text-cream-600 text-[11px] font-medium">
                                {feature}
                              </span>
                            ))}
                            {prop.features.length > 4 && (
                              <span className="px-2.5 py-1 rounded-full bg-olive-50 text-olive-600 text-[11px] font-bold">
                                +{prop.features.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button 
                            variant="primary" 
                            className="gap-2 h-11 text-sm"
                            onClick={() => setSelectedProperty(prop)}
                          >
                            View Details
                            <ArrowRight size={14} />
                          </Button>
                          <Button 
                            variant="outline" 
                            className="gap-2 h-11 text-sm"
                            onClick={() => setSelectedProperty(prop)}
                          >
                            <PhoneCall size={14} />
                            Enquire
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-cream-100 flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-cream-400" />
              </div>
              <h3 className="text-2xl font-bold text-cream-900 mb-3">No properties found</h3>
              <p className="text-cream-600 mb-6 max-w-md mx-auto">
                We couldn&apos;t find any properties matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button variant="primary" onClick={clearFilters} className="gap-2">
                <X size={16} />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* ──────── MAIN PROPERTIES PAGE ─────────────── */
/* ═══════════════════════════════════════════════ */
export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-olive-200 border-t-olive-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cream-600 font-medium">Loading properties...</p>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
