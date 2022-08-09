import type { LinkProps } from "components/Link";

import clsx from "clsx";
import Link from "components/Link";
import { useRouter } from "next/router";

const NavLink = ({ href, ...props }: LinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  const rootClassName = clsx("text-sm text-gray-500 hover:text-gray-600 mr-6", {
    "text-gray-600": isActive,
  });

  return <Link href={href} className={rootClassName} {...props} />;
};

const Footer: React.FC = () => {
  return (
    <nav className="flex items-center justify-between w-full mx-auto pt-8 pb-16">
      <div>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/Subscribe">Contact</NavLink>
      </div>
      <div>&nbsp;</div>
    </nav>
  );
};

export default Footer;
