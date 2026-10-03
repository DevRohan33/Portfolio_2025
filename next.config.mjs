/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      // The site moved from rohanparveag.online to rohanparveag.in. While the old
      // domain still points here, send every path to the same path on the new one
      // (permanent, so search engines transfer rankings). Also folds www into the apex.
      ...["rohanparveag.online", "www.rohanparveag.online", "www.rohanparveag.in"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host", value: host }],
        destination: "https://rohanparveag.in/:path*",
        permanent: true,
      })),
      // MyLedger was renamed RYBO in v1.3.0; keep old links and search results working.
      { source: "/work/myledger", destination: "/work/rybo", permanent: true },
    ];
  },
};

export default nextConfig;
