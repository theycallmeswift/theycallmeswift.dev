import type { HTMLAttributes } from "react";

import Link from "next/link";

export type FooterProps = HTMLAttributes<HTMLElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const FooterColumn = ({ children }) => {
  return <div className="flex flex-col space-y-4">{children}</div>;
};

const Copyright = () => (
  <p className="text-xs text-gray-400">
    &copy; 2012-present Mike Swift. All Rights Reserved.
  </p>
);

const FooterLink: React.FC<AnchorProps> = ({ href, children }) => {
  const className = "text-sm text-gray-500 hover:text-gray-600 transition";

  if (!href || href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href as string}>
        <a className={className}>{children}</a>
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full pt-16">
      <hr className="border-1 border-gray-200 mb-8" />
      <nav className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-10">
        <div className="col-span-2 sm:col-span-3 flex flex-col justify-between text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold">They call me Swift.</h4>
            <p className="text-sm italic">Thanks for reading!</p>
          </div>
          <div className="hidden sm:block">
            <Copyright />
          </div>
        </div>
        <FooterColumn>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/newsletter">Subscribe</FooterLink>
        </FooterColumn>
        <FooterColumn>
          <FooterLink href="https://github.com/theycallmeswift/">
            GitHub
          </FooterLink>
          <FooterLink href="https://www.linkedin.com/in/theycallmeswift/">
            LinkedIn
          </FooterLink>
          <FooterLink href="https://twitter.com/SwiftAlphaOne">
            Twitter
          </FooterLink>
        </FooterColumn>
        <div className="sm:hidden col-span-2 text-center">
          <Copyright />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
