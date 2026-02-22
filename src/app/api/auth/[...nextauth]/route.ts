import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // Try database credentials first
        try {
          const adminUser = await prisma.user.findFirst({
            where: { email: "admin@hr-realestate.com" },
          });

          if (adminUser) {
            // Read stored username from config
            let storedUsername = process.env.ADMIN_USERNAME || "admin";
            const configPath = path.join(process.cwd(), "admin-config.json");
            if (fs.existsSync(configPath)) {
              const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
              storedUsername = config.username || storedUsername;
            }

            const passwordMatch = await bcrypt.compare(
              credentials.password,
              adminUser.password,
            );

            if (credentials.username === storedUsername && passwordMatch) {
              return {
                id: "1",
                name: "Admin User",
                email: "admin@hr-realestate.com",
              };
            }
            return null;
          }
        } catch (error) {
          console.error("DB auth check error:", error);
        }

        // Fallback to env vars (default credentials)
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "password123";

        if (
          credentials.username === adminUsername &&
          credentials.password === adminPassword
        ) {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@hr-realestate.com",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    "fallback_secret_for_development_hr_real_estate",
});

export { handler as GET, handler as POST };
