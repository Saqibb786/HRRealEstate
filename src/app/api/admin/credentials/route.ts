import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentUsername, currentPassword, newUsername, newPassword } =
      await request.json();

    if (!currentUsername || !currentPassword || !newUsername || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Check current credentials against env vars or database
    const envUsername = process.env.ADMIN_USERNAME || "admin";
    const envPassword = process.env.ADMIN_PASSWORD || "password123";

    // Try database first
    const existingAdmin = await prisma.user.findFirst({
      where: { email: "admin@hr-realestate.com" },
    });

    let isValid = false;

    if (existingAdmin) {
      // Validate against database credentials
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        existingAdmin.password,
      );
      isValid = currentUsername === existingAdmin.username && passwordMatch;
    } else {
      // Validate against env vars (first time)
      isValid =
        currentUsername === envUsername && currentPassword === envPassword;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Current credentials are incorrect" },
        { status: 403 },
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Upsert admin user in database with username
    await prisma.user.upsert({
      where: { email: "admin@hr-realestate.com" },
      update: {
        username: newUsername,
        password: hashedPassword,
      },
      create: {
        email: "admin@hr-realestate.com",
        username: newUsername,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Credential update error:", error);
    return NextResponse.json(
      { error: "Failed to update credentials" },
      { status: 500 },
    );
  }
}
