import type { NextPage, GetStaticProps } from "next";
import type { Post } from "lib/types";

import Container from "components/Container";
import Link from "components/Link";
import { RSSIcon } from "components/Icons";
import PostSummary from "components/PostSummary";
import DefaultLayout from "layouts/DefaultLayout";
import { sanityClient } from "lib/sanity";

const Posts: NextPage = ({ posts }: { posts: Post[] }) => {
  return (
    <DefaultLayout>
      <Container>
        <div className="space-y-8">
          <div className="flex flex-row justify-between items-end border-b border-gray-200 mb-8">
            <h1 className="text-3xl font-bold">All Posts</h1>
            <Link href="/feed.xml" target="_blank">
              <RSSIcon className="mb-1 fill-gray-500 hover:fill-gray-600" />
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
