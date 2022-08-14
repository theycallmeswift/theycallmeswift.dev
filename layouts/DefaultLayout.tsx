import type { HeadProps } from "components/Head";

import { Suspense } from "react";
import Container from "components/Container";
import Footer from "components/Footer";
import Head from "components/Head";
import Navbar from "components/Navbar";

interface DefaultLayoutProps
  extends Pick<HeadProps, "title" | "description" | "image"> {
  children?: React.ReactNode;
}

const DefaultLayout = ({
  title,
  description,
  image,
  children,
}: DefaultLayoutProps) => {
  return (
    <Suspense>
      <Head title={title} description={description} image={image} />
      <Container className="px-4 md:px-8 pb-8 md:pb-16">
        <Navbar />
        {children}
        <Footer />
      </Container>
    </Suspense>
  );
};

export default DefaultLayout;
