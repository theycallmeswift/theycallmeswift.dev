import clsx from "clsx";
import NextLink from "next/link";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: React.FC<LinkProps> = ({ href, children, className, ...props }) => {
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
  const rootClassName = clsx("transition", className);

  if (isInternal) {
    return (
      <NextLink href={href} passHref>
        <a className={rootClassName} {...props}>
          {children}
        </a>
      </NextLink>
    );
  } else {
    return (
      <a
        href={href}
        className={rootClassName}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }
};

export default Link;
