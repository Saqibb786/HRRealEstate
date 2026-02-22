import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ImageGallery from "@/components/ui/ImageGallery";
import ShareProperty from "@/components/ui/ShareProperty";

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let property = null;

  try {
    property = await prisma.property.findUnique({
      where: { id: params.id },
    });
  } catch (error) {
    console.error("Failed to fetch property details:", error);
  }

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background-light px-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-300"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <line x1="9" y1="22" x2="9" y2="12" />
            <line x1="15" y1="22" x2="15" y2="12" />
          </svg>
        </div>
        <h1 className="text-3xl text-primary font-bold mb-3">
          Property Not Found
        </h1>
        <p className="text-gray-500 mb-8 max-w-md text-center text-sm">
          The property you are looking for does not exist or has been removed
          from our listings.
        </p>
        <Link
          href="/properties"
          className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-hover shadow-md transition-all duration-300"
        >
          Browse All Properties
        </Link>
      </div>
    );
  }

  // Parse images securely
  let images: string[] = ["/images/property-placeholder.svg"];
  if (property.images) {
    try {
      const parsed = JSON.parse(property.images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        images = parsed;
      }
    } catch (e) {}
  }

  // Parse amenities
  let amenities: string[] = [];
  if ((property as any).amenities) {
    try {
      const parsed = JSON.parse((property as any).amenities);
      if (Array.isArray(parsed) && parsed.length > 0) amenities = parsed;
    } catch {}
  }

  return (
    <div className="bg-background-light min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-300"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <Link
              href="/properties"
              className="hover:text-primary transition-colors"
            >
              Properties
            </Link>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-300"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="text-gray-600 font-medium truncate max-w-[200px]">
              {property.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Property Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${
                property.status === "Available"
                  ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                  : property.status === "Sold"
                    ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                    : "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200"
              }`}
            >
              {property.status}
            </span>
            <span className="bg-accent/10 text-accent px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ring-1 ring-accent/20">
              For {property.listingType}
            </span>
            {property.featured && (
              <span className="bg-accent text-white px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Featured
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary font-extrabold mb-2 leading-tight tracking-tight">
            {property.title}
          </h1>
          <p className="text-sm md:text-base text-gray-500 flex items-center gap-2 font-medium">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent flex-shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.phase}, Lahore
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-[63%] space-y-5">
            {/* Image Gallery */}
            <ImageGallery images={images} title={property.title} />

            {/* Key Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Size */}
              <div className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent"
                  >
                    <path d="M21 21H3V3" />
                    <path d="M21 9l-6-6-6 6" />
                    <path d="M15 3v6h6" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold leading-none mb-0.5">
                    Size
                  </p>
                  <p className="text-sm font-bold text-primary leading-tight truncate">
                    {property.size}
                  </p>
                </div>
              </div>
              {/* Type */}
              <div className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
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
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold leading-none mb-0.5">
                    Type
                  </p>
                  <p className="text-sm font-bold text-primary leading-tight truncate">
                    {property.propertyType}
                  </p>
                </div>
              </div>
              {/* Bedrooms */}
              {property.bedrooms != null && property.bedrooms > 0 && (
                <div className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3 border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-accent"
                    >
                      <path d="M2 4v16" />
                      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                      <path d="M2 17h20" />
                      <path d="M6 8v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold leading-none mb-0.5">
                      Bedrooms
                    </p>
                    <p className="text-sm font-bold text-primary leading-tight">
                      {property.bedrooms}
                    </p>
                  </div>
                </div>
              )}
              {/* Bathrooms */}
              {property.bathrooms != null && property.bathrooms > 0 && (
                <div className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3 border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-accent"
                    >
                      <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" />
                      <path d="M6 12V5a2 2 0 0 1 2-2h3v2.25" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold leading-none mb-0.5">
                      Bathrooms
                    </p>
                    <p className="text-sm font-bold text-primary leading-tight">
                      {property.bathrooms}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Unified Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Description */}
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2.5">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  Description
                </h3>
                <div className="text-gray-600 leading-relaxed text-[15px] space-y-3">
                  {property.description
                    .split("\n")
                    .map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Property Details Table */}
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2.5">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  Property Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="flex justify-between items-center py-3 px-3 border-b border-gray-50 md:border-r rounded-sm">
                    <span className="text-gray-400 text-sm">Type</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {property.propertyType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-3 border-b border-gray-50 rounded-sm">
                    <span className="text-gray-400 text-sm">Listing</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      For {property.listingType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-3 border-b border-gray-50 md:border-r rounded-sm">
                    <span className="text-gray-400 text-sm">Size</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {property.size}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-3 border-b border-gray-50 rounded-sm">
                    <span className="text-gray-400 text-sm">Location</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {property.phase}
                    </span>
                  </div>
                  {property.bedrooms != null && property.bedrooms > 0 && (
                    <div className="flex justify-between items-center py-3 px-3 border-b border-gray-50 md:border-r rounded-sm">
                      <span className="text-gray-400 text-sm">Bedrooms</span>
                      <span className="font-semibold text-gray-800 text-sm">
                        {property.bedrooms}
                      </span>
                    </div>
                  )}
                  {property.bathrooms != null && property.bathrooms > 0 && (
                    <div className="flex justify-between items-center py-3 px-3 border-b border-gray-50 rounded-sm">
                      <span className="text-gray-400 text-sm">Bathrooms</span>
                      <span className="font-semibold text-gray-800 text-sm">
                        {property.bathrooms}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3 px-3 border-b border-gray-50 md:border-r rounded-sm">
                    <span className="text-gray-400 text-sm">Status</span>
                    <span
                      className={`font-bold text-sm ${property.status === "Available" ? "text-green-600" : "text-gray-600"}`}
                    >
                      {property.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-3 border-b border-gray-50 rounded-sm">
                    <span className="text-gray-400 text-sm">Listed On</span>
                    <span className="font-semibold text-gray-800 text-sm">
                      {new Date(property.createdAt).toLocaleDateString(
                        "en-PK",
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-3 md:col-span-2 rounded-sm">
                    <span className="text-gray-400 text-sm">Price</span>
                    <span className="font-bold text-primary text-sm">
                      {property.showPricePublicly
                        ? `PKR ${((property.price || 0) / 10000000).toFixed(2)} Crore`
                        : "Call for Price"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <>
                  <div className="border-t border-gray-100" />
                  <div className="p-6 md:p-8">
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2.5">
                      <span className="w-1 h-6 bg-accent rounded-full"></span>
                      Amenities &amp; Features
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {amenities.map((amenity: string) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-gray-50"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-accent flex-shrink-0"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          <span className="text-gray-700 text-sm font-medium">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="w-full lg:w-[37%]">
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Price Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-primary to-primary-hover p-6 text-center">
                  <p className="text-[11px] text-gray-300 uppercase tracking-widest font-semibold mb-2">
                    Asking Price
                  </p>
                  {property.showPricePublicly ? (
                    <div className="text-3xl font-extrabold text-white">
                      PKR {((property.price || 0) / 10000000).toFixed(2)}{" "}
                      <span className="text-lg text-gray-300 font-semibold">
                        Crore
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-extrabold text-accent">
                      Call for Price
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-400 text-sm">Phase</span>
                      <span className="font-semibold text-gray-800 text-sm">
                        {property.phase}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t border-gray-50">
                      <span className="text-gray-400 text-sm">Size</span>
                      <span className="font-semibold text-gray-800 text-sm">
                        {property.size}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t border-gray-50">
                      <span className="text-gray-400 text-sm">Type</span>
                      <span className="font-semibold text-gray-800 text-sm">
                        {property.propertyType}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-4 font-medium text-center">
                      Interested? Contact our agent directly.
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <a
                        href="tel:03004237276"
                        className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-hover shadow-md hover:shadow-lg transition-colors duration-200 text-sm"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Call Agent
                      </a>
                      <a
                        href={`https://wa.me/923004237276?text=Hi, I am interested in this property: ${property.title} in ${property.phase}. Property ID: ${property.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#1da851] shadow-md hover:shadow-lg transition-colors duration-200 text-sm"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <ShareProperty title={property.title} phase={property.phase} />

              {/* Back Link */}
              <Link
                href="/properties"
                className="flex items-center justify-center gap-2 text-gray-500 font-medium hover:text-primary transition-colors py-2 text-sm"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to All Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
