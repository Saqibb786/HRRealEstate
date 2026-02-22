import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with HR Real Estate. Call 0300-4237276 for expert DHA property guidance. Visit us at DHA Phase 1, Lahore.",
  openGraph: {
    title: "Contact HR Real Estate",
    description:
      "Call 0300-4237276 for expert DHA property guidance. Visit us at DHA Phase 1, Lahore.",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Get In Touch
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
              Let&apos;s Find Your <br className="hidden sm:block" />
              <span className="text-accent">Dream Property</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              With 20+ years of expertise in DHA Lahore, our team is ready to
              help you buy, sell, or invest with confidence.
            </p>

            {/* Primary CTA — Phone Number */}
            <div className="inline-flex flex-col items-center">
              <a
                href="tel:03004237276"
                className="text-3xl md:text-5xl font-extrabold text-white hover:text-accent transition-colors tracking-wide"
              >
                0300-4237276
              </a>
              <span className="text-gray-400 text-sm mt-2 font-medium">
                Call us anytime during business hours
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10 max-w-sm mx-auto sm:max-w-none">
              <a
                href="/properties"
                className="flex items-center justify-center gap-2.5 bg-accent text-primary px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Browse Properties
              </a>
              <a
                href="/about"
                className="flex items-center justify-center gap-2.5 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-all duration-200"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 -mt-8 relative z-20 pb-16 md:pb-20">
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {/* Office Address */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="font-bold text-primary text-base mb-2">
              Visit Our Office
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              HR Real Estate
              <br />
              Rafi Group Plaza, DHA Phase 1<br />
              Lahore, Pakistan
            </p>
          </div>

          {/* Phone & WhatsApp */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="font-bold text-primary text-base mb-2">
              Call or WhatsApp
            </h3>
            <a
              href="tel:03004237276"
              className="text-gray-500 text-sm hover:text-accent transition-colors font-semibold block mb-1"
            >
              0300-4237276
            </a>
            <p className="text-gray-400 text-xs">
              Available on call &amp; WhatsApp
            </p>
          </div>

          {/* Office Hours */}
          <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="font-bold text-primary text-base mb-3">
              Office Hours
            </h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Mon – Fri</span>
                <span className="text-gray-700 font-medium">
                  10:00 AM – 7:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-gray-700 font-medium">
                  10:00 AM – 5:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-gray-400 font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="max-w-5xl mx-auto mt-10">
          <div className="bg-primary rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

            <div className="text-center md:text-left relative z-10">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1.5">
                Ready to discuss your property needs?
              </h2>
              <p className="text-gray-300 text-sm">
                Our experts will guide you through every step — call us today.
              </p>
            </div>

            <div className="flex gap-3 relative z-10 flex-shrink-0">
              <a
                href="tel:03004237276"
                className="flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Now
              </a>
              <a
                href="https://wa.me/923004237276"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#1da851] shadow-lg shadow-[#25D366]/20 transition-all duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
