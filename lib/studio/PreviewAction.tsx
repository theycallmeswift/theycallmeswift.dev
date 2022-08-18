/// <reference types="vite/client" />

import type { SanityDocument, DocumentActionComponent, Slug } from "sanity";

import { EyeIcon } from "../../components/Icons";

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

export default PreviewAction;
