"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, Home, Building2, MapPin, HandCoins, ShieldCheck, Key, ChevronLeft, ChevronRight, Quote, TrendingUp, Users, Award, Clock, Ruler, BedDouble } from "lucide-react";
import { useRef, useState, useEffect } from "react";

/* ───────── Animated Counter Component ───────── */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

/* ───────── Testimonial Data ───────── */
const testimonials = [
  {
    quote: "The team at Lifeway Group made our first home purchase incredibly seamless. Their expert guidance, transparency, and genuine care helped us find the perfect property within our budget. Truly a world-class experience!",
    name: "Rajesh & Priya Sharma",
    role: "First-time Home Buyers",
    image: "/images/apartment.png",
  },
  {
    quote: "As an investor, I value data-driven advice, and Lifeway delivered exactly that. Their deep market knowledge of the Delhi NCR region helped me identify high-growth areas that have already shown incredible appreciation.",
    name: "Amit Verma",
    role: "Property Investor",
    image: "/images/farmhouse.png",
  },
  {
    quote: "We were looking for the perfect farmhouse retreat and Lifeway exceeded our expectations. From site visits to paperwork, they handled everything professionally. We couldn't be happier with our new Morni Hills property!",
    name: "Dr. Neha Gupta",
    role: "Farmhouse Owner",
    image: "/images/lifestyle.png",
  },
];

/* ───────── Process Steps ───────── */
const steps = [
  {
    num: "1",
    title: "Discover Properties",
    desc: "Browse a wide range of carefully curated real estate opportunities tailored to your investment goals.",
    icon: MapPin,
  },
  {
    num: "2",
    title: "Invest with Confidence",
    desc: "Review in-depth property insights, assess potential returns, and make secure investments with ease.",
    icon: TrendingUp,
  },
  {
    num: "3",
    title: "Earn & Track",
    desc: "Start generating returns with complete transparency and real-time tracking of your investments.",
    icon: Award,
  },
];

/* ───────── Services Data ───────── */
const services = [
  { title: "Buying", desc: "Find your dream home with our curated list of affordable and luxury properties.", icon: Home },
  { title: "Selling", desc: "Get the best market value for your property quickly, safely, and transparently.", icon: HandCoins },
  { title: "Leasing", desc: "Hassle-free residential and commercial leasing solutions for landlords and tenants.", icon: Key },
  { title: "Management", desc: "Comprehensive tenant screening, property maintenance, and management services.", icon: Building2 },
  { title: "Advisory", desc: "Data-driven, personalized investment strategies tailored to maximize your returns.", icon: MapPin },
  { title: "Bank Loans", desc: "Seamless assistance with financing through our extensive network of partner banks.", icon: ShieldCheck },
];

// Properties will be fetched from API
interface PropertyType {
  id: string | number;
  title: string;
  image: string;
  location: string;
  area: string;
  beds: number | string;
  price: number;
  priceLabel: string;
  category: string;
}

/* ═══════════════════════════════════════════════ */
/* ──────────────── HOME PAGE ────────────────── */
/* ═══════════════════════════════════════════════ */
export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          // Take top 4 featured or just latest 4
          const featured = data.filter((p: { featured: boolean }) => p.featured).slice(0, 4);
          if (featured.length > 0) {
            setProperties(featured);
          } else {
            setProperties(data.slice(0, 4));
          }
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/Hero_vid_1.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />
        
        {/* Floating ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-olive-500/8 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-olive-400/8 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center max-w-5xl pt-20">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-olive-400 animate-pulse" />
            <span className="text-white/90 text-sm font-semibold tracking-widest uppercase">Premium Real Estate Consultancy</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-white mb-8 leading-[1.05]">
            Welcome to<br />
            <span className="text-olive-400">Lifeway Group</span>.
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-12 leading-relaxed">
            A trusted leader in the sale and leasing of exceptional residential properties across Noida, Ghaziabad, Morni Hills, and Rajasthan.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/properties">
              <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold px-9 shadow-[0_8px_30px_rgba(107,142,35,0.3)] group">
                Explore Properties
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto font-bold px-9 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] group">
                Get Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFCF9] to-transparent z-10" />
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="relative z-20 -mt-1 bg-[#FDFCF9]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 py-16 md:py-20">
              {[
                { value: 12, suffix: "+", label: "Years of Trust", icon: Clock },
                { value: 500, suffix: "+", label: "Properties Managed", icon: Building2 },
                { value: 1200, suffix: "+", label: "Happy Clients", icon: Users },
                { value: 10, suffix: "%", prefix: "8-", label: "Average ROI", icon: TrendingUp },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-500 mx-auto mb-4 group-hover:bg-olive-100 group-hover:scale-110 transition-all duration-300">
                    <stat.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-[52px] font-bold text-cream-900 tracking-tight leading-none mb-3">
                    <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <p className="text-cream-500 text-sm font-semibold tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ COMPANY INTRO ═══════════ */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <AnimatedSection className="text-center">
            <div className="inline-flex items-center justify-center px-5 py-2 mb-8 rounded-full bg-olive-50 text-olive-700 text-sm font-bold tracking-widest uppercase border border-olive-200">
              Authorized Partner
            </div>
            <h2 className="section-heading mb-8">Your Trusted Channel Partner</h2>
            <p className="section-subheading font-normal">
              With years of experience in the Delhi NCR real estate market, we pride ourselves on being an authorized channel partner for some of the most reputed developers. We offer verified, high-value, and affordable residential options with complete transparency and trust.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ SERVICES / ADVANTAGE ═══════════ */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <AnimatedSection>
                <h2 className="section-heading mb-6">Your real estate<br />investment advantage</h2>
              </AnimatedSection>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-12">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.08} direction="up">
                  <div className="olive-card text-left h-full group">
                    <div className="w-14 h-14 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-600 mb-5 group-hover:bg-olive-100 group-hover:scale-110 transition-all duration-300">
                      <service.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight text-cream-900">{service.title}</h3>
                    <p className="text-cream-600 leading-relaxed text-[15px]">{service.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            <div className="lg:col-span-1 flex flex-col justify-between">
              <AnimatedSection delay={0.3} direction="right">
                <p className="text-cream-600 text-lg leading-relaxed mb-8">
                  From curated properties to end-to-end management, we simplify investing so you can focus on growing your wealth.
                </p>
                <Link href="/services">
                  <Button variant="dark" className="w-full sm:w-auto group">
                    Find the best for you
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PROPERTY TYPES ═══════════ */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-heading mb-5">Discover our top<br/>investment properties</h2>
            <p className="section-subheading font-normal">
              Explore handpicked real estate opportunities with high growth potential and strong returns.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Skeleton loaders
              [...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-cream-100 animate-pulse rounded-2xl" />
              ))
            ) : properties.length > 0 ? (
              properties.map((prop, idx) => (
                <AnimatedSection key={prop.id} delay={idx * 0.1} direction="up">
                  <Link href={`/properties`} className="block group">
                    <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white transition-all duration-400 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image 
                          src={prop.image || "/images/plot.png"} 
                          alt={prop.title} 
                          fill 
                          className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4 bg-olive-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          {prop.priceLabel}
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-cream-900 mb-2 tracking-tight truncate">{prop.title}</h3>
                        <div className="flex items-center text-cream-500 text-sm mb-3">
                          <MapPin size={14} className="mr-1.5 text-olive-500" />
                          {prop.location}
                        </div>
                        <div className="flex items-center gap-3 text-cream-500 text-xs font-medium mb-4">
                          <span className="flex items-center gap-1"><Ruler size={12} /> {prop.area}</span>
                          <span className="w-px h-3 bg-cream-300" />
                          <span className="flex items-center gap-1"><BedDouble size={12} /> {prop.beds} Bed</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-olive-600 font-bold text-sm group-hover:text-olive-700 transition-colors">View Details</span>
                          <div className="w-8 h-8 rounded-full border border-cream-200 flex items-center justify-center text-olive-500 group-hover:bg-olive-500 group-hover:text-white group-hover:border-olive-500 transition-all duration-300">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-cream-500 font-medium">
                No properties available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS STEPS ═══════════ */}
      <section className="section-padding bg-olive-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <AnimatedSection direction="left">
              <h2 className="section-heading">Invest with confidence in just a few steps</h2>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <p className="text-cream-700 text-lg leading-relaxed lg:pt-4">
                Follow our transparent, data-driven process and start building wealth through real estate today.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {steps.map((step, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.15} direction="up">
                <div className="relative bg-white rounded-2xl p-8 md:p-10 h-full border border-cream-200 shadow-(--shadow-soft) overflow-hidden group hover:shadow-(--shadow-card) transition-all duration-300 hover:-translate-y-2">
                  <span className="absolute top-4 left-6 text-[80px] font-bold text-olive-100 leading-none select-none pointer-events-none" style={{ fontFamily: 'var(--font-dm-serif)' }}>
                    {step.num}
                  </span>
                  
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-500 mb-6 group-hover:bg-olive-100 group-hover:scale-110 transition-all duration-300">
                    <step.icon size={22} strokeWidth={1.5} />
                  </div>
                  
                  <div className="relative z-10 pt-8">
                    <h3 className="text-2xl font-bold text-cream-900 mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-cream-600 leading-relaxed text-[15px]">{step.desc}</p>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 text-olive-400">
                    <ArrowRight size={24} />
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-heading mb-4">Trusted by investors,<br/>proven by results</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[480px]">
              {testimonials.map((t, idx) => (
                <Image
                  key={idx}
                  src={t.image}
                  alt="Testimonial"
                  fill
                  className={`object-cover transition-all duration-1000 ${
                    idx === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />

              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
                <div className="glass-card bg-white/10 border-white/15 backdrop-blur-xl max-w-3xl w-full p-8 md:p-12 text-center rounded-2xl">
                  <Quote className="mx-auto mb-6 text-olive-400" size={32} />
                  <p className="text-white text-lg md:text-xl leading-relaxed mb-8 font-normal" key={currentTestimonial}>
                    {testimonials[currentTestimonial].quote}
                  </p>
                  <div>
                    <p className="text-white font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-white/60 text-sm">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={prevTestimonial}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/25 transition-all cursor-pointer z-20 hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-olive-500 flex items-center justify-center text-white hover:bg-olive-600 transition-all cursor-pointer z-20 hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      idx === currentTestimonial ? "bg-olive-400 w-8" : "bg-white/40 w-2 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ FAQ SECTION ═══════════ */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <FaqAccordion />
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="bg-olive-gradient py-20 md:py-28 text-center relative">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-10 left-10 w-32 h-32 bg-olive-300/20 rounded-full blur-[60px] animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-olive-400/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-cream-900 mb-8 tracking-tight leading-[1.1]">
                Invest in real estate<br/>with confidence
              </h2>
              <Link href="/contact">
                <Button variant="primary" size="lg" className="font-bold px-10 shadow-[0_8px_30px_rgba(107,142,35,0.3)] group">
                  Invest Now
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ GOOGLE MAP ═══════════ */}
      <section className="h-[400px] w-full relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2049157460983!2d77.36404817615063!3d28.6236199844841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce544da5a9ebf%3A0x4024cbbabd66b412!2sKLJ%20Noida%20One!5e0!3m2!1sen!2sin!4v1773526528552!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%)" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5"></div>
      </section>
    </>
  );
}
