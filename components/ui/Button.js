"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  onClick,
  ...props 
}) {
  const variants = {
    primary: "bg-primary text-white hover:bg-orange-600 shadow-md hover:shadow-lg",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary/5",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const Component = props.href ? motion.a : motion.button;

  return (
    <Component
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </Component>
  );
}
