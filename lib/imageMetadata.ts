import type { ImageProps } from "next/future/image";
import type { Node } from "unist";

import imageSize from "image-size";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";
import { visit } from "unist-util-visit";

export interface ImageNode extends Node {
  type: "element";
  tagName: "img";
  properties: React.ImgHTMLAttributes<HTMLImageElement> & ImageProps;
}

const isImageNode = (node: Node) => {
  const img = node as ImageNode;

  return (
    img.type === "element" &&
    img.tagName === "img" &&
    img.properties &&
    typeof img.properties.src === "string"
  );
};

const imageToBuffer = async (src: string) => {
  const isExternal = src.startsWith("http");

  if (!isExternal) {
    return readFile(path.join(process.cwd(), "public", src));
  }

  const imageRes = await fetch(src);
  const arrayBuffer = await imageRes.arrayBuffer();

  return Promise.resolve(Buffer.from(arrayBuffer));
};

const addProps = async (node: ImageNode) => {
  const buffer = await imageToBuffer(node.properties.src);
  const size = imageSize(buffer);
  const { base64 } = await getPlaiceholder(buffer);

  node.properties.width = size.width;
  node.properties.height = size.height;

  node.properties.blurDataURL = base64;
  node.properties.placeholder = "blur";
};

const imageMetadata = () => {
  const transformer = async (tree: Node) => {
    const images: ImageNode[] = [];

    visit(tree, "element", (node: Node) => {
      if (isImageNode(node)) {
        images.push(node as ImageNode);
      }
    });

    for (const image of images) {
      await addProps(image);
    }

    return tree;
  };

  return transformer;
};

export default imageMetadata;
