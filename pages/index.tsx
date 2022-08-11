import type { NextPage, GetStaticProps } from "next";
import type { Post } from "lib/types";

import DefaultLayout from "layouts/DefaultLayout";
import { sanityClient, humanReadableDate } from "lib/sanity";
import Image from "next/future/image";
import Container from "components/Container";
import Link from "components/Link";

const PostSummary = ({ post }: { post: Post }) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-row items-center justify-between w-full">
        <h3 className="text-2xl font-bold">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h3>
        <span>{humanReadableDate(post.publishDate)}</span>
      </div>
      <p className="prose">{post.excerpt}</p>
      <Link className="underline inline-block" href={`/${post.slug}`}>
        Read More &rarr;
      </Link>
    </div>
  );
};

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
          height={175}
          width={175}
          sizes="20vw"
          src="/avatar.jpg"
          className="rounded-lg mb-4 sm:mb-0"
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
  const indexQuery = `
    *[_type == "post"] | order(date desc, _updatedAt desc) {
      content,
      _id,
      title,
      publishDate,
      excerpt,
      coverImage,
      "slug": slug.current,
    }`;

  const posts: Post[] = await sanityClient.fetch(indexQuery);

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
