/// <reference types="vite/client" />

import PreviewAction from "./lib/studio/PreviewAction";
import { createConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { markdownSchema } from "sanity-plugin-markdown";

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
            name: "contentType",
            title: "Content Type",
            type: "string",
            initialValue: "portabletext",
            options: {
              list: [
                { title: "Rich Text", value: "portabletext" },
                { title: "Markdown", value: "markdown" },
              ],
            },
          },
          {
            name: "markdown",
            title: "Content",
            type: "markdown",
            hidden: ({ document }) => document?.contentType !== "markdown",
          },
          {
            name: "portabletext",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
            hidden: ({ document }) => document?.contentType !== "portabletext",
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
