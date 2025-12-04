"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Search } from "lucide-react";

export default function StatesPage() {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const module = await import("@/data/states.js");
                setStates(module.states || []);
            } catch (error) {
                console.error("Failed to load states data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredStates = states.filter(state =>
        state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-12 text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-4xl font-bold text-gray-900">Explore States of India</h1>

                    {/* Simple Search */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search states..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {filteredStates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredStates.map((state) => (
                            <Link href={`/states/${state.id}`} key={state.id} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={state.image}
                                            alt={state.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h2 className="text-2xl font-bold">{state.name}</h2>
                                            {state.region && <p className="text-sm text-gray-200">{state.region}</p>}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow">
                                        <p className="text-primary font-medium mb-2">{state.shortDesc}</p>
                                        <p className="text-gray-600 line-clamp-3 text-sm">{state.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <p className="text-xl text-gray-500">No states found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
