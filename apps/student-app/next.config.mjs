/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@camnextgen/ui', '@camnextgen/lib', '@camnextgen/types', '@camnextgen/i18n']
};

export default nextConfig;
