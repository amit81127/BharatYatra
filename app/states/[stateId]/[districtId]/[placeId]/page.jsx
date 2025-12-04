"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import { findState, findDistrict, findPlace } from "@/lib/data";
import { formatLocation } from "@/lib/geo";
import HotelCard from "@/components/HotelCard";
import ImageGallery from "@/components/ImageGallery";
import Button from "@/components/ui/Button";
import { MapPin, ChevronRight, Clock, Ticket, Info, Hotel, ArrowLeft } from "lucide-react";

// ADD these imports
import { Bike, Car, Bus, Train } from "lucide-react";

export default function PlacePage() {
    const params = useParams();
    const [data, setData] = useState({ state: null, district: null, place: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const module = await import("@/data/states.js");
                const foundState = findState(module.states, params.stateId);

                if (foundState) {
                    const foundDistrict = findDistrict(foundState, params.districtId);
                    if (foundDistrict) {
                        const foundPlace = findPlace(foundDistrict, params.placeId);
                        if (foundPlace) {
                            setData({ state: foundState, district: foundDistrict, place: foundPlace });
                        } else {
                            setError("Place not found");
                        }
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

        if (params.stateId && params.districtId && params.placeId) {
            loadData();
        }
    }, [params.stateId, params.districtId, params.placeId]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (error || !data.place) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{error || "Not Found"}</h1>
                    <Link href={`/states/${params.stateId || ""}/${params.districtId || ""}`} className="text-primary hover:underline flex items-center gap-2">
                        <ArrowLeft size={16} /> Back to District
                    </Link>
                </div>
            </Layout>
        );
    }

    const { state, district, place } = data;

    // Handle images
    const images = Array.isArray(place.images) && place.images.length > 0
        ? place.images
        : (place.image ? [place.image] : []);

    // Handle hotels
    const hotels = place.hotels || [];
    const sortedHotels = [...hotels].sort((a, b) => {
        const da = a.distanceFromPlaceKm ?? Infinity;
        const db = b.distanceFromPlaceKm ?? Infinity;
        return da - db;
    });

    /**
     * TransportOptions component
     * - Shows per-km rates for bike/car/bus/train
     * - If the place provides a distance (place.distanceFromNearestCityKm or place.distanceKm),
     *   display an estimated total fare for each transport using the per-km rates.
     */
    const TransportOptions = ({ place }) => {
        // per-km rates in INR (adjust to your preference or source)
        const RATES = {
            bike: 2,      // ₹2 per km
            car: 10,      // ₹10 per km
            bus: 1.5,     // ₹1.5 per km
            train: 0.8,   // ₹0.8 per km
        };

        // Try a couple of commonly named distance fields; fallback to null if not present
        const distanceKm = place.distanceFromNearestCityKm ?? place.distanceKm ?? null;

        const formatPrice = (p) => {
            if (p == null || Number.isNaN(p)) return "—";
            return `₹${Math.round(p)}`;
        };

        const items = [
            { key: "bike", label: "Bike", Icon: Bike, rate: RATES.bike },
            { key: "car", label: "Car (Taxi)", Icon: Car, rate: RATES.car },
            { key: "bus", label: "Bus", Icon: Bus, rate: RATES.bus },
            { key: "train", label: "Train", Icon: Train, rate: RATES.train },
        ];

        return (
            <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <h4 className="text-md font-semibold mb-3 text-gray-900">Estimated Travel Prices</h4>
                <p className="text-sm text-gray-500 mb-4">
                    Prices shown are estimates. Per-km rate is displayed, and total is calculated if distance is available.
                </p>

                <div className="grid grid-cols-2 gap-3">
                    {items.map(({ key, label, Icon, rate }) => {
                        const total = distanceKm ? (rate * Number(distanceKm)) : null;
                        return (
                            <div key={key} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Icon size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-sm font-medium text-gray-800">{label}</span>
                                        <span className="text-sm text-gray-600">{formatPrice(total ?? rate)}{distanceKm ? "" : " (per km)"}</span>
                                    </div>
                                    <div className="text-xs text-gray-400">{distanceKm ? `${distanceKm} km @ ₹${rate}/km` : `₹${rate}/km`}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* If distance isn't available, provide a small tip */}
                {!distanceKm && (
                    <p className="text-xs text-gray-400 mt-3">
                        Tip: add `distanceFromNearestCityKm` (number) to your place data to show total price estimates.
                    </p>
                )}
            </div>
        );
    };

    return (
        <Layout>
            {/* Hero */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                {images.length > 0 ? (
                    <img src={images[0]} alt={place.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">No Image</div>
                )}

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{place.name}</h1>
                        <div className="flex items-center justify-center gap-2 text-lg text-gray-200">
                            <MapPin size={20} />
                            <span>{district.name}, {state.name}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={16} />
                        <Link href="/states" className="hover:text-primary">States</Link>
                        <ChevronRight size={16} />
                        <Link href={`/states/${state.id}`} className="hover:text-primary">{state.name}</Link>
                        <ChevronRight size={16} />
                        <Link href={`/states/${state.id}/${district.id}`} className="hover:text-primary">{district.name}</Link>
                        <ChevronRight size={16} />
                        <span className="text-primary font-medium">{place.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                                <Info className="text-primary" /> About {place.name}
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {place.description || "No description available."}
                            </p>

                            <ImageGallery images={images} />
                        </div>

                        {/* Hotels */}
                        {sortedHotels.length > 0 && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                                    <Hotel className="text-primary" /> Nearby Hotels
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {sortedHotels.map((hotel) => (
                                        <HotelCard key={hotel.id} hotel={hotel} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-100 pb-2">Visitor Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Timings</p>
                                            <p className="text-gray-900">{place.timings || "Not provided"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                            <Ticket size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Entry Fee</p>
                                            <p className="text-gray-900">{place.entryFee || "Not provided"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Location</p>
                                            <p className="text-gray-900 text-sm break-all">{formatLocation(place.location)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* NEW: Transport options & pricing */}
                            <TransportOptions place={place} />

                            <div className="pt-6 border-t border-gray-100">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${place.location?.lat},${place.location?.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button className="w-full">Get Directions</Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
