import type { NextApiRequest, NextApiResponse } from "next";
import { getPostBy } from "lib/post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug as string;
  const secret = process.env.SANITY_PREVIEW_SECRET as string;

  if (!slug || (secret && req.query.secret !== secret)) {
    return res.status(401).json({ message: "Invalid request" });
  }

  const post = await getPostBy({ slug, preview: true });

  if (!post) {
    return res.status(404).json({ message: "Post with slug not found" });
  }

  res.setPreviewData({});
  res.writeHead(307, { Location: `/${post.slug}` });
  res.end();
};

export default handler;
