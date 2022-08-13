import type { NextPage, GetStaticProps } from "next";
import type { Post } from "lib/types";

import Container from "components/Container";
import Link from "components/Link";
import PostSummary from "components/PostSummary";
import DefaultLayout from "layouts/DefaultLayout";
import { sanityClient } from "lib/sanity";
import Image from "next/future/image";

const Home: NextPage = ({ posts }: { posts: Post[] }) => {
  return (
    <DefaultLayout>
      <div className="flex flex-col-reverse sm:flex-row items-start w-full justify-between pb-8">
        <div className="flex flex-col sm:pr-8">
          <h1 className="text-4xl sm:text-2xl font-bold mb-2">
            Hi there! You can call me Swift.
          </h1>
          <p className="prose">
            I&apos;m the CEO & Co-Founder of{" "}
            <Link href="http://mlh.io/">Major League Hacking (MLH)</Link> where
            I&apos;m helping the next generation of developers launch their
            careers.
          </p>
        </div>
        <Image
          alt="Mike Swift"
          height={375}
          width={375}
          sizes="20vw"
          src="/avatar.jpg"
          className="rounded-lg mb-4 sm:mb-0 w-full md:w-44"
        />
      </div>

      <Container>
        <h2 className="text-lg font-bold mb-4">Recent Posts</h2>
        <div className="space-y-8">
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
    *[_type == "post"] | order(publishDate desc, _updatedAt desc) [0...3] {
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

export default Home;
