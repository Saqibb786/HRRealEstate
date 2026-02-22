import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const listingType = searchParams.listingType || "";
  const propertyType = searchParams.propertyType || "";
  const phase = searchParams.phase || "";

  const where: any = {};
  if (listingType) where.listingType = { equals: listingType };
  if (propertyType) where.propertyType = { equals: propertyType };
  if (phase) where.phase = { equals: phase };

  let properties: any[] = [];
  try {
    properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to fetch properties:", err);
  }

  return (
    <div className="bg-background-light min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Browse Listings
          </p>
          <h1 className="text-2xl md:text-4xl text-primary font-extrabold mb-3 tracking-tight">
            Explore <span className="text-accent">Properties</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg">
            Find your dream home or next investment opportunity in DHA.
          </p>
        </div>

        <form
          method="GET"
          action="/properties"
          className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="w-full md:w-1/4">
            <Select
              label="Looking to"
              name="listingType"
              defaultValue={listingType}
              options={[
                { label: "Any", value: "" },
                { label: "Buy", value: "Buy" },
                { label: "Sell", value: "Sell" },
                { label: "Rent", value: "Rent" },
              ]}
              fullWidth
            />
          </div>
          <div className="w-full md:w-1/4">
            <Select
              label="Property Type"
              name="propertyType"
              defaultValue={propertyType}
              options={[
                { label: "Any", value: "" },
                { label: "House", value: "House" },
                { label: "Plot", value: "Plot" },
                { label: "Commercial", value: "Commercial" },
              ]}
              fullWidth
            />
          </div>
          <div className="w-full md:w-1/4">
            <Select
              label="DHA Phase"
              name="phase"
              defaultValue={phase}
              options={[
                { label: "Any Phase", value: "" },
                { label: "DHA Phase 1", value: "DHA Phase 1" },
                { label: "DHA Phase 2", value: "DHA Phase 2" },
                { label: "DHA Phase 3", value: "DHA Phase 3" },
                { label: "DHA Phase 4", value: "DHA Phase 4" },
                { label: "DHA Phase 5", value: "DHA Phase 5" },
                { label: "DHA Phase 6", value: "DHA Phase 6" },
                { label: "DHA Phase 7", value: "DHA Phase 7" },
                { label: "DHA Phase 8", value: "DHA Phase 8" },
                { label: "DHA Phase 9 (Prism)", value: "DHA Phase 9 (Prism)" },
                { label: "DHA Phase 10", value: "DHA Phase 10" },
                {
                  label: "DHA Phase 11 (Rahbar)",
                  value: "DHA Phase 11 (Rahbar)",
                },
                { label: "DHA Phase 12 (EME)", value: "DHA Phase 12 (EME)" },
                { label: "DHA Phase 13", value: "DHA Phase 13" },
              ]}
              fullWidth
            />
          </div>
          <div className="w-full md:w-1/4 flex items-end pb-[2px]">
            <Button type="submit" variant="primary" fullWidth size="lg">
              Search Properties
            </Button>
          </div>
        </form>

        {properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl text-primary font-bold mb-2">
              No Properties Found
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any properties matching your current filters. Try
              adjusting your search criteria.
            </p>
            <Button variant="outline" className="mt-8">
              <Link href="/properties">Clear All Filters</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
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
                } catch (e) {}
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
                    {/* Image Section */}
                    <div className="relative h-48 md:h-52 w-full overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                        <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-bold rounded-md shadow uppercase tracking-wide">
                          {property.phase}
                        </span>
                        {property.featured && (
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
                        )}
                      </div>
                      <div className="absolute top-3 right-3 z-20">
                        <span
                          className={`backdrop-blur-sm px-3 py-1 text-[11px] font-bold rounded-md shadow uppercase tracking-wide ${
                            property.listingType === "Sell"
                              ? "bg-green-500/90 text-white"
                              : property.listingType === "Rent"
                                ? "bg-blue-500/90 text-white"
                                : "bg-accent/90 text-white"
                          }`}
                        >
                          For {property.listingType}
                        </span>
                      </div>
                      {/* Image Count */}
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
                      {/* Status badge */}
                      {property.status !== "Available" && (
                        <div className="absolute bottom-3 left-3 z-20">
                          <span
                            className={`px-2.5 py-1 text-[11px] font-bold rounded-md shadow ${
                              property.status === "Sold"
                                ? "bg-red-500 text-white"
                                : "bg-yellow-500 text-white"
                            }`}
                          >
                            {property.status}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {property.title}
                      </h3>

                      {/* Property meta */}
                      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[13px] text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            />
                          </svg>
                          {property.size}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>{property.propertyType}</span>
                        {property.bedrooms != null && property.bedrooms > 0 && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span>{property.bedrooms} Bed</span>
                          </>
                        )}
                        {property.bathrooms != null &&
                          property.bathrooms > 0 && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span>{property.bathrooms} Bath</span>
                            </>
                          )}
                      </div>

                      {/* Price section */}
                      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                        {property.showPricePublicly ? (
                          <span className="text-lg font-extrabold text-primary">
                            PKR {(property.price / 10000000).toFixed(2)}{" "}
                            <span className="text-[11px] text-gray-400 font-semibold">
                              Crore
                            </span>
                          </span>
                        ) : (
                          <span className="text-base font-bold text-accent">
                            Call for Price
                          </span>
                        )}
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
        )}
      </div>
    </div>
  );
}
