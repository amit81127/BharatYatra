"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ChevronRight } from "lucide-react";
import { states } from "@/data/states";
import Button from "@/components/ui/Button";
import NotFoundState from "@/components/ui/NotFoundState";

export default function StatePage() {
  const params = useParams();
  const stateData = states.find((s) => s.id === params.stateId);

  if (!stateData) {
    return <NotFoundState title="State Not Found" message="We couldn't find the state you're looking for. Please check the URL or explore other destinations." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={stateData.image}
          alt={stateData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white p-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              {stateData.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto"
            >
              {stateData.shortDesc}
            </motion.p>
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
            <span className="text-primary font-medium">{stateData.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About {stateData.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {stateData.description}
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-gray-900">Popular Districts</h2>
            <div className="space-y-6">
              {stateData.districts?.map((district, index) => (
                <motion.div
                  key={district.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group"
                >
                  <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={district.image}
                      alt={district.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{district.name}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">{district.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={16} /> {district.places?.length || 0} Places to visit
                      </span>
                      <Link href={`/state/${stateData.id}/${district.id}`}>
                        <Button size="sm" className="group-hover:bg-primary group-hover:text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Capital</span>
                  <span className="font-medium text-gray-900">Jaipur</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Best Time</span>
                  <span className="font-medium text-gray-900">Oct - Mar</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium text-gray-900">Hindi, Rajasthani</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Need Help?</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Plan your trip with our expert travel guides.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
