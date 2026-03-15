import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "Contact Us | Lifeway Group Real Estate",
  description: "Get in touch with Lifeway Group for real estate advisory, properties, and queries.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-olive-gradient text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1A1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="section-heading mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl text-cream-600 max-w-3xl mx-auto font-normal leading-relaxed">
            We are here to help you find your dream property and answer any questions.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Information */}
            <AnimatedSection direction="left">
              <div className="space-y-10">
                <div>
                  <h2 className="section-heading text-3xl md:text-4xl mb-6">Contact Information</h2>
                  <p className="text-cream-600 text-lg leading-relaxed font-normal">
                    Whether you&apos;re looking to buy, sell, or invest, our experts are just a message or call away.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      title: "Office Address",
                      content: "Lifeway Group, 613A, 6th Floor, Block-C, KLJ Noida One, Sector-62, Noida, UP - 201309",
                      isLink: false,
                    },
                    {
                      icon: Phone,
                      title: "Phone",
                      content: "+91 98765 43210",
                      isLink: false,
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      content: "info@lifewayinfra.in",
                      isLink: true,
                      href: "mailto:info@lifewayinfra.in",
                    },
                    {
                      icon: Clock,
                      title: "Office Hours",
                      content: "Monday - Saturday: 10:00 AM - 6:30 PM",
                      isLink: false,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-5 items-start group">
                      <div className="w-12 h-12 rounded-xl bg-olive-50 flex items-center justify-center text-olive-600 shrink-0 transition-transform duration-500 group-hover:-translate-y-1">
                        <item.icon size={22} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1 tracking-tight text-cream-900">{item.title}</h4>
                        {item.isLink ? (
                          <a href={item.href} className="text-olive-600 hover:text-olive-700 transition-colors text-[15px]">{item.content}</a>
                        ) : (
                          <p className="text-cream-600 leading-relaxed font-normal text-[15px]">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="olive-card p-8 md:p-10">
                <h3 className="text-2xl md:text-[28px] font-bold mb-8 text-cream-900 tracking-tight">Send us a Message</h3>
                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-cream-700">Full Name</label>
                      <input id="name" type="text" className="w-full h-12 px-4 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-400 transition-all text-cream-900 shadow-sm placeholder:text-cream-400" placeholder="Jane Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-cream-700">Phone Number</label>
                      <input id="phone" type="tel" className="w-full h-12 px-4 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-400 transition-all text-cream-900 shadow-sm placeholder:text-cream-400" placeholder="+91 xxxxx xxxxx" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-cream-700">Email Address</label>
                    <input id="email" type="email" className="w-full h-12 px-4 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-400 transition-all text-cream-900 shadow-sm placeholder:text-cream-400" placeholder="jane@example.com" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="property" className="text-sm font-semibold text-cream-700">Property Type</label>
                    <select id="property" className="w-full h-12 px-4 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-400 transition-all text-cream-900 shadow-sm appearance-none">
                      <option value="">Select an option</option>
                      <option value="buy_plot">Buying a Plot</option>
                      <option value="buy_apartment">Buying an Apartment</option>
                      <option value="buy_house">Buying a House/Villa</option>
                      <option value="sell">Selling Property</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-cream-700">Your Message</label>
                    <textarea id="message" rows={4} className="w-full p-4 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-olive-500/30 focus:border-olive-400 transition-all text-cream-900 resize-none shadow-sm placeholder:text-cream-400" placeholder="How can we help you?" required></textarea>
                  </div>

                  <Button type="submit" variant="dark" size="lg" className="w-full font-bold h-12 text-[15px] mt-2">
                    Submit Enquiry
                  </Button>
                </form>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </>
  );
}
