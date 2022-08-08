import type { Image } from "@sanity/types";

import createImageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV !== "production",
  apiVersion: "2021-10-21",
};

export const sanityClient = createClient(sanityConfig);

export const urlForImage = (source: Image) =>
  createImageUrlBuilder(sanityClient).image(source).auto("format").fit("max");
