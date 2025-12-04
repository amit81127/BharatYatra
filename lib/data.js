// Helper to slugify strings for robust matching
export const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Robust lookup helpers
export const findState = (states, idOrSlug) => {
  if (!states || !idOrSlug) return null;
  const target = slugify(idOrSlug);
  return states.find(
    (s) => s.id === idOrSlug || slugify(s.id) === target || slugify(s.name) === target
  );
};

export const findDistrict = (state, idOrSlug) => {
  if (!state?.districts || !idOrSlug) return null;
  const target = slugify(idOrSlug);
  return state.districts.find(
    (d) => d.id === idOrSlug || slugify(d.id) === target || slugify(d.name) === target
  );
};

export const findPlace = (district, idOrSlug) => {
  if (!district?.places || !idOrSlug) return null;
  const target = slugify(idOrSlug);
  return district.places.find(
    (p) => p.id === idOrSlug || slugify(p.id) === target || slugify(p.name) === target
  );
};
