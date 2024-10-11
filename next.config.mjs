/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "img.clerk.com"
            },
            {
                protocol: "https",
                hostname: "bold-raven-23.convex.cloud"
            }
        ]
    }
}

export default nextConfig
