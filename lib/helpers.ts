import type { Image } from "@sanity/types";

import sanityConfig from "config/sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const getImageUrls = (
  source: Image
): { src: string; blurDataURL: string } => {
  const builder = createImageUrlBuilder(sanityConfig)
    .image(source)
    .auto("format")
    .fit("max");

  return {
    src: builder.url(),
    blurDataURL: builder.quality(30).blur(50).url(),
  };
};

export const humanReadableDate = (source: string) =>
  new Date(source).toLocaleString("en-us", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
