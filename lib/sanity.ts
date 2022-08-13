import sanityConfig from "config/sanity";
import { createClient } from "next-sanity";

export const sanityClient = createClient(sanityConfig);
