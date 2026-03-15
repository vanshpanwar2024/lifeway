"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do you ensure the properties are verified?",
      answer: "We perform rigorous due diligence on every property before listing. This includes checking legal titles, developer history, RERA compliance, and physical site verification to guarantee your investment is 100% secure.",
    },
    {
      question: "What areas do you primarily serve?",
      answer: "We are headquartered in Delhi NCR, focusing on premium and affordable residential properties in Noida, Greater Noida, Ghaziabad. We also have exclusive offerings in Morni Hills and select locations in Rajasthan.",
    },
    {
      question: "Do you help with home loans and financing?",
      answer: "Yes. We have established tie-ups with all major nationalized and private banks. Our dedicated finance team will assist you from application to disbursement, ensuring a smooth and hassle-free loan process.",
    },
    {
      question: "What makes your investment advisory different?",
      answer: "Our advisory is purely data-driven. We analyze historical appreciation rates, upcoming infrastructure projects, and micro-market trends to recommend properties that align perfectly with your risk profile and return expectations.",
    },
    {
      question: "Are there any hidden charges in your consultancy?",
      answer: "Transparency is one of our core values. We do not have any hidden fees. All necessary charges, including government duties and registration fees, are communicated clearly right at the beginning of the process.",
    },
    {
      question: "What types of properties do you deal in?",
      answer: "We specialize in residential plots, premium apartments, independent villas and houses, and luxury farmhouses. Whether you're a first-time buyer or a seasoned investor, we have curated options for every need and budget.",
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
      {/* Left Side – Heading & CTA */}
      <div className="lg:col-span-2 flex flex-col justify-start">
        <AnimatedSection direction="left">
          <div className="bg-cream-100 rounded-3xl p-8 lg:p-10">
            <h3 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-cream-900 leading-tight mb-8">
              Invest smarter with the right answers
            </h3>
            <div className="mt-auto pt-8">
              <p className="text-cream-600 text-lg mb-4">Have any question in your mind?</p>
              <Link href="/contact">
                <Button variant="primary" size="md">
                  Send message
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Right Side – Accordion */}
      <div className="lg:col-span-3 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <AnimatedSection key={index} delay={index * 0.08} direction="up">
              <div 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-cream-100 border-cream-200 shadow-[0_4px_16px_rgba(0,0,0,0.04)]' 
                    : 'bg-white border-cream-200 hover:border-cream-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
                >
                  <h3 className="text-[16px] font-bold text-cream-900 pr-6">
                    <span className="text-cream-500 mr-2">{index + 1}.</span>
                    {faq.question}
                  </h3>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? 'bg-olive-500 text-white rotate-180' 
                      : 'bg-cream-100 text-cream-500'
                  }`}>
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-cream-600 leading-relaxed text-[15px] pl-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
