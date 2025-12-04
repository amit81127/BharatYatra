import { Star, MapPin, Phone } from "lucide-react";
import Button from "./ui/Button";

export default function HotelCard({ hotel }) {
    return (
        <div className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900">{hotel.name}</h3>
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-medium">
                    <Star size={14} fill="currentColor" />
                    {hotel.rating ?? "—"}
                </div>
            </div>

            <p className="text-sm text-gray-500 mb-3 flex items-start gap-1">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {hotel.address ?? "Address not provided"}
            </p>

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                <Phone size={14} />
                <span>{hotel.contact ?? "N/A"}</span>
                {hotel.distanceFromPlaceKm !== undefined && (
                    <span className="ml-auto text-xs text-gray-400">{hotel.distanceFromPlaceKm} km away</span>
                )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                <div>
                    <p className="text-xs text-gray-400">Avg. Price</p>
                    <p className="font-bold text-primary">₹{hotel.averagePrice ?? "—"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    <Button
                        size="sm"
                        href={`https://www.goibibo.com/hotels/find-hotels-in-${hotel.name.toLowerCase().replace(/ /g, '-')}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Book
                    </Button>
                </div>
            </div>

            {/* Hotel Images Preview */}
            {Array.isArray(hotel.images) && hotel.images.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {hotel.images.slice(0, 3).map((im, i) => (
                        <img key={i} src={im} alt={`${hotel.name} ${i + 1}`} className="w-full h-20 object-cover rounded" />
                    ))}
                </div>
            )}
        </div>
    );
}
