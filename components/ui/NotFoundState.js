"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MapPinOff } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFoundState({ title = "Page Not Found", message = "The destination you are looking for does not exist or has been moved." }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 p-8 rounded-full mb-6"
      >
        <MapPinOff size={64} className="text-gray-400" />
      </motion.div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600 max-w-md mb-8">{message}</p>
      <Link href="/">
        <Button>
          <Home size={18} /> Back to Home
        </Button>
      </Link>
    </div>
  );
}
