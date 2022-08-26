import Link from "components/Link";
import Image from "next/future/image";

const ShortBio: React.FC = () => (
  <div className="flex flex-col-reverse md:flex-row items-start w-full justify-between pb-8">
    <div className="flex flex-col md:pr-8">
      <h1 className="text-4xl md:text-2xl font-bold mb-2">
        Hi there! You can call me Swift.
      </h1>
      <p className="prose">
        I&apos;m the CEO & Co-Founder of{" "}
        <Link href="http://mlh.io/">Major League Hacking (MLH)</Link> where
        I&apos;m helping the next generation of developers launch their careers.
      </p>
    </div>
    <Link
      href="/about"
      className="mb-4 md:mb-0 shrink-0 w-36 hover:rotate-2 transition ease-in-out"
    >
      <Image
        alt="Mike Swift"
        height={375}
        width={375}
        quality={100}
        priority
        sizes="(min-width: 640px) 30vw, 20vw"
        src="/downloads/theycallmeswift-avatar.jpg"
        className="rounded-lg"
      />
    </Link>
  </div>
);
export default ShortBio;
