import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig: NextConfig = {
  /* config options here */

  // Enable standalone output for Docker deployment
  output: 'standalone',
};

/**
 * https://fumadocs.dev/docs/ui/manual-installation
 * https://fumadocs.dev/docs/mdx/plugin
 */
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};
withMDX(config);

export default withMDX(nextConfig);
