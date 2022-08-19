import type { Image } from "@sanity/types";
import type { PortableTextBlock } from "@portabletext/types";

export interface Post {
  _id: string;
  slug: string;
  title: string;
  publishDate: string;
  excerpt: string;
  coverImage: Image;
  content?: PortableTextBlock[];
  raw: string;
}

export default Post;
