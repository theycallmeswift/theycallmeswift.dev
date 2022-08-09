import type { NextPage } from "next";

import DefaultLayout from "layouts/DefaultLayout";
import Image from "next/future/image";
import Link from "components/Link";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col-reverse sm:flex-row items-start w-full justify-between">
        <div className="flex flex-col sm:pr-8">
          <h1 className="text-4xl sm:text-2xl font-bold mb-2">
            Hi there, you can call me Swift.
          </h1>
          <p className="">
            I&apos;m the CEO & Co-Founder of{" "}
            <Link href="http://mlh.io/">Major League Hacking (MLH)</Link> where
            I&apos;m helping the next generation of developers launch their
            careers.
          </p>
        </div>
        <Image
          alt="Mike Swift"
          height={175}
          width={175}
          sizes="20vw"
          src="/avatar.jpg"
          className="rounded-lg mb-4 sm:mb-0"
        />
      </div>
    </DefaultLayout>
  );
};

export default Home;
