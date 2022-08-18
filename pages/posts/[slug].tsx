import type { Post } from "lib/types";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { ImageProps } from "next/future/image";

import clsx from "clsx";
import Link from "components/Link";
import PostLayout from "layouts/PostLayout";
import imageMetadata from "lib/imageMetadata";
import { getPostSlugs, getPostBy } from "lib/post";
import NextImage from "next/future/image";
import { MDXRemote } from "next-mdx-remote";
import { serialize as serializeMDX } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const Image = ({
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & ImageProps) => {
  const rootClassName = clsx("w-full rounded-lg my-5 border border-gray-500");

  return <NextImage className={rootClassName} {...props} />;
};

const serializeMarkdown = (markdown: string) =>
  serializeMDX(markdown, {
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

const Post: NextPage = ({ post }: { post: Post }) => {
  const mdxComponents = {
    a: Link,
    img: Image,
  };

  return (
    <PostLayout post={post}>
      {post.contentType === "markdown" && (
        <MDXRemote {...post.html} components={mdxComponents} />
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

  const isMarkdown = post.contentType === "markdown";
  const raw = isMarkdown ? post.markdown : post.portabletext;
  const html = isMarkdown
    ? await serializeMarkdown(post.markdown)
    : await Promise.resolve(post.portabletext);

  return {
    props: {
      post: {
        ...post,
        raw,
        html,
      },
    },
  };
};

export default Post;
