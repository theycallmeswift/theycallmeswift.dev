import type { ImageProps } from "next/future/image";

import clsx from "clsx";
import Image from "next/future/image";

// export type RoundedImageProps = ImageProps;
export type RoundedImageProps = React.ImgHTMLAttributes<HTMLImageElement> &
  ImageProps;

const RoundedImage = ({ alt = "", className, ...props }: RoundedImageProps) => {
  const rootClassName = clsx(
    "w-full rounded-lg my-5 border border-gray-500",
    className
  );

  return <Image alt={alt} className={rootClassName} {...props} />;
};

export default RoundedImage;
