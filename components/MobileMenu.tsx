import type { LinkProps } from "components/Link";

import clsx from "clsx";
import Link from "components/Link";
import { MenuIcon, CloseIcon } from "components/Icons";
import { useEffect, useState } from "react";

const MobileNavLink = ({ href, className, ...props }: LinkProps) => {
  const rootClassName = clsx(
    "border-b border-gray-200 text-gray-900 w-full flex"
  );

  const linkClassName = clsx("py-4 w-full", className);

  return (
    <li className={rootClassName}>
      <Link href={href} className={linkClassName} {...props} />
    </li>
  );
};

const MobileMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button
        className="visible relative h-[29px] w-[29px] md:hidden"
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon className={clsx(isMenuOpen && "hidden")} />
        <CloseIcon className={clsx(!isMenuOpen && "hidden")} />
      </button>
      {isMenuOpen && (
        <ul className="w-full h-screen z-40 absolute left-0 bg-white pt-4">
          <MobileNavLink href="/">Home</MobileNavLink>
          <MobileNavLink href="/posts">Posts</MobileNavLink>
          <MobileNavLink href="/lists">Lists</MobileNavLink>
          <MobileNavLink href="/about">About</MobileNavLink>
          <MobileNavLink href="/contact">Contact</MobileNavLink>
        </ul>
      )}
    </>
  );
};

export default MobileMenu;
