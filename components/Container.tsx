import type { HTMLAttributes } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "components/Footer";

export type ContainerProps = HTMLAttributes<HTMLElement>;

type MetaProps = {
  site: {
    name: string;
    url: string;
    twitter: string;
  };
  title: string;
  description: string;
  image: string;
  type: "website";
  date?: string;
};

const Container: React.FC<ContainerProps> = ({ children, ...customMeta }) => {
  const router = useRouter();
  const meta: MetaProps = {
    site: {
      name: "theycallmeswift",
      url: "https://theycallmeswift.dev",
      twitter: "@SwiftAlphaOne",
    },
    title: "They call me Swift.",
    description:
      "The personal website and blog of a hacker, founder, and hackathon enthusiast.",
    image: "https://dummyimage.com/1200x630/fff/aaa", // TODO: Generate image
    type: "website",
    ...customMeta,
  };

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`${meta.site.url}${router.asPath}`} />
        <link rel="canonical" href={`${meta.site.url}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.site.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={meta.site.twitter} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <main className="flex flex-col justify-center items-start max-w-2xl mx-auto px-8 pb-16">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Container;
