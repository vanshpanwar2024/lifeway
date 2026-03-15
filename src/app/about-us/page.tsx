import { CheckCircle2, Target, Lightbulb } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "About Us | Lifeway Group Real Estate",
  description: "Learn about Lifeway Group, our founder Mr. Vivek Panwar, and our vision for the real estate market.",
};

export default function AboutUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-olive-gradient text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="section-heading mb-6">About Lifeway Group</h1>
          <p className="text-xl md:text-2xl text-cream-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Rooted in Gurugram and Noida, building legacy and serving clients across India since 2012.
          </p>
        </div>
      </section>

      {/* Story & Founder */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <AnimatedSection className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="section-heading mb-8">Our Story & Founder</h2>
            <p className="text-lg md:text-xl text-cream-600 leading-relaxed font-normal">
              Established in 2012 by <strong className="text-olive-700">Mr. Vivek Panwar</strong>, Lifeway Group has grown from its strong roots in Gurugram and Noida to become a premier real estate consultancy serving clients nationwide. We believe in transparency, ethical practices, and delivering high-value properties to our clients.
            </p>
          </AnimatedSection>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <AnimatedSection delay={0.1} direction="left">
              <div className="olive-card text-left h-full p-8 md:p-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-600">
                    <Target size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-cream-900 tracking-tight">Our Vision</h3>
                </div>
                <p className="text-cream-600 text-lg leading-relaxed font-normal">
                  To be the leading regional real estate service provider and the preferred workplace for professionals in our industry. We strive for excellence at every touchpoint.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} direction="right">
              <div className="olive-card text-left h-full p-8 md:p-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-600">
                    <Lightbulb size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-cream-900 tracking-tight">Our Mission</h3>
                </div>
                <p className="text-cream-600 text-lg leading-relaxed font-normal">
                  To foster a results-driven environment focused on building and maintaining long-term relationships with clients, developers, and reliable partners.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Core Values */}
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-heading mb-4">Our Core Values</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Communication", desc: "Transparent and honest dialogue at every step." },
              { title: "Commitment", desc: "Dedication to delivering the best results for you." },
              { title: "Client Care", desc: "Going above and beyond to ensure your satisfaction." }
            ].map((val, i) => (
              <AnimatedSection key={i} delay={i * 0.12} direction="up">
                <div className="olive-card text-center h-full p-8">
                  <div className="w-16 h-16 rounded-2xl bg-olive-50 flex items-center justify-center mx-auto mb-6 text-olive-600">
                    <CheckCircle2 size={30} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-cream-900">{val.title}</h4>
                  <p className="text-cream-600 leading-relaxed font-normal">{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
