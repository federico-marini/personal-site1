import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Ensure MDX components mapping comes from `src/mdx-components.tsx`
  options: {
    providerImportSource: "@/mdx-components",
  },
});

const nextConfig: NextConfig = {
  // Allow `.mdx` files to be resolved as pages/routes
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default withMDX(nextConfig);
