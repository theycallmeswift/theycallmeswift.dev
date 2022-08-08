import type { Image } from "@sanity/types";

export type Post = {
  _id: string;
  slug: string;
  content: string;
  title: string;
  publishDate: string;
  excerpt: string;
  coverImage: Image;
};
