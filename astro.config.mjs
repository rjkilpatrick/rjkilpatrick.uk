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
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://rjkilpatrick.github.io",
  integrations: [
    mdx(),
    react(),
    sitemap({
      customPages: ["https://rjkilpatrick.github.io/virtual-window/"],
    }),
    prefetch(),
  ],
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "dracula"
    },
  },
});
