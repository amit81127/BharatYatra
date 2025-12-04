"use client";

import { states } from "@/data/states";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Ticket, Calendar, ArrowLeft, Star, Share2 } from "lucide-react";

import { use } from "react";

export default function PlacePage({ params }) {
  // ✅ FIX: use params directly
  const { id } = use(params);

  let foundPlace = null;
  let foundDistrict = null;
  let foundState = null;

  // 🔍 Find place by ID
  for (const state of states) {
    for (const district of state.districts) {
      const place = district.places.find((p) => p.id === id);
      if (place) {
        foundPlace = place;
        foundDistrict = district;
        foundState = state;
        break;
      }
    }
    if (foundPlace) break;
  }

  if (!foundPlace) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Place Not Found</h1>
          <Link href="/explore" className="text-blue-600 hover:underline">
            Return to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={foundPlace.image}
          alt={foundPlace.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <Link 
            href="/explore" 
            className="flex items-center gap-2 text-white/90 hover:text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full transition-all hover:bg-black/40"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <div className="flex items-center gap-2 text-blue-300 mb-2 font-medium tracking-wide uppercase text-sm">
                  <MapPin size={16} />
                  {foundDistrict.name}, {foundState.name}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{foundPlace.name}</h1>
                <div className="flex items-center gap-4 text-sm md:text-base text-gray-200">
                  {foundPlace.rating && (
                    <span className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded text-yellow-300 border border-yellow-500/30">
                      <Star size={16} fill="currentColor" /> {foundPlace.rating}
                    </span>
                  )}
                  <span>•</span>
                  <span>{foundPlace.reviews || "1.2k"} Reviews</span>
                </div>
              </div>
              
              <button className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {foundPlace.description}
              </p>
            </div>

            {/* Google Map Embed */}
            {foundPlace.location && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>

                <div className="h-80 bg-gray-100 rounded-xl overflow-hidden relative">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    // ✅ FIX: proper embed URL
                    src={`https://www.google.com/maps?q=${foundPlace.location.lat},${foundPlace.location.lng}&z=14&output=embed`}
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs text-center text-gray-500">
                    Coordinates: {foundPlace.location.lat}, {foundPlace.location.lng}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Visitor Info</h3>
              
              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Timings</h4>
                    <p className="text-gray-600">{foundPlace.timings || "Open 24 Hours"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                    <Ticket size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Entry Fee</h4>
                    <p className="text-gray-600">{foundPlace.entryFee || "Free Entry"}</p>
                  </div>
                </div>

                {foundPlace.bestTimeToVisit && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Best Time</h4>
                      <p className="text-gray-600">{foundPlace.bestTimeToVisit}</p>
                    </div>
                  </div>
                )}
              </div>

              <a 
                href="https://shrikashivishwanath.org/frontend/home/poojaList" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-center"
              >
                Plan a Visit
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
