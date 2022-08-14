import type { Post } from "lib/types";
import type { GetServerSideProps } from "next";

import config from "config/site.json";
import RSS from "rss";
import { sanityClient } from "lib/sanity";

const Feed = () => null;

const fetchAllPosts = (): Promise<Post[]> => {
  const allPostsQuery = `
    *[_type == "post"] | order(publishDate desc, _updatedAt desc) {
      _id,
      title,
      publishDate,
      excerpt,
      coverImage,
      "slug": slug.current,
    }
  `;

  return sanityClient.fetch(allPostsQuery);
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await fetchAllPosts();
  const feed = new RSS({
    title: config.name,
    site_url: config.url,
    feed_url: config.feed,
  });

  posts.map((post) => {
    feed.item({
      title: post.title,
      url: `${config.url}/${post.slug}`,
      date: post.publishDate,
      description: post.excerpt,
      author: config.author,
    });
  });

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
};

export default Feed;
