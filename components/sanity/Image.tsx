import type { PortableTextTypeComponent } from "@portabletext/react";
import type { Image } from "@sanity/types";

import { getImageDimensions } from "@sanity/asset-utils";
import clsx from "clsx";
import { getImageUrls } from "lib/helpers";
import NextImage from "next/future/image";

type PortableTextImage = Image & {
  _type: "image";
};

const SanityImage: PortableTextTypeComponent<PortableTextImage> = ({
  value,
}) => {
  const { width, height } = getImageDimensions(value);
  const { src, blurDataURL } = getImageUrls(value);
  const rootClassName = clsx("w-full rounded-lg my-5 border border-gray-500");

  return (
    <NextImage
      src={src}
      className={rootClassName}
      placeholder="blur"
      blurDataURL={blurDataURL}
      width={width}
      height={height}
    />
  );
};

export default SanityImage;