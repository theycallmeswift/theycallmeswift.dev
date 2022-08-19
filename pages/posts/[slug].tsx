import type { Post } from "lib/types";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";

import SanityCode from "components/sanity/Code";
import SanityHeading from "components/sanity/Heading";
import SanityImage from "components/sanity/Image";
import SanityLink from "components/sanity/Link";
import PostLayout from "layouts/PostLayout";
import { getPostSlugs, getPostBy } from "lib/post";
import { PortableText, toPlainText } from "@portabletext/react";

const Post: NextPage = ({ post }: { post: Post }) => {
  const components = {
    types: {
      image: SanityImage,
      code: SanityCode,
    },
    marks: {
      link: SanityLink,
    },
    block: {
      h1: SanityHeading,
      h2: SanityHeading,
      h3: SanityHeading,
      h4: SanityHeading,
      h5: SanityHeading,
      h6: SanityHeading,
    },
  };

  return (
    <PostLayout post={post}>
      {post.content && (
        <PortableText value={post.content} components={components} />
      )}
    </PostLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = await getPostSlugs();

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const slug = params?.slug as string;
  const post: Post = await getPostBy({ slug, preview });

  if (!post) {
    return { notFound: true };
  }

  const raw = post.content ? toPlainText(post.content) : "";

  return {
    props: {
      post: {
        ...post,
        raw,
      },
    },
  };
};

export default Post;
