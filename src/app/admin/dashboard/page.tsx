import React from "react";
import { Card } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  // Fetch metrics in parallel
  const [totalProperties, featuredProperties, recentProperties] =
    await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { featured: true } }),
      prisma.property.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome to the HR Real Estate Administration Panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Total Properties
          </h3>
          <div className="text-3xl font-bold text-primary">
            {totalProperties}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            Featured Listings
          </h3>
          <div className="text-3xl font-bold text-primary">
            {featuredProperties}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-primary mb-4 border-b pb-2">
          Recently Added Properties
        </h2>
        {recentProperties.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No properties added recently.
          </div>
        ) : (
          <ul className="space-y-4">
            {recentProperties.map((prop: any) => (
              <li
                key={prop.id}
                className="flex justify-between items-start border-b border-gray-50 pb-3 last:border-0"
              >
                <div>
                  <p className="font-semibold text-primary">{prop.title}</p>
                  <p className="text-sm text-gray-500">
                    {prop.phase} - {prop.propertyType}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  {prop.showPricePublicly
                    ? `PKR ${(prop.price / 10000000).toFixed(2)} Cr`
                    : "Call for Price"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
