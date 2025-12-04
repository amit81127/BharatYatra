"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        onClick={() => openLightbox(idx)}
                        className="cursor-pointer overflow-hidden rounded-lg aspect-square relative group"
                    >
                        <img
                            src={src}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-4 text-white hover:text-gray-300 p-2"
                            onClick={prevImage}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <img
                            src={images[currentIndex]}
                            alt={`Full view ${currentIndex + 1}`}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            className="absolute right-4 text-white hover:text-gray-300 p-2"
                            onClick={nextImage}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
