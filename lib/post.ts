import type { Image } from "@sanity/types";

import sanityConfig from "config/sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const urlForImage = (source: Image) =>
  createImageUrlBuilder(sanityConfig).image(source).auto("format").fit("max");

export const humanReadableDate = (source: string) =>
  new Date(source).toLocaleString("en-us", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
