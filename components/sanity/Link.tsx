import type { PortableTextMarkComponent } from "@portabletext/react";

import Link from "components/Link";

type PortableTextLink = {
  _type: "link";
  href?: string;
};

const SanityLink: PortableTextMarkComponent<PortableTextLink> = ({
  value,
  children,
}) => {
  return <Link href={value?.href || ""}>{children}</Link>;
};

export default SanityLink;
