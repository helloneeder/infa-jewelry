import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // basePath 已移除，V1 走根路径部署
};

export default nextConfig;
