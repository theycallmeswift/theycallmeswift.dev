import { createConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { markdownSchema } from "sanity-plugin-markdown";

export default createConfig({
  name: "default",
  title: "theycallmeswift.dev",
  projectId: "cg5yd6in",
  dataset: "production",
  plugins: [deskTool(), markdownSchema()],
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
            name: "subtype",
            title: "Post Type",
            type: "string",
            initialValue: "standard",
            options: {
              list: ["standard", "list"],
            },
            validation: (rule) => rule.required(),
          },
          {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            validation: (rule) => rule.required(),
          },
          {
            name: "content",
            title: "Content",
            type: "markdown",
          },
          {
            name: "items",
            title: "List Items",
            type: "array",
            of: [{ type: "reference", to: [{ type: "list_item" }] }],
            hidden: ({ document }) => document?.subtype != "list",
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

      {
        name: "list_item",
        type: "document",
        title: "List Item",
        fields: [
          {
            name: "order",
            title: "List Order",
            type: "number",
            validation: (rule) => [rule.required(), rule.min(1)],
          },
          {
            name: "title",
            title: "Item Title",
            type: "string",
            validation: (rule) => rule.required(),
          },
          {
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            hidden: ({ document }) => !document?.title,
          },
          {
            name: "description",
            title: "Description",
            type: "text",
            validation: (rule) => rule.required(),
          },
          {
            name: "purchaseUrl",
            title: "URL",
            type: "url",
          },
          {
            name: "image",
            title: "Image",
            type: "image",
            validation: (rule) => rule.required(),
          },
        ],
      },
    ],
  },
});
