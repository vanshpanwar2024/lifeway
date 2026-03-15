import { Search, ShieldAlert, HeartHandshake, FileText } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "Why Choose Us | Lifeway Group Real Estate",
  description: "Discover why Lifeway Group is the preferred real estate consultant in Delhi NCR. Proper research, right investments, genuine consultancy, and excellent after-sales support.",
};

export default function WhyChooseUsPage() {
  const reasons = [
    {
      title: "Proper Research",
      desc: "We analyze historical data and current market conditions before recommending any property. Our thorough research ensures you make informed, risk-mitigated decisions.",
      icon: Search,
    },
    {
      title: "Right Investments",
      desc: "Through our strong partnerships with reputed developers, we bring you properties that promise high appreciation and excellent rental yields.",
      icon: ShieldAlert,
    },
    {
      title: "Genuine Consultancy",
      desc: "We provide personalized market intelligence. Our advice is unbiased and centered strictly around your financial and lifestyle goals.",
      icon: HeartHandshake,
    },
    {
      title: "After Sales & Bank Loans",
      desc: "Our relationship doesn't end at the sale. From end-to-end documentation to seamless loan processing support, we are with you every step of the way.",
      icon: FileText,
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-olive-gradient text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="section-heading mb-6">Why Choose Us</h1>
          <p className="text-xl md:text-2xl text-cream-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Expertise, transparency, and a steadfast commitment to your success.
          </p>
        </div>
      </section>

      {/* Why Us Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <AnimatedSection className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-heading mb-8">The Lifeway Advantage</h2>
            <p className="text-lg md:text-xl text-cream-600 leading-relaxed font-normal">
              We understand that real estate is one of the most significant investments you&apos;ll make. That&apos;s why we focus on delivering an experience that is secure, profitable, and completely stress-free.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reasons.map((reason, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} direction="up">
                <div className="flex flex-col sm:flex-row gap-6 olive-card group items-start p-8 h-full">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-600 transition-transform duration-500 group-hover:-translate-y-1">
                    <reason.icon size={26} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-cream-900">{reason.title}</h3>
                    <p className="text-cream-600 leading-relaxed font-normal">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
