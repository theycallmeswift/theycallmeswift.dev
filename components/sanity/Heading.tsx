import type { PortableTextBlockComponent } from "@portabletext/react";
import type { ElementType } from "react";

import Link from "components/Link";
import slugify from "react-slugify";

const SanityHeading: PortableTextBlockComponent = ({ value, children }) => {
  const el = value?.style || "h1";
  const Component = el as ElementType;
  const slug = slugify(children);

  return (
    <Component id={slug}>
      <Link href={`#${slug}`} className="anchor">
        <span className="icon icon-link"></span>
      </Link>
      {children}
    </Component>
  );
};

export default SanityHeading;
