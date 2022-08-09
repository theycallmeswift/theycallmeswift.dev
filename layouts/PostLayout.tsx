import type { Post } from "lib/types";

import Container from "components/Container";
import Footer from "components/Footer";
import Head from "components/Head";
import { urlForImage } from "lib/sanity";
import Image from "next/future/image";
import { Suspense } from "react";
import readingTime from "reading-time";

interface PostLayoutProps {
  children?: React.ReactNode;
  post: Post;
}

const PostLayout = ({ children, post }: PostLayoutProps) => {
  const readingTimeText = readingTime(post.content).text;
  const humanReadableDate = new Date(post.publishDate).toLocaleString("en-us", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });

  return (
    <Suspense>
      <Head
        title={post.title}
        description={post.excerpt}
        type="article"
        image={urlForImage(post.coverImage).url()}
        publishDate={new Date(post.publishDate).toISOString()}
      />
      <Container>
        <article className="w-full">
          <h1 className="mb-4 text-3xl text-black">{post.title}</h1>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Image
                alt="Mike Swift"
                height={24}
                width={24}
                sizes="20vw"
                src="/avatar.jpg"
                className="rounded-full"
              />
              <p className="text-sm ml-2 text-gray-700">
                Mike Swift • {humanReadableDate}
              </p>
            </div>
            <p className="text-sm text-gray-700">{readingTimeText}</p>
          </div>
          <div className="mt-6 prose">{children}</div>
        </article>
        <Footer />
      </Container>
    </Suspense>
  );
};

export default PostLayout;
