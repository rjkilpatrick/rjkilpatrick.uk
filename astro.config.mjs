import { defineConfig } from "astro/config";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import remarkMath from "remark-math";

// https://astro.build/config
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
