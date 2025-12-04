"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PlaceList({ stateId, districtId, places }) {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";
    const category = searchParams.get("category")?.toLowerCase() || "all";

    const filteredPlaces = places.filter((place) => {
        const matchesSearch = place.name.toLowerCase().includes(query) || place.description.toLowerCase().includes(query);
        const matchesCategory = category === "all" || (place.category && place.category.toLowerCase() === category); // Assuming place has category, if not ignore
        return matchesSearch && matchesCategory;
    });

    if (filteredPlaces.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-lg">No places found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlaces.map((place) => (
                <div key={place.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                    <div className="relative h-56 overflow-hidden">
                        <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        {place.category && (
                            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                                {place.category}
                            </span>
                        )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                        <p className="text-gray-600 line-clamp-3 text-sm mb-4 flex-grow">{place.description}</p>
                        <Link href={`/states/${stateId}/${districtId}/${place.id}`} className="mt-auto">
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2 group">
                                View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
