"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { findState } from "@/lib/data";
import { MapPin, ChevronRight, ArrowLeft } from "lucide-react";

export default function StatePage() {
    const params = useParams();
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const module = await import("@/data/states.js");
                const foundState = findState(module.states, params.stateId);

                if (foundState) {
                    setState(foundState);
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

        if (params.stateId) {
            loadData();
        }
    }, [params.stateId]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (error || !state) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">State Not Found</h1>
                    <p className="text-gray-600 mb-8">We couldn't find the state you're looking for.</p>
                    <Link href="/states" className="text-primary hover:underline flex items-center gap-2">
                        <ArrowLeft size={16} /> Back to States
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero */}
            <div className="relative h-[50vh] overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={state.image}
                    alt={state.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">{state.name}</h1>
                    <p className="text-xl md:text-2xl max-w-2xl">{state.shortDesc}</p>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/states" className="hover:text-primary">States</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">{state.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">About {state.name}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">{state.description}</p>
                </div>

                <h2 className="text-3xl font-bold mb-8 text-gray-900">Districts in {state.name}</h2>

                {state.districts && state.districts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {state.districts.map((district) => (
                            <Link href={`/states/${state.id}/${district.id}`} key={district.id} className="group">
                                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={district.image}
                                            alt={district.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                            <MapPin size={10} />
                                            {district.places?.length || 0} Places
                                        </div>
                                    </div>
                                    <div className="p-5 flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{district.name}</h3>
                                        <p className="text-gray-600 line-clamp-2 text-sm">{district.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No districts found for this state.</p>
                )}
            </div>
        </Layout>
    );
}
