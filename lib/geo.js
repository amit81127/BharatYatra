// Haversine formula to calculate distance between two points
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const formatLocation = (loc) => {
  if (!loc) return "Location not available";
  if (typeof loc === "object" && (loc.lat || loc.lng)) {
    const lat = typeof loc.lat === "number" ? loc.lat.toFixed(6) : loc.lat;
    const lng = typeof loc.lng === "number" ? loc.lng.toFixed(6) : loc.lng;
    return `${lat}, ${lng}`;
  }
  return String(loc);
};

// Estimate travel time in minutes (assuming avg speed 40 km/h)
export const estimateTravelTime = (distanceKm, speedKmH = 40) => {
  if (!distanceKm) return null;
  const hours = distanceKm / speedKmH;
  return Math.round(hours * 60);
};
