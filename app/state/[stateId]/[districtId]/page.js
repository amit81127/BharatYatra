"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, Clock, Ticket } from "lucide-react";
import { states } from "@/data/states";
import Button from "@/components/ui/Button";

export default function DistrictPage() {
  const params = useParams();
  const stateData = states.find((s) => s.id === params.stateId);
  const districtData = stateData?.districts?.find((d) => d.id === params.districtId);

  if (!stateData || !districtData) {
    return <div className="min-h-screen flex items-center justify-center">District not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src={districtData.image}
          alt={districtData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white p-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {districtData.name}
            </motion.h1>
            <p className="text-xl text-gray-200">
              District in {stateData.name}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={16} />
            <Link href="/explore" className="hover:text-primary">Explore</Link>
            <ChevronRight size={16} />
            <Link href={`/state/${stateData.id}`} className="hover:text-primary">{stateData.name}</Link>
            <ChevronRight size={16} />
            <span className="text-primary font-medium">{districtData.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            {districtData.description}
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-gray-900">Places to Visit in {districtData.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {districtData.places?.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{place.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-1">{place.description}</p>
                
                <div className="space-y-2 mb-6 text-sm text-gray-500">
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-primary mt-0.5" />
                    <span>{place.timings}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Ticket size={16} className="text-primary mt-0.5" />
                    <span>{place.entryFee}</span>
                  </div>
                </div>

                <Link href={`/state/${stateData.id}/${districtData.id}/${place.id}`} className="mt-auto">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
