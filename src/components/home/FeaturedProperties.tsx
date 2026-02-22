import React from "react";
import { Card } from "../ui/Card";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const FeaturedProperties = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let properties: any[] = [];
  try {
    properties = await prisma.property.findMany({
      where: { featured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch featured properties:", error);
  }

  if (properties.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
          <div className="max-w-2xl">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Our Listings
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-3 tracking-tight">
              Featured <span className="text-accent">Properties</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              Explore our handpicked selection of premium DHA properties.
            </p>
          </div>
          <Link
            href="/properties"
            className="hidden md:inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg border-2 border-primary text-primary hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            View All Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {properties.map((property: any) => {
            let imgSrc = "/images/property-placeholder.svg";
            let imageCount = 0;
            if (property.images) {
              try {
                const arr = JSON.parse(property.images);
                if (Array.isArray(arr) && arr.length > 0) {
                  imgSrc = arr[0];
                  imageCount = arr.length;
                }
              } catch {
                // Ignore parse errors safely
              }
            }

            return (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="block group"
              >
                <Card
                  className="flex flex-col h-full overflow-hidden border-transparent hover:border-accent/30 transition-all duration-300"
                  hoverable
                >
                  <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgSrc}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                      <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-bold rounded-md shadow uppercase tracking-wide">
                        {property.phase}
                      </span>
                      <span className="bg-accent text-white px-2.5 py-1 text-[11px] font-bold rounded-md shadow flex items-center gap-1">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>{" "}
                        Featured
                      </span>
                    </div>
                    <span
                      className={`absolute top-3 right-3 z-20 backdrop-blur-sm px-3 py-1 text-[11px] font-bold rounded-md shadow uppercase tracking-wide ${
                        property.listingType === "Sell"
                          ? "bg-green-500/90 text-white"
                          : property.listingType === "Rent"
                            ? "bg-blue-500/90 text-white"
                            : "bg-accent/90 text-white"
                      }`}
                    >
                      For {property.listingType}
                    </span>
                    {imageCount > 1 && (
                      <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        {imageCount}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors leading-snug">
                      {property.title}
                    </h3>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[13px] text-gray-500 mb-4">
                      <span>{property.size}</span>
                      <span className="text-gray-300">•</span>
                      <span>{property.propertyType}</span>
                      {property.bedrooms != null && property.bedrooms > 0 && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span>{property.bedrooms} Bed</span>
                        </>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-primary font-extrabold text-xl">
                        {property.showPricePublicly ? (
                          <span>
                            PKR {(property.price / 10000000).toFixed(2)}{" "}
                            <span className="text-xs font-semibold text-gray-400">
                              Crore
                            </span>
                          </span>
                        ) : (
                          <span className="text-accent text-lg">
                            Call for Price
                          </span>
                        )}
                      </div>
                      <span className="text-primary">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 md:hidden text-center">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold rounded-lg border-2 border-primary text-primary hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};
