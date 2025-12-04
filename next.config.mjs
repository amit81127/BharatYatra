/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.news18.com" },
      { protocol: "https", hostname: "img.etimg.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "static.toiimg.com" },
      { protocol: "https", hostname: "www.holidify.com" },
      { protocol: "https", hostname: "tds.indianeagle.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "tse3.mm.bing.net" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "img.clerk.com" }
    ],
  },
};

export default nextConfig;
