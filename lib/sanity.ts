import sanityConfig from "config/sanity";
import { createClient } from "next-sanity";

export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const getClient = (preview: boolean) =>
  preview ? previewClient : sanityClient;
