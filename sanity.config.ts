/// <reference types="vite/client" />

import PreviewAction from "./components/sanity/PreviewAction";
import config from "./config/site.json";
import { createConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { codeInput } from "@sanity/code-input";

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID as string;
const dataset = import.meta.env.SANITY_STUDIO_DATASET as string;

export default createConfig({
  name: "default",
  title: config.name,
  projectId,
  dataset,
  plugins: [deskTool(), codeInput()],
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
            type: "array",
            of: [
              { type: "block" },
              {
                type: "image",
                fields: [
                  {
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                  },
                  {
                    name: "priority",
                    title: "Priority Load",
                    type: "boolean",
                    initialValue: false,
                  },
                ],
              },
              {
                type: "code",
                options: {
                  withFilename: true,
                  language: "text",
                  languageAlternatives: [
                    { title: "CSS", value: "css" },
                    { title: "HTML", value: "html" },
                    { title: "JavaScript", value: "jsx" },
                    { title: "JSON", value: "json" },
                    { title: "Python", value: "python" },
                    { title: "Ruby", value: "ruby" },
                    { title: "Shell", value: "shell-session" },
                    { title: "SQL", value: "sql" },
                    { title: "TypeScript", value: "tsx" },
                    { title: "YAML", value: "yaml" },
                    { title: "Unknown", value: "text" },
                  ],
                },
              },
            ],
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
