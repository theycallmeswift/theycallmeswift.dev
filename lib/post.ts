import type { Post } from "lib/types";

import { getClient } from "lib/sanity";

export const getPostBy = ({
  preview = false,
  slug,
}: {
  preview?: boolean;
  slug: string;
}): Promise<Post> => {
  const sanityClient = getClient(preview);
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
  preview = false,
  limit,
}: {
  preview?: boolean;
  limit?: number;
} = {}): Promise<Post[]> => {
  const sanityClient = getClient(preview);
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

export const getPostSlugs = ({ preview = false } = {}): Promise<string[]> => {
  const sanityClient = getClient(preview);
  const query = '*[_type == "post" && defined(slug.current)][].slug.current';

  return sanityClient.fetch(query);
};
