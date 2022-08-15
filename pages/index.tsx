import type { NextPage, GetStaticProps } from "next";
import type { Post } from "lib/types";

import Container from "components/Container";
import PostSummary from "components/PostSummary";
import ShortBio from "components/ShortBio";
import DefaultLayout from "layouts/DefaultLayout";
import { getRecentPosts } from "lib/post";

const Home: NextPage = ({ posts }: { posts: Post[] }) => {
  return (
    <DefaultLayout>
      <ShortBio />

      <Container>
        <h2 className="text-lg font-bold mb-4 text-gray-500">Recent Posts</h2>
        <div className="space-y-12">
          {posts.map((post) => (
            <PostSummary post={post} key={post.slug} />
          ))}
        </div>
      </Container>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts: Post[] = await getRecentPosts({ limit: 3 });

  if (!posts) {
    return { notFound: true };
  }

  return {
    props: {
      posts,
    },
  };
};

export default Home;
