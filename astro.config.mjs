import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import addClasses from "rehype-add-classes";
import compressor from "astro-compressor";

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
          pre: " p-4  break-words max-h-[550px]",
        },
      ],
    ],
  },
  integrations: [
    tailwind(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "material-theme-lighter",
      },
      remarkRehype: {
        footnoteLabel: "Footnotes",
      },
      gfm: false,
      optimize: true,
    }),

    compressor({ gzip: true, brotli: false }),
  ],
});

// https://astro.build/config
export default defineConfig(config);
