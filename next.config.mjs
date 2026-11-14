const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = isDev
  ? {
      // Rewrites can't be used with a static export, so dev skips the export
      // and proxies /api/* to the local auth server (`npm run auth:local`).
      async rewrites() {
        return [{ source: "/api/:path*", destination: `http://localhost:${process.env.AUTH_PORT ?? 8787}/api/:path*` }];
      },
    }
  : { output: "export" };

export default nextConfig;
