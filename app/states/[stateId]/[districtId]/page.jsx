"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { findState, findDistrict } from "@/lib/data";
import { ChevronRight, ArrowLeft, Search, ArrowRight, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

const ITEMS_PER_PAGE = 20;

export default function DistrictPage() {
    const params = useParams();
    const [data, setData] = useState({ state: null, district: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadData() {
            try {
                const module = await import("@/data/states.js");
                const foundState = findState(module.states, params.stateId);

                if (foundState) {
                    const foundDistrict = findDistrict(foundState, params.districtId);
                    if (foundDistrict) {
                        setData({ state: foundState, district: foundDistrict });
                    } else {
                        setError("District not found");
                    }
                } else {
                    setError("State not found");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        }

        if (params.stateId && params.districtId) {
            loadData();
        }
    }, [params.stateId, params.districtId]);

    // Filtering Logic
    const places = data.district?.places || [];
    const categories = ["all", ...new Set(places.map(p => p.category).filter(Boolean))];

    const filteredPlaces = places.filter(place => {
        const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
    const paginatedPlaces = filteredPlaces.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);


    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (error || !data.district) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{error || "Not Found"}</h1>
                    <Link href={`/states/${params.stateId || ""}`} className="text-primary hover:underline flex items-center gap-2">
                        <ArrowLeft size={16} /> Back to State
                    </Link>
                </div>
            </Layout>
        );
    }

    const { state, district } = data;

    return (
        <Layout>
            {/* Hero */}
            <div className="relative h-[40vh] overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src={district.image}
                    alt={district.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-2">{district.name}</h1>
                    <p className="text-lg opacity-90">District of {state.name}</p>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/states" className="hover:text-primary">States</Link>
                        <ChevronRight size={14} />
                        <Link href={`/states/${state.id}`} className="hover:text-primary">{state.name}</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">{district.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Places to Visit ({filteredPlaces.length})</h2>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search places..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
                            />
                        </div>

                        {/* Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white capitalize"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {paginatedPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedPlaces.map((place) => (
                            <div key={place.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                    {place.category && (
                                        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                                            {place.category}
                                        </span>
                                    )}
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                                    <p className="text-gray-600 line-clamp-3 text-sm mb-4 flex-grow">{place.description}</p>
                                    <Link href={`/states/${state.id}/${district.id}/${place.id}`} className="mt-auto">
                                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 group">
                                            View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-xl">
                        <p className="text-gray-500 text-lg">No places found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                            className="mt-4 text-primary hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
