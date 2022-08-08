import type { NextPage } from "next";

import { Suspense } from "react";
import Container from "components/Container";
import { sanityClient } from "lib/sanity-server";

const postFields = `
  _id,
  title,
  publishDate,
  excerpt,
  coverImage,
  "slug": slug.current,
`;

const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  }
}`;

const Post: NextPage = ({ post }) => {
  return (
    <Suspense>
      <Container>{JSON.stringify(post)}</Container>
    </Suspense>
  );
};

export const getStaticPaths = async () => {
  const paths: string[] = await sanityClient.fetch(
    '*[_type == "post" && defined(slug.current)][].slug.current'
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { post } = await sanityClient.fetch(postQuery, {
    slug: params.slug,
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

export default Post;
