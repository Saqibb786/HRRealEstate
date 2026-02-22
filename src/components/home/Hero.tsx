import React from "react";
import { Button } from "../ui/Button";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/90"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center max-w-5xl">
        <div>
          <p className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-5 drop-shadow-md">
            Trusted Since 2004
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight drop-shadow-lg leading-tight">
            20 Years of Excellence in <br className="hidden md:block" />
            <span className="text-accent">DHA Real Estate</span>
          </h1>
        </div>
        <p className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl font-medium drop-shadow-md leading-relaxed">
          Buy, sell, and rent premium properties across all phases of DHA with
          complete confidence and transparency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="text-lg shadow-glow hover:shadow-accent/40"
          >
            <a
              href="tel:03004237276"
              className="w-full h-full flex items-center justify-center"
            >
              Call Now
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg border-white text-white hover:bg-white hover:text-primary"
          >
            <a
              href="https://wa.me/923004237276"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center justify-center"
            >
              WhatsApp Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
