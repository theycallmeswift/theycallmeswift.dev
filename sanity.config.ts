/// <reference types="vite/client" />

import type { SanityDocument, DocumentActionComponent, Slug } from "sanity";

import { createConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { markdownSchema } from "sanity-plugin-markdown";
import { EyeIcon } from "./components/Icons";

type PostDraft = SanityDocument & {
  slug: Slug;
};

const PreviewAction: DocumentActionComponent = (props) => {
  const defaultProps = {
    label: "Preview Draft",
    icon: EyeIcon,
    disabled: true,
  };
  const draft = props.draft as PostDraft;

  if (!draft || !draft.slug?.current) {
    return defaultProps;
  }

  const url = import.meta.env?.SANITY_STUDIO_PREVIEW_URL as string;
  const secret = import.meta.env?.SANITY_STUDIO_PREVIEW_SECRET as string;
  const previewUrl = `${url}/api/preview?secret=${secret}&slug=${draft.slug.current}`;
  const onHandle = () => window.open(previewUrl, "_blank");

  return {
    ...defaultProps,
    disabled: false,
    onHandle,
  };
};

export default createConfig({
  name: "default",
  title: "theycallmeswift.dev",
  projectId: "cg5yd6in",
  dataset: "production",
  plugins: [deskTool(), markdownSchema()],
  document: {
    actions: (prev) => prev.concat([PreviewAction]),
  },
  schema: {
    types: [
      {
        name: "post",
        type: "document",
        title: "Post",
        fields: [
          {
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
          },
          {
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: (rule) => rule.required(),
            options: {
              source: "title",
            },
          },
          {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            validation: (rule) => rule.required().max(255),
          },
          {
            name: "content",
            title: "Content",
            type: "markdown",
          },
          {
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            validation: (rule) => rule.required(),
          },
          {
            name: "publishDate",
            title: "Publish Date",
            type: "datetime",
            validation: (rule) => rule.required(),
          },
        ],
      },
    ],
  },
});
