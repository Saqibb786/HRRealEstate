import React from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="container mx-auto px-4 h-14 md:h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="text-lg md:text-xl font-bold text-primary tracking-tight flex-shrink-0 group"
        >
          HR{" "}
          <span className="text-accent group-hover:text-accent-hover transition-colors duration-200">
            Real Estate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7 text-[13px] font-semibold text-gray-600 uppercase tracking-wide">
            <li>
              <Link
                href="/"
                className="hover:text-primary transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-accent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/properties"
                className="hover:text-primary transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-accent"
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-accent"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-accent"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3 border-l border-gray-200/80 pl-7">
            <a
              href="tel:03004237276"
              className="font-semibold text-sm text-primary hover:text-accent transition-colors"
            >
              0300-4237276
            </a>
            <a
              href="tel:03004237276"
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm hover:shadow-md uppercase tracking-wider"
            >
              Call Now
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <MobileNav />
      </div>
    </header>
  );
};
