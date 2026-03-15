import { Briefcase, Lightbulb, Users, TrendingUp, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "Careers | Lifeway Group Real Estate",
  description: "Join Lifeway Group. We offer a culture of growth, knowledge, innovation, and teamwork in the real estate sector.",
};

export default function CareersPage() {
  const values = [
    { title: "Growth", desc: "Mentoring and performance-based career progression.", icon: TrendingUp },
    { title: "Knowledge", desc: "Continuous learning and market intelligence training.", icon: Briefcase },
    { title: "Innovation", desc: "Adopting new technologies and creative solutions.", icon: Lightbulb },
    { title: "Teamwork", desc: "Collaborative environment fostering mutual success.", icon: Users },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-olive-gradient text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="section-heading mb-6">Careers at Lifeway</h1>
          <p className="text-xl md:text-2xl text-cream-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Build a rewarding career in real estate with a trusted market leader.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <AnimatedSection className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="section-heading mb-6">Why Work With Us?</h2>
            <p className="text-lg md:text-xl text-cream-600 leading-relaxed font-normal">
              We are a team of passionate professionals dedicated to excellence. At Lifeway Group, your career grows as our business grows. We provide continuous mentorship and dynamic opportunities for performance-based growth.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {values.map((val, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} direction="up">
                <div className="olive-card p-8 text-center group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-olive-50 flex items-center justify-center text-olive-600 mx-auto mb-6 transition-transform duration-500 group-hover:scale-110">
                    <val.icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-cream-900">{val.title}</h3>
                  <p className="text-cream-600 leading-relaxed font-normal text-[15px]">{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto olive-card p-12 md:p-16 text-center bg-olive-gradient border-olive-200 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <h2 className="section-heading mb-6 relative z-10">Join Our Team</h2>
              <p className="text-lg md:text-xl text-cream-600 mb-10 max-w-2xl mx-auto relative z-10 font-normal">
                Ready to take the next step in your career? Send us your updated CV, and our HR team will get in touch with you.
              </p>
              <a href="mailto:info@lifewayinfra.in" className="relative z-10 inline-block">
                <Button variant="dark" size="lg" className="font-bold px-10">
                  <Send size={18} />
                  Email CV to info@lifewayinfra.in
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
