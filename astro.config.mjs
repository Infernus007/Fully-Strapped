import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import addClasses from "rehype-add-classes";
// https://astro.build/config
const config = defineConfig({
  markdown: {
    rehypePlugins: [
      [
        addClasses,
        {
          h1: "text-4x1 font-bold font-mplus dark:text-white mb-2 text-red-200",
          h2: "text-2x1 font-bold font-mplus dark:text-white mb-2 mt-5",
          h3: "text-xl font-semibold font-mplus dark:text-white mt-5 mb-1",
          h4: "text-lg font-bold dark:text-white font-mplus",
          h5: "font-bold font-plus dark:text-white",
          h6: "font-bold font-mplus dark:text-white",
          img: "border border-slate-300 dark:border-zinc-708 rounded-x1 mb-6",
          p: "mb-6",
          a: "underline underline-offset-2 hover: text-orange-500 decoration-orange-500",
          pre: "rounded p-4 bg-red-200 max-h-[200px] overflow-scroll",
        },
      ],
    ],
  },

  integrations: [
    tailwind(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "dracula" },
      remarkRehype: { footnoteLabel: "Footnotes" },
      gfm: false,
      optimize: true,
    }),
  ],
});

export default config;
