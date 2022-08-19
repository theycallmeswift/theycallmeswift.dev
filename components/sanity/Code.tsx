import type { PortableTextComponent } from "@portabletext/react";
import type { CodeInputValue } from "@sanity/code-input";

import clsx from "clsx";
import Link from "components/Link";
import Refractor from "react-refractor";
import slugify from "react-slugify";
import css from "refractor/lang/css";
import jsx from "refractor/lang/jsx";
import json from "refractor/lang/json";
import python from "refractor/lang/python";
import ruby from "refractor/lang/ruby";
import shell from "refractor/lang/shell-session";
import sql from "refractor/lang/sql";
import tsx from "refractor/lang/tsx";
import yaml from "refractor/lang/yaml";

Refractor.registerLanguage(css);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(json);
Refractor.registerLanguage(python);
Refractor.registerLanguage(ruby);
Refractor.registerLanguage(shell);
Refractor.registerLanguage(sql);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(yaml);

type PortableTextCode = CodeInputValue & {
  _key: string;
};

const SanityCode: PortableTextComponent<PortableTextCode> = ({ value }) => {
  const slug = value.filename ? slugify(value.filename) : value._key;
  const rootClassName = clsx(
    "code relative",
    value.filename ? "my-12" : "my-5"
  );

  return (
    <div className={rootClassName} id={slug}>
      {value.filename && (
        <span>
          <Link href={`#${slug}`}>{value.filename}</Link>
        </span>
      )}
      <Refractor
        className="my-0"
        language={value.language ?? "text"}
        value={value.code ?? ""}
        markers={value.highlightedLines}
      />
    </div>
  );
};

export default SanityCode;
