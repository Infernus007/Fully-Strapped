// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const assetCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string(),
    img: z.string().default("theme.jpg"),
  }),
});

const layoutCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  assets: assetCollection,
  layouts: layoutCollection,
};
