import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from "lib/types";

import PostLayout from "layouts/PostLayout";
import { sanityClient } from "lib/sanity";

const Post: NextPage = ({ post }: { post: Post }) => {
  return <PostLayout post={post}>{post.content}</PostLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostSlugsQuery =
    '*[_type == "post" && defined(slug.current)][].slug.current';
  const paths: string[] = await sanityClient.fetch(allPostSlugsQuery);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postBySlugQuery = `{
    "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
      content,
      _id,
      title,
      publishDate,
      excerpt,
      coverImage,
      "slug": slug.current,
    }
  }`;

  const { post }: { post: Post } = await sanityClient.fetch(postBySlugQuery, {
    slug: params?.slug,
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

export default Post;
