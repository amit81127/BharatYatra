"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, Clock, Ticket, Info, Hotel, Star, Phone } from "lucide-react";
import { states } from "@/data/states";
import Button from "@/components/ui/Button";

// small helper to slugify strings (used to match ids or names)
const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function PlacePage() {
  const params = useParams();
  // destructure expected route params
  const { stateId: rawStateId, districtId: rawDistrictId, placeId: rawPlaceId } = params || {};

  // tolerant finder: tries to match by id first, then slugified name
  const findState = (idOrSlug) =>
    states.find((s) => s.id === idOrSlug) ||
    states.find((s) => slugify(s.id) === slugify(idOrSlug)) ||
    states.find((s) => slugify(s.name) === slugify(idOrSlug));

  const stateData = findState(rawStateId);

  const findDistrict = (state, idOrSlug) => {
    if (!state?.districts) return undefined;
    return (
      state.districts.find((d) => d.id === idOrSlug) ||
      state.districts.find((d) => slugify(d.id) === slugify(idOrSlug)) ||
      state.districts.find((d) => slugify(d.name) === slugify(idOrSlug))
    );
  };

  const districtData = findDistrict(stateData, rawDistrictId);

  const findPlace = (district, idOrSlug) => {
    if (!district?.places) return undefined;
    return (
      district.places.find((p) => p.id === idOrSlug) ||
      district.places.find((p) => slugify(p.id) === slugify(idOrSlug)) ||
      district.places.find((p) => slugify(p.name) === slugify(idOrSlug))
    );
  };

  const placeData = findPlace(districtData, rawPlaceId);

  if (!stateData || !districtData || !placeData) {
    return <div className="min-h-screen flex items-center justify-center">Place not found</div>;
  }

  // images: support both placeData.image (string) and placeData.images (array)
  const images = (() => {
    if (Array.isArray(placeData.images) && placeData.images.length > 0) return placeData.images;
    if (Array.isArray(placeData.image) && placeData.image.length > 0) return placeData.image;
    if (typeof placeData.image === "string" && placeData.image) return [placeData.image];
    return []; // fallback empty
  })();

  // hotels: support if hotels are nested under place or if you have a global hotel list
  const hotels = Array.isArray(placeData.hotels) ? placeData.hotels : [];

  // sort hotels by distance when available (ascending)
  const hotelsSorted = hotels.slice().sort((a, b) => {
    const da = a?.distanceFromPlaceKm ?? Number.MAX_SAFE_INTEGER;
    const db = b?.distanceFromPlaceKm ?? Number.MAX_SAFE_INTEGER;
    return da - db;
  });

  // format location: support {lat,lng} or string
  const formatLocation = (loc) => {
    if (!loc) return "Location not available";
    if (typeof loc === "object" && (loc.lat || loc.lng)) {
      const lat = typeof loc.lat === "number" ? loc.lat.toFixed(6) : loc.lat;
      const lng = typeof loc.lng === "number" ? loc.lng.toFixed(6) : loc.lng;
      return `${lat}, ${lng}`;
    }
    return String(loc);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {images.length > 0 ? (
          // show first image as hero
          <img src={images[0]} alt={placeData.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            <h2 className="text-2xl text-gray-600">No image available</h2>
          </div>
        )}

        <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{placeData.name}</h1>
            <div className="flex items-center justify-center gap-2 text-lg text-gray-200">
              <MapPin size={20} />
              <span>{districtData.name}, {stateData.name}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={16} />
            <Link href="/explore" className="hover:text-primary">Explore</Link>
            <ChevronRight size={16} />
            <Link href={`/state/${stateData.id}`} className="hover:text-primary">{stateData.name}</Link>
            <ChevronRight size={16} />
            <Link href={`/state/${stateData.id}/${districtData.id}`} className="hover:text-primary">{districtData.name}</Link>
            <ChevronRight size={16} />
            <span className="text-primary font-medium">{placeData.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Info className="text-primary" /> About {placeData.name}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">{placeData.description || "No description available."}</p>

              {/* image gallery if there are multiple */}
              {images.length > 1 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {images.map((src, idx) => (
                    <img key={idx} src={src} alt={`${placeData.name} ${idx+1}`} className="w-full h-32 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>

            {/* Hotels Section */}
            {hotelsSorted && hotelsSorted.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <Hotel className="text-primary" /> Nearby Hotels ({hotelsSorted.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hotelsSorted.map((hotel) => (
                    <div key={hotel.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900">{hotel.name}</h3>
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-medium">
                          <Star size={14} />
                          <span>{hotel.rating ?? "—"}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mb-3">{hotel.address ?? "Address not provided"}</p>

                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        <Phone size={14} />
                        <span>{hotel.contact ?? "N/A"}</span>
                        {hotel.distanceFromPlaceKm !== undefined && (
                          <span className="ml-4 text-xs text-gray-400">{hotel.distanceFromPlaceKm} km away</span>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400">Avg. Price</p>
                          <p className="font-bold text-primary">₹{hotel.averagePrice ?? "—"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm">Book</Button>
                        </div>
                      </div>

                      {/* hotel images preview */}
                      {Array.isArray(hotel.images) && hotel.images.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {hotel.images.slice(0,3).map((im, i) => (
                            <img key={i} src={im} alt={`${hotel.name} ${i+1}`} className="w-full h-20 object-cover rounded" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Places Section */}
            {districtData.places && districtData.places.length > 1 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">More in {districtData.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {districtData.places
                    .filter((p) => p.id !== placeData.id)
                    .map((place) => (
                      <Link href={`/state/${stateData.id}/${districtData.id}/${place.id}`} key={place.id} className="group">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100">
                          <div className="h-48 overflow-hidden">
                            <img
                              src={place.image}
                              alt={place.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{place.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{place.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-900 border-b border-gray-100 pb-2">Visitor Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Timings</p>
                      <p className="text-gray-900">{placeData.timings ?? "Timings not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      <Ticket size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Entry Fee</p>
                      <p className="text-gray-900">{placeData.entryFee ?? "Free / Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Location</p>
                      <p className="text-gray-900 text-sm break-all">{formatLocation(placeData.location)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <Button className="w-full">Get Directions</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
