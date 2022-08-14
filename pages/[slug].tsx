import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { Post } from "lib/types";

import Link from "components/Link";
import RoundedImage from "components/RoundedImage";
import PostLayout from "layouts/PostLayout";
import { sanityClient } from "lib/sanity";
import imageMetadata from "lib/imageMetadata";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const Post: NextPage = ({ post }: { post: Post }) => {
  const mdxComponents = {
    a: Link,
    img: RoundedImage,
  };

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

  const html = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        imageMetadata,
        rehypeSlug,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
      format: "mdx",
    },
  });

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
