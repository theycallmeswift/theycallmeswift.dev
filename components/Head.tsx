import type { HTMLAttributes } from "react";

import NextHead from "next/head";
import { useRouter } from "next/router";

export type ContainerProps = HTMLAttributes<HTMLElement>;

type HeadProps = {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  publishDate?: string;
};

const config = {
  site: {
    name: "They call me Swift.",
    url: "https://theycallmeswift.dev",
    twitter: "@SwiftAlphaOne",
  },
  defaults: {
    description:
      "The personal website and blog of a hacker, founder, and hackathon enthusiast.",
    image: "https://dummyimage.com/1200x630/fff/aaa", // TODO: Generate image
    type: "website",
  },
};

const Head = ({ title, description, image, type, publishDate }: HeadProps) => {
  const router = useRouter();
  const titleWithSiteName = title
    ? `${title} - ${config.site.name}`
    : config.site.name;

  return (
    <NextHead>
      <title>{titleWithSiteName}</title>
      <meta
        content={description || config.defaults.description}
        name="description"
      />
      {publishDate && (
        <meta property="article:published_time" content={publishDate} />
      )}
      <link rel="canonical" href={`${config.site.url}${router.asPath}`} />

      <meta name="robots" content="follow, index" />
      <meta key="googlebot" name="googlebot" content="follow, index" />

      <meta property="og:type" content={type || config.defaults.type} />
      <meta property="og:site_name" content={config.site.name} />
      <meta property="og:title" content={titleWithSiteName} />
      <meta
        property="og:description"
        content={description || config.defaults.description}
      />
      <meta property="og:url" content={`${config.site.url}${router.asPath}`} />
      <meta property="og:image" content={image || config.defaults.image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={config.site.twitter} />
    </NextHead>
  );
};

export default Head;
