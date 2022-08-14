import type { HTMLAttributes } from "react";
import type { LinkProps } from "components/Link";

import config from "config/site.json";
import Link from "components/Link";

export type FooterProps = HTMLAttributes<HTMLElement>;

const FooterLink = ({ href, ...props }: LinkProps) => (
  <Link
    href={href}
    className="text-xs text-gray-500 hover:text-gray-600"
    {...props}
  />
);

const FooterColumn = ({ children }) => {
  return (
    <div className="flex flex-col text-center md:text-left space-y-4">
      {children}
    </div>
  );
};

const Copyright = () => (
  <p className="text-xs text-gray-500">
    &copy; 2012-present {config.site.author}. All Rights Reserved.
  </p>
);

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full pt-8 md:pt-16">
      <hr className="border-1 border-gray-200 mb-8" />
      <nav className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-10">
        <div className="col-span-2 md:col-span-3 flex flex-col justify-between text-center md:text-left">
          <div>
            <h1 className="text-lg font-bold">They call me Swift.</h1>
            <p className="text-sm italic">Thanks for reading!</p>
          </div>
          <div className="hidden md:block">
            <Copyright />
          </div>
        </div>
        <FooterColumn>
          <FooterLink href="/posts">Posts</FooterLink>
          <FooterLink href="/about">About</FooterLink>
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
        <div className="md:hidden col-span-2 text-center">
          <Copyright />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
