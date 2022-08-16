import type { NextPage } from "next";

import Container from "components/Container";
import Link from "components/Link";
import ShortBio from "components/ShortBio";
import config from "config/site.json";
import DefaultLayout from "layouts/DefaultLayout";
import { trackEvent } from "lib/analytics";
import Image from "next/future/image";

const ImageThumbnail = ({ src }: { src: string }) => {
  const filename = src.split(".")[0];
  const trackDownload = () =>
    trackEvent("headshot_downloaded", {
      event_category: "Resources",
      event_label: filename,
    });

  return (
    <Link
      href={`/downloads/${src}`}
      download={filename}
      target="_blank"
      onClick={trackDownload}
    >
      <Image
        alt="Mike Swift"
        height={375}
        width={375}
        quality={100}
        src={`/downloads/${src}`}
        className="rounded-lg my-0"
      />
    </Link>
  );
};

const About: NextPage = () => {
  return (
    <DefaultLayout title="About">
      <Container>
        <ShortBio />

        <div className="prose">
          <h3>Links</h3>
          <ul>
            <li>
              <strong>Website:</strong>{" "}
              <Link href={config.url}>theycallmeswift.dev</Link>
            </li>
            <li>
              <strong>Twitter:</strong>{" "}
              <Link href="https://twitter.com/SwiftAlphaOne">
                @SwiftAlphaOne
              </Link>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <Link href="https://github.com/theycallmeswift/">
                @theycallmeswift
              </Link>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <Link href="https://www.linkedin.com/in/theycallmeswift/">
                /in/theycallmeswift
              </Link>
            </li>
          </ul>

          <h3>Bio</h3>
          <blockquote>
            Meet Swift – once an aspiring lawyer who entered the world of tech
            after attending his first hackathon. Now the CEO and Co-Founder of
            Major League Hacking (MLH), Swift is on a mission to empower the
            next generation of technologists. Every year, more than 100,000
            developers around the world join the MLH community to learn
            practical skills through hands-on educational programs like
            hackathons and Open Source software fellowships where they gain
            real-world technical experience, build connections with employers,
            and ultimately launch their careers. Swift’s expertise lies in
            software engineering and in building and scaling diverse, inclusive
            developer communities. Previously Swift was named to the Forbes 30
            Under 30 Education category, founded Hacker League{" "}
            <em>(acquired by Intel in 2013)</em>, and served as the first
            Developer Evangelist for SendGrid{" "}
            <em>(IPO 2017, acquired by Twilio in 2019)</em>.
          </blockquote>

          <h3>Headshots & Avatars</h3>
          <p>
            Below are my preferred headshot photos and avatars. Click to
            download.
          </p>
          <div className="flex flex-row items-start w-full space-x-4 justify-between">
            <ImageThumbnail src="theycallmeswift-headshot.jpg" />
            <ImageThumbnail src="theycallmeswift-cartoon.jpg" />
            <ImageThumbnail src="theycallmeswift-avatar.jpg" />
          </div>
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default About;
