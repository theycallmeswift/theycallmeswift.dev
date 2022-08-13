import Link from "components/Link";
import Image from "next/future/image";

const ShortBio: React.FC = () => (
  <div className="flex flex-col-reverse sm:flex-row items-start w-full justify-between pb-8">
    <div className="flex flex-col sm:pr-8">
      <h1 className="text-4xl sm:text-2xl font-bold mb-2">
        Hi there! You can call me Swift.
      </h1>
      <p className="prose">
        I&apos;m the CEO & Co-Founder of{" "}
        <Link href="http://mlh.io/">Major League Hacking (MLH)</Link> where
        I&apos;m helping the next generation of developers launch their careers.
      </p>
    </div>
    <Image
      alt="Mike Swift"
      height={375}
      width={375}
      quality={100}
      priority={true}
      src="/theycallmeswift-avatar.jpg"
      className="rounded-lg mb-4 sm:mb-0 w-10/12 md:w-36"
    />
  </div>
);
export default ShortBio;
