/// <reference types="vite/client" />

import type { SanityDocument, DocumentActionComponent, Slug } from "sanity";

type PostDraft = SanityDocument & {
  slug: Slug;
};

const EyeIcon = () => {
  const strokeStyle = { stroke: "currentColor", strokeWidth: "1.2" };

  return (
    <svg
      data-sanity-icon
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      width="1em"
      height="1em"
    >
      <path
        d="M12.5 7.5C8.5 7.5 6 10 4.5 12.5C6 15 8.5 17.5 12.5 17.5C16.5 17.5 19 15 20.5 12.5C19 10 16.5 7.5 12.5 7.5Z"
        style={strokeStyle}
      />
      <circle
        cx="12.5"
        cy="12.5"
        r="2.5"
        fill="currentColor"
        style={strokeStyle}
      />
    </svg>
  );
};

const PreviewAction: DocumentActionComponent = (props) => {
  const draft = props.draft as PostDraft;
  const defaultProps = {
    label: "Preview Draft",
    icon: EyeIcon,
    disabled: true,
  };

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
