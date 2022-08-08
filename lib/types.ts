import type { Image } from "@sanity/types";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Post = {
  _id: string;
  slug: string;
  title: string;
  content: string;
  html: MDXRemoteSerializeResult;
  publishDate: string;
  excerpt: string;
  coverImage: Image;
};
