import { Suspense } from "react";
import Container from "components/Container";
import Footer from "components/Footer";
import Head from "components/Head";
import Navbar from "components/Navbar";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Suspense>
      <Head />
      <Container className="px-8 pb-16">
        <Navbar />
        {children}
        <Footer />
      </Container>
    </Suspense>
  );
};

export default DefaultLayout;
