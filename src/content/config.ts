// 1. Import utilities from `astro:content`
import { z, defineCollection, getCollection } from "astro:content";

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

//element's order matter , it should be same as the order defined in `collections` object above
const collectionIcons = [
  '<i class="fa-solid fa-cube"></i>',
  // '<i class="fa-regular fa-map"></i>',
];

// const collectionNames = Object.keys(collections);

const collectionNames = ["assets"];

export const collectionObj: { name: string; icon: string }[] =
  collectionNames.map((name, index) => ({
    name,
    icon: collectionIcons[index],
  }));
