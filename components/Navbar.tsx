import type { LinkProps } from "components/Link";

import clsx from "clsx";
import Link from "components/Link";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const [isHovering, setIsHovered] = useState(true);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setIsHovered(false), 2000);

    return () => {
      clearTimeout(logoTimer);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between w-full mx-auto pt-4 md:pt-8 pb-8 md:pb-16">
      <div className="flex items-end">
        <Link href="/" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {isHovering ? (
            <Image
              alt="Glider Logo"
              height={20}
              width={20}
              sizes="20vw"
              src="/logo.gif"
              className="inline-block mr-6"
            />
          ) : (
            <Image
              alt="Glider Logo"
              height={20}
              width={20}
              sizes="20vw"
              src="/logo.png"
              className="inline-block mr-6"
            />
          )}
        </Link>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/posts">Posts</NavLink>
        <NavLink href="/lists">Lists</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/Subscribe">Contact</NavLink>
      </div>
      <div>&nbsp;</div>
    </nav>
  );
};

export default Navbar;
