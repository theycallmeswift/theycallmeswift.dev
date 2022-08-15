import type { Image } from "@sanity/types";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type ListItem = {
  _id: string;
  order: number;
  title: string;
  subtitle?: string;
  description: string;
  html: MDXRemoteSerializeResult;
  purchaseUrl: string;
  image: Image;
  layout: "standard" | "fullWidth";
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  subtype: "standard" | "list";
  excerpt: string;
  content: string;
  html: MDXRemoteSerializeResult;
  items?: ListItem[];
  coverImage: Image;
  publishDate: string;
};
