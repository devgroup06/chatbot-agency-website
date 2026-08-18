/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → plain HTML/CSS/JS in /out, deployable to Hostinger shared hosting.
  output: 'export',
  // Folder-per-page URLs (/about/ → /about/index.html) so Apache serves them directly.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
