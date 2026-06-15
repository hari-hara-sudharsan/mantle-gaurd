/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://mantleguard-backend.onrender.com',
        NEXT_PUBLIC_MOCK_BACKEND: process.env.NEXT_PUBLIC_MOCK_BACKEND || 'false',
    },
    async rewrites() {
        return [
            {
                source: '/api/backend/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://mantleguard-backend.onrender.com'}/:path*`,
            },
        ]
    },
};

export default nextConfig;
