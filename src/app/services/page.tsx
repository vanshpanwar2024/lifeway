import { MapPin, Building2, TrendingUp, Handshake } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "Services | Lifeway Group Real Estate",
  description: "Comprehensive real estate services including Advisory, Acquisition, Property Management, and Investment.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Real Estate Advisory",
      desc: "Our real estate advisory services are designed to help you make market-driven investment decisions. We provide expert insights into emerging trends to ensure your capital is deployed effectively.",
      icon: TrendingUp,
    },
    {
      title: "Acquisition & Disposal",
      desc: "We offer local, regional, and nationwide coverage for the seamless acquisition and disposal of premium real estate assets. Our network ensures quick transactions and optimal valuations.",
      icon: Handshake,
    },
    {
      title: "Property Management",
      desc: "From diligent tenant management to thorough property maintenance, our management solutions safeguard your asset's value while providing peace of mind.",
      icon: Building2,
    },
    {
      title: "Investment Advisory",
      desc: "Leveraging in-depth data analysis and customized reports, our investment advisory team crafts strategies that maximize your long-term returns in the dynamic property market.",
      icon: MapPin,
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-olive-gradient text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="section-heading mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-cream-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Comprehensive real estate solutions backed by market intelligence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((svc, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} direction="up">
                <div className="olive-card group text-left p-8 md:p-10 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-600 mb-8 transition-transform duration-300 group-hover:scale-110">
                    <svc.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-[28px] font-bold mb-5 tracking-tight text-cream-900">{svc.title}</h3>
                  <p className="text-cream-600 text-lg leading-relaxed font-normal">
                    {svc.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
