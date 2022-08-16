import type { NextApiRequest, NextApiResponse } from "next";
import type { Post } from "lib/types";

import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readBody = async (readable: NextApiRequest) => {
  const chunks: Buffer[] = [];

  for await (const chunk of readable) {
    if (typeof chunk === "string") {
      chunks.push(Buffer.from(chunk));
    } else {
      chunks.push(chunk as Buffer);
    }
  }

  return Buffer.concat(chunks).toString("utf8");
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string;
  const secret = process.env.SANITY_STUDIO_REVALIDATE_SECRET as string;
  const body = await readBody(req);

  if (!signature || !isValidSignature(body, signature, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }

  try {
    const { slug } = JSON.parse(body) as Post;

    if (typeof slug !== "string" || !slug) {
      console.log(body);
      return res.status(400).json({ message: "Invalid slug" });
    }

    await Promise.all([
      res.revalidate("/"),
      res.revalidate("/posts"),
      res.revalidate(`/${slug}`),
    ]);

    return res.status(200).json({ message: `Updated ${slug}` });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";

    return res.status(500).json({ message });
  }
};

export default handler;
