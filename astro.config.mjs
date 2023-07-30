import { defineConfig } from "astro/config";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import remarkMath from "remark-math";

// https://astro.build/config
import rehypeKatex from "rehype-katex";

// https://astro.build/config
import rehypeSlug from "rehype-slug";

// https://astro.build/config
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://rjkilpatrick.uk",
  base: "",
  integrations: [
    mdx(),
    react(),
    sitemap({
      customPages: ["https://rjkilpatrick.uk/virtual-window"],
    }),
    prefetch(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeSlug, rehypeAutolinkHeadings],
    remarkRehype: {
      footnoteLabel: "References",
    },
    shikiConfig: {
      theme: "dracula",
    },
  },
});
