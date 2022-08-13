import type { LinkProps } from "components/Link";

import clsx from "clsx";
import Link from "components/Link";
import Logo from "components/Logo";
import MobileMenu from "components/MobileMenu";
import { useRouter } from "next/router";

const NavLink = ({ href, ...props }: LinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  const rootClassName = clsx(
    "hidden md:inline-block text-sm text-gray-500 hover:text-gray-600 mr-6",
    { "text-gray-600": isActive }
  );

  return <Link href={href} className={rootClassName} {...props} />;
};

const Navbar: React.FC = () => {
  return (
    <nav className="flex relative items-center justify-between w-full mx-auto pt-4 md:pt-8 pb-8 md:pb-16">
      <div className="flex items-end">
        <Logo />
        <NavLink href="/">Home</NavLink>
        <NavLink href="/posts">Posts</NavLink>
        <NavLink href="/about">About</NavLink>
      </div>
      <div>
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
