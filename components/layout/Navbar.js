"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
            <MapPin size={24} />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-orange-600">
            Bharat<span className="text-secondary">Yatra</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                pathname === link.href ? "text-primary" : "text-gray-600"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
          <Link href="/explore">
            <Button size="sm">Plan Trip</Button>
          </Link>
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/admin">
              <Button size="sm">Login</Button>
            </SignInButton>
          </SignedOut>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-gray-50",
                    pathname === link.href ? "text-primary" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/explore" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Plan Trip</Button>
              </Link>

              <SignedIn>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                   <span className="text-lg font-medium text-gray-600">Profile</span>
                   <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <SignedOut>
                 <SignInButton mode="modal" forceRedirectUrl="/admin">
                    <Button className="w-full">Login</Button>
                 </SignInButton>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
