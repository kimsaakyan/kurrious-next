/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    ssr: false,
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/api/:path*',
                    destination: `http://localhost:8080/:path*`,
                },
            ],
        }
    },
}

module.exports = nextConfig
