import Link from "components/Link";
import Image from "next/future/image";
import { useEffect, useState } from "react";

const Logo: React.FC = () => {
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
    <Link href="/" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {isHovering ? (
        <Image
          alt="Glider Logo"
          height={20}
          width={20}
          sizes="20vw"
          src="/logo.gif"
          className="inline-block mr-6"
          priority
        />
      ) : (
        <Image
          alt="Glider Logo"
          height={20}
          width={20}
          sizes="20vw"
          src="/logo.png"
          className="inline-block mr-6"
          priority
        />
      )}
    </Link>
  );
};

export default Logo;
