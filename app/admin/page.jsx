"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { states } from "@/data/states";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function AdminPage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
                    <p className="text-gray-600">Please login to access the admin panel.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Welcome back, <span className="text-primary">{user.firstName}</span>! 👋
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Manage your travel destinations and explore the beauty of India from your dashboard.
                        </p>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl -ml-12 -mb-12" />
                </motion.div>

                {/* States Grid Section */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-between"
                    >
                        <h2 className="text-2xl font-bold text-gray-900">All States</h2>
                        <span className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                            {states.length} States Available
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {states.map((state, index) => (
                            <motion.div
                                key={state.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={state.image}
                                        alt={state.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                                {state.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2">
                                                {state.shortDesc || state.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin size={16} className="text-primary" />
                                            <span>{state.districts?.length || 0} Districts</span>
                                        </div>

                                        <Link
                                            href={`/state/${state.id}`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-600 group-hover:bg-primary group-hover:text-white transition-colors"
                                        >
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
