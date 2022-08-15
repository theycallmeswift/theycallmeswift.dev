import type { Post } from "lib/types";

import { sanityClient } from "lib/sanity";

export const getPostBy = ({ slug }: { slug: string }): Promise<Post> => {
  const query = `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
      content,
      _id,
      title,
      publishDate,
      excerpt,
      coverImage,
      "slug": slug.current,
    }`;

  return sanityClient.fetch(query, { slug });
};

export const getRecentPosts = ({
  limit,
}: {
  limit?: number;
} = {}): Promise<Post[]> => {
  const limitQuery = limit ? `[0...${limit}]` : "";
  const query = `
    *[_type == "post"] | order(publishDate desc, _updatedAt desc) ${limitQuery} {
      _id,
      title,
      publishDate,
      excerpt,
      coverImage,
      "slug": slug.current,
    }`;

  return sanityClient.fetch(query);
};

export const getPostSlugs = (): Promise<string[]> => {
  const query = '*[_type == "post" && defined(slug.current)][].slug.current';

  return sanityClient.fetch(query);
};
