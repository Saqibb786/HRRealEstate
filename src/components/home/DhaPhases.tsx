import React from "react";
import Link from "next/link";

const phases = [
  {
    name: "DHA Phase 1",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "DHA Phase 2",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "DHA Phase 3",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "DHA Phase 4",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "DHA Phase 5",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "DHA Phase 6",
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export const DhaPhases = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Locations
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-3 tracking-tight">
            Explore <span className="text-accent">DHA Phases</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Find your perfect property in the most prestigious locations of DHA
            Lahore.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-5">
          {phases.map((phase) => (
            <Link
              key={phase.name}
              href={`/properties?phase=${encodeURIComponent(phase.name)}`}
              className="group block h-48 md:h-72 rounded-2xl overflow-hidden relative shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${phase.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-end justify-center pb-6 md:pb-8 px-2">
                <h3 className="text-white font-bold text-base md:text-xl drop-shadow-md text-center">
                  {phase.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
