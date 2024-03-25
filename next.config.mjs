/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dkm37niwh",
        NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "nu7coewz"
    },
    images: {
        domains: ["res.cloudinary.com", "utfs.io"],
    },
};

export default nextConfig;
