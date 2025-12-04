
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Featured() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    import("@/data/states").then((mod) => {
      setStates(mod.states);
    });
  }, []);

  // Get random 3 states for featured section
  const featuredStates = states.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most visited and loved destinations across India. From the mountains of the north to the backwaters of the south.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredStates.map((state, index) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={state.image}
                  alt={state.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900 flex items-center gap-1">
                  <MapPin size={14} className="text-primary" />
                  {state.districts?.length || 0} Districts
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{state.name}</h3>
                <p className="text-primary font-medium mb-3 text-sm">{state.shortDesc}</p>
                <p className="text-gray-600 line-clamp-2 mb-6 text-sm">{state.description}</p>
                <Link href={`/states/${state.id}`}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    Explore State
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/states">
            <Button size="lg" className="gap-2">
              View All Destinations <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

