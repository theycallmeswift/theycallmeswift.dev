import type { NextPage, GetStaticProps } from "next";
import type { Post } from "lib/types";

import Container from "components/Container";
import Link from "components/Link";
import PostSummary from "components/PostSummary";
import DefaultLayout from "layouts/DefaultLayout";
import { sanityClient } from "lib/sanity";

const RSSIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mb-1 fill-gray-500 hover:fill-gray-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
    <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
  </svg>
);

const Posts: NextPage = ({ posts }: { posts: Post[] }) => {
  return (
    <DefaultLayout>
      <Container>
        <div className="space-y-8">
          <div className="flex flex-row justify-between items-end border-b border-gray-200 mb-8">
            <h1 className="text-3xl font-bold">All Posts</h1>
            <Link href="/feed.xml" target="_blank">
              <RSSIcon />
            </Link>
          </div>
          {posts.map((post) => (
            <PostSummary post={post} key={post.slug} />
          ))}
        </div>
      </Container>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recentPostsQuery = `
    *[_type == "post"] | order(publishDate desc, _updatedAt desc) {
      content,
      _id,
      title,
      publishDate,
      excerpt,
      coverImage,
      "slug": slug.current,
    }`;

  const posts: Post[] = await sanityClient.fetch(recentPostsQuery);

  if (!posts) {
    return { notFound: true };
  }

  return {
    props: {
      posts,
    },
  };
};

export default Posts;
