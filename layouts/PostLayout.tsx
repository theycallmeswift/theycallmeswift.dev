import type { Post } from "lib/types";

import Container from "components/Container";
import Footer from "components/Footer";
import Head from "components/Head";
import Navbar from "components/Navbar";
import { urlForImage, humanReadableDate } from "lib/sanity";
import Image from "next/future/image";
import { Suspense } from "react";
import readingTime from "reading-time";

interface PostLayoutProps {
  children?: React.ReactNode;
  post: Post;
}

const PostLayout = ({ children, post }: PostLayoutProps) => {
  const readingTimeText = readingTime(post.content).text;

  return (
    <Suspense>
      <Head
        title={post.title}
        description={post.excerpt}
        type="article"
        image={urlForImage(post.coverImage).url()}
        publishDate={new Date(post.publishDate).toISOString()}
      />
      <Container className="px-4 md:px-8 pb-8 md:pb-16">
        <Navbar />
        <article className="w-full relative">
          <h1 className="mb-4 text-3xl text-black font-bold">{post.title}</h1>
          <div className="flex flex-row">
            <div>
              <Image
                alt="Mike Swift"
                height={45}
                width={45}
                sizes="20vw"
                src="/avatar.jpg"
                className="rounded-full mr-2 max-w-[45px] md:max-w-[24px]"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full">
              <p className="text-sm">Mike Swift</p>
              <p className="text-sm text-gray-500">
                {humanReadableDate(post.publishDate)} • {readingTimeText}
              </p>
            </div>
          </div>
          <div className="mt-6 prose">{children}</div>
        </article>
        <Footer />
      </Container>
    </Suspense>
  );
};

export default PostLayout;
