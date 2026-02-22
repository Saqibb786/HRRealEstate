import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-24 md:pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <h3 className="text-2xl font-bold tracking-tight">
              <span className="text-white">HR</span>{" "}
              <span className="text-accent">Real Estate</span>
            </h3>
            <p className="text-accent font-medium text-sm">
              20 Years of Excellence in DHA Real Estate
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for buying, selling, and renting premium
              properties across all phases of DHA Lahore.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="hover:text-white transition-colors duration-200"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* DHA Phases */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-6">
              DHA Phases
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  href="/properties?phase=DHA+Phase+1"
                  className="hover:text-white transition-colors duration-200"
                >
                  DHA Phase 1
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?phase=DHA+Phase+2"
                  className="hover:text-white transition-colors duration-200"
                >
                  DHA Phase 2
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?phase=DHA+Phase+3"
                  className="hover:text-white transition-colors duration-200"
                >
                  DHA Phase 3
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?phase=DHA+Phase+5"
                  className="hover:text-white transition-colors duration-200"
                >
                  DHA Phase 5
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?phase=DHA+Phase+6"
                  className="hover:text-white transition-colors duration-200"
                >
                  DHA Phase 6
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent flex-shrink-0 mt-0.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  Rafi Group Plaza,
                  <br />
                  DHA Phase 1, Lahore
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent flex-shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href="tel:03004237276"
                  className="hover:text-white transition-colors font-semibold text-base"
                >
                  0300-4237276
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} HR Real Estate. All rights
            reserved.
          </p>
          <p className="text-gray-400 text-xs flex items-center gap-1.5">
            Designed &amp; Developed by{" "}
            <a
              href="https://devpeaksolutions.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              DevPeak Solutions
            </a>
          </p>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div
        className="fixed bottom-0 left-0 w-full md:hidden flex z-50 shadow-[0_-2px_15px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <a
          href="tel:03004237276"
          className="flex-1 min-w-0 bg-primary text-white text-center py-3.5 font-bold text-xs tracking-wide active:bg-primary-hover flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Now
        </a>
        <a
          href="https://wa.me/923004237276"
          className="flex-1 min-w-0 bg-[#25D366] text-white text-center py-3.5 font-bold text-xs tracking-wide active:bg-[#128C7E] flex items-center justify-center gap-1.5 whitespace-nowrap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </footer>
  );
};
