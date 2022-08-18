import type { Image } from "@sanity/types";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface BasePost {
  _id: string;
  slug: string;
  title: string;
  publishDate: string;
  excerpt: string;
  coverImage: Image;
  raw: string;
}

type MarkdownPost = BasePost & {
  contentType: "markdown";
  markdown: string;
  html: MDXRemoteSerializeResult;
};

type PortableTextPost = BasePost & {
  contentType: "portabletext";
  portabletext: string;
  html: string;
};

export type Post = MarkdownPost | PortableTextPost;
