import type { ListItem as ListItemType } from "lib/types";

import clsx from "clsx";
import Link from "components/Link";
import { urlForImage } from "lib/post";
import Image from "next/future/image";

const ListItem = ({
  title,
  subtitle,
  purchaseUrl,
  description,
  image,
  layout = "standard",
}: ListItemType) => {
  const standardLayout = layout == "standard";
  const rootClassName = clsx(
    "flex flex-col",
    standardLayout && "sm:flex-row sm:space-x-6"
  );

  return (
    <div className={rootClassName}>
      <div className="sm:basis-1/4 mb-6">
        <Link href={purchaseUrl}>
          <div className="aspect-w-16 aspect-h-9 relative w-full h-full overflow-hidden">
            <Image
              src={urlForImage(image).url()}
              alt={title}
              fill
              className="object-contain sm:object-left-top"
            />
          </div>
        </Link>
      </div>
      <div className="space-y-5">
        <h3 className="text-lg font-bold">
          <Link href={purchaseUrl}>{title}</Link>
        </h3>
        {subtitle && <span className="text-gray-500">{subtitle}</span>}
        <p className="prose">{description}</p>
        <Link className="underline inline-block " href={purchaseUrl}>
          Learn More &rarr;
        </Link>
      </div>
    </div>
  );
};

export default ListItem;
