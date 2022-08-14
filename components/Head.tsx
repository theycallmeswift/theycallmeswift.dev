import type { HTMLAttributes } from "react";

import config from "config/site.json";
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

      <link
        rel="icon"
        type="image/x-icon"
        sizes="48x48"
        href="/favicons/favicon.ico"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/favicons/favicon-512x512.png"
      />

      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#ffffff"
      />
      <meta name="msapplication-TileColor" content="#b91d47" />
      <meta content="#ffffff" name="theme-color" />
    </NextHead>
  );
};

export default Head;
