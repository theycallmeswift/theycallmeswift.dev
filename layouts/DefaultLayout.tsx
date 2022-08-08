import { Suspense } from "react";
import Container from "components/Container";
import Footer from "components/Footer";
import Head from "components/Head";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Suspense>
      <Head />
      <Container>
        {children}
        <Footer />
      </Container>
    </Suspense>
  );
};

export default DefaultLayout;
