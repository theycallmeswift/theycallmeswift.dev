import type { GetServerSideProps } from "next";

import config from "config/site.json";
import RSS from "rss";
import { getRecentPosts } from "lib/post";

const Feed = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getRecentPosts();
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
