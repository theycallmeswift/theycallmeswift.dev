import type { GetServerSideProps } from "next";

import config from "config/site.json";
import { getPostSlugs } from "lib/post";

const Sitemap = () => null;

const generateSitemap = (slugs: string[]) => {
  const urls = slugs.map((slug) => {
    return `<url><loc>${config.url}/${slug}</loc></url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join("\n")}
      </urlset>
  `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getPostSlugs();
  const pages = [...posts, "", "posts", "about"];

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  res.write(generateSitemap(pages));
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
