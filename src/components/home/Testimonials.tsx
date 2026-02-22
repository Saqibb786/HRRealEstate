import React from "react";
import { Card } from "../ui/Card";
import { prisma } from "@/lib/prisma";

export const Testimonials = async () => {
  let testimonials: any[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch (err) {
    console.error("Failed to load testimonials:", err);
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">
            Client <span className="text-accent">Testimonials</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            What our valued clients say about their experience with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any) => (
            <Card
              key={testimonial.id}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 transition-colors group"
            >
              <div className="text-5xl text-accent/50 mb-4 font-serif leading-none opacity-50 group-hover:opacity-100 transition-opacity">
                &quot;
              </div>
              <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed min-h-[5rem]">
                &quot;{testimonial.message}&quot;
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xl shadow-inner">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">
                    {testimonial.name}
                  </h4>
                  <span className="text-sm text-accent">Valued Client</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
