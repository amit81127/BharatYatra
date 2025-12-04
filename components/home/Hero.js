"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzU6UYQ3Bl4Y9k9gC58jW_fu3Fr0o1Po5vWXjwkZx0kh0VReBDMiWbT_F_A7Un_3SrUX_PoglYZCGShSNc6QHBr83MVPewNRJ4tFMqW10THaRmv-XpGXrOmwRNhlLU7A89HRnG_SQ=s1360-w1360-h1020-rw"
          alt="Taj Mahal"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Discover the Soul of <span className="text-primary">India</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200"
        >
          Embark on a journey through ancient heritage, vibrant cultures, and breathtaking landscapes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link href="/explore">
            <Button size="lg" className="w-full md:w-auto">
              Start Exploring
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="w-full md:w-auto bg-white/10 border-white text-white hover:bg-white/20">
              Plan Your Trip
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
