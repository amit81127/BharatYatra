"use client";

import { useState } from "react";
import { states } from "@/data/states";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronRight, ChevronDown } from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedState, setExpandedState] = useState(null);
  const [expandedDistrict, setExpandedDistrict] = useState(null);

  // Filter logic
  const filteredStates = states.filter((state) => {
    const matchesState = state.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = state.districts.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPlace = state.districts.some(d => d.places.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesState || matchesDistrict || matchesPlace;
  });

  const toggleState = (id) => {
    setExpandedState(expandedState === id ? null : id);
    setExpandedDistrict(null); // Reset district when switching states
  };

  const toggleDistrict = (id) => {
    setExpandedDistrict(expandedDistrict === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Discover Incredible India
          </motion.h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Explore the rich heritage, diverse cultures, and breathtaking landscapes of India.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for states, districts, or places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 shadow-lg focus:ring-4 focus:ring-blue-500/30 outline-none transition-all"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-6xl -mt-10 relative z-10">
        {filteredStates.length > 0 ? (
          <div className="space-y-6">
            {filteredStates.map((state) => (
              <motion.div 
                key={state.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
              >
                {/* State Header */}
                <div 
                  onClick={() => toggleState(state.id)}
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={state.image} 
                        alt={state.name} 
                        fill 
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200&auto=format&fit=crop"; // Fallback
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{state.name}</h2>
                      <p className="text-gray-500 text-sm">{state.districts.length} Districts</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-300 ${expandedState === state.id ? 'rotate-180' : ''}`}>
                    <ChevronDown size={24} className="text-gray-400" />
                  </div>
                </div>

                {/* Districts Accordion */}
                <AnimatePresence>
                  {expandedState === state.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100 bg-gray-50/50"
                    >
                      <div className="p-6 space-y-4">
                        {state.districts.map((district) => (
                          <div key={district.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div 
                              onClick={() => toggleDistrict(district.id)}
                              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                            >
                              <h3 className="text-lg font-semibold text-gray-800">{district.name}</h3>
                              <ChevronDown 
                                size={20} 
                                className={`text-gray-400 transition-transform ${expandedDistrict === district.id ? 'rotate-180' : ''}`} 
                              />
                            </div>

                            {/* Places Grid */}
                            <AnimatePresence>
                              {expandedDistrict === district.id && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: "auto" }}
                                  exit={{ height: 0 }}
                                  className="border-t border-gray-100"
                                >
                                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {district.places.map((place) => (
                                      <Link href={`/place/${place.id}`} key={place.id} className="group">
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                                          <div className="relative h-48 overflow-hidden">
                                            <Image
                                              src={place.image}
                                              alt={place.name}
                                              fill
                                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                                              unoptimized
                                            />
                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                                              <MapPin size={12} className="text-blue-600" />
                                              View
                                            </div>
                                          </div>
                                          <div className="p-4 flex-grow">
                                            <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                              {place.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 line-clamp-2">
                                              {place.description}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-xl text-gray-500">No destinations found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
