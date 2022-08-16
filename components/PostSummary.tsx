import type { Post } from "lib/types";

import Link from "components/Link";
import { humanReadableDate } from "lib/helpers";

const PostSummary = ({ post }: { post: Post }) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-top justify-between w-full">
        <h3 className="text-2xl font-bold">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>
        <span className="text-gray-500 whitespace-nowrap">
          {humanReadableDate(post.publishDate)}
        </span>
      </div>
      <p className="prose">{post.excerpt}</p>
      <Link className="underline inline-block" href={`/posts/${post.slug}`}>
        Read More &rarr;
      </Link>
    </div>
  );
};

export default PostSummary;
