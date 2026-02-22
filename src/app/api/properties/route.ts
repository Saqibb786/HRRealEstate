import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const propertyType = searchParams.get("type");
    const listingType = searchParams.get("listing");
    const phase = searchParams.get("phase");

    const where: any = {};
    if (featured) where.featured = featured === "true";
    if (propertyType)
      where.propertyType = { equals: propertyType, mode: "insensitive" };
    if (listingType)
      where.listingType = { equals: listingType, mode: "insensitive" };
    if (phase) where.phase = { equals: phase, mode: "insensitive" };

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const property = await prisma.property.create({
      data: body,
    });
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Failed to create property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 400 },
    );
  }
}
