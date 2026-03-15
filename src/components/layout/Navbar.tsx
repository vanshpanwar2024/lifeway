"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Services", href: "/services" },
  { name: "Why Us", href: "/why-us" },
  { name: "Properties", href: "/properties" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <nav
          className={`flex items-center justify-between transition-all duration-500 rounded-full px-6 md:px-8 ${
            scrolled
              ? "py-1.5 bg-white/95 backdrop-blur-2xl border border-cream-200/60 shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
              : "py-2 bg-white/60 backdrop-blur-xl border border-white/30"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/images/Logo_with_text_transparent_bg.png"
              alt="Lifeway Group"
              width={120}
              height={30}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    isActive
                      ? "text-olive-700 bg-olive-50"
                      : "text-cream-600 hover:text-cream-900 hover:bg-cream-100/60 hover:-translate-y-[1px]"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-[3px] h-[2px] bg-olive-600 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-5 opacity-100"
                        : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden xl:block">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cream-900 text-white text-[12.5px] font-semibold transition-all duration-300 hover:bg-cream-800 hover:-translate-y-[1px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.18)]"
            >
              Get in Touch
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden p-2 rounded-full hover:bg-cream-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={20} className="text-cream-900" />
            ) : (
              <Menu size={20} className="text-cream-900" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-[520px] opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-2xl rounded-2xl border border-cream-200/60 shadow-[0_16px_48px_rgba(0,0,0,0.08)] p-4">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-olive-50 text-olive-700"
                      : "text-cream-700 hover:bg-cream-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-t border-cream-200">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cream-900 text-white text-[15px] font-semibold hover:bg-cream-800 transition-all"
              >
                Get in Touch
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}