import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from "lib/types";

import { mdxToHTML, mdxComponents } from "lib/mdx";
import PostLayout from "layouts/PostLayout";
import { sanityClient } from "lib/sanity";
import { MDXRemote } from "next-mdx-remote";

const Post: NextPage = ({ post }: { post: Post }) => {
  return (
    <PostLayout post={post}>
      <MDXRemote {...post.html} components={mdxComponents} />
    </PostLayout>
  );
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

  const html = await mdxToHTML(post.content);

  return {
    props: {
      post: {
        ...post,
        html,
      },
    },
  };
};

export default Post;
