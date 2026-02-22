# HR Real Estate

A modern, premium real estate web application specializing in DHA (Defence Housing Authority) properties in Lahore, Pakistan. Built with Next.js 14, Prisma, and Tailwind CSS.

## Features

- **Property Listings** — Browse, search, and filter residential and commercial properties across all DHA phases
- **Admin Dashboard** — Secure admin panel for managing properties, testimonials, inquiries, and credentials
- **Responsive Design** — Fully responsive UI optimized for desktop, tablet, and mobile devices
- **Authentication** — Secure admin login powered by NextAuth.js with JWT strategy
- **SEO Optimized** — Server-side rendered pages with proper metadata

## Tech Stack

| Technology                                    | Purpose                      |
| --------------------------------------------- | ---------------------------- |
| [Next.js 14](https://nextjs.org/)             | React framework (App Router) |
| [Tailwind CSS 4](https://tailwindcss.com/)    | Utility-first CSS            |
| [Prisma](https://www.prisma.io/)              | Database ORM                 |
| [SQLite](https://www.sqlite.org/)             | Database                     |
| [NextAuth.js](https://next-auth.js.org/)      | Authentication               |
| [TypeScript](https://www.typescriptlang.org/) | Type safety                  |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Saqibb786/HRRealEstate.git
cd HRRealEstate

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client and run migrations
npx prisma generate
npx prisma db push

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-admin-password"
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin dashboard
│   ├── api/              # API routes
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   └── properties/       # Property listings & detail
├── components/
│   ├── home/             # Homepage sections
│   ├── layout/           # Navbar, Footer, MobileNav
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities (Prisma client)
└── middleware.ts          # Auth middleware
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

**HR Real Estate** — 20 Years of Excellence in DHA Real Estate
