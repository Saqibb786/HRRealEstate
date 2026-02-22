import React from "react";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="bg-background-light min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Who We Are
          </p>
          <h1 className="text-2xl md:text-4xl text-primary font-extrabold mb-3 tracking-tight">
            About <span className="text-accent">HR Real Estate</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium">
            20 Years of Excellence in DHA Real Estate
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="rounded-xl overflow-hidden h-[350px] md:h-[420px] relative shadow-lg group">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
            <div className="absolute inset-0 flex items-end justify-start p-8">
              <h2 className="text-2xl md:text-3xl text-white font-bold leading-tight drop-shadow-md">
                Leading the DHA Market since 2004
              </h2>
            </div>
          </div>

          <div className="lg:pl-4">
            <h2 className="text-2xl text-primary font-bold mb-6 border-b-4 border-accent inline-block pb-2">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
              <p>
                Founded by{" "}
                <strong className="text-gray-900 font-bold">
                  Ghulam Murtaza
                </strong>
                , HR Real Estate has built an unshakable reputation as the most
                trusted and authoritative real estate agency specializing
                exclusively in the Defence Housing Authority (DHA) market.
              </p>
              <p>
                Over the past two decades, we have facilitated thousands of
                successful transactions, helping families find their dream homes
                and investors secure highly profitable commercial and
                residential assets.
              </p>
              <p>
                Our deep-rooted network, comprehensive market analysis, and
                unwavering commitment to client satisfaction set us apart. When
                you work with HR Real Estate, you are partnering with a legacy
                of excellence.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary p-10 md:p-16 rounded-2xl mb-16 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-48 h-48 bg-accent/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-xs font-bold tracking-widest text-accent uppercase mb-6">
              Our Mission
            </h2>
            <blockquote className="text-xl md:text-2xl text-white font-serif italic leading-relaxed">
              &ldquo;To provide secure, transparent, and client-focused real
              estate solutions across DHA, ensuring every transaction is handled
              with the utmost integrity and professionalism.&rdquo;
            </blockquote>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 text-center max-w-4xl mx-auto">
          <Card className="p-8 border-t-4 border-t-accent transition-shadow duration-300 hover:shadow-md">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <line x1="9" y1="6" x2="15" y2="6" />
                <line x1="9" y1="10" x2="15" y2="10" />
                <line x1="9" y1="14" x2="12" y2="14" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">20+ Years</h3>
            <p className="text-gray-500 text-sm">
              Of unblemished track record in the prestigious real estate
              industry.
            </p>
          </Card>

          <Card className="p-8 border-t-4 border-t-primary transition-shadow duration-300 hover:shadow-md">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">100% Trust</h3>
            <p className="text-gray-500 text-sm">
              Built on radical transparency, ethical practices, and total client
              satisfaction.
            </p>
          </Card>

          <Card className="p-8 border-t-4 border-t-accent transition-shadow duration-300 hover:shadow-md">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              Premium Portfolio
            </h3>
            <p className="text-gray-500 text-sm">
              Exclusive priority access to the best residential and commercial
              listings.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
