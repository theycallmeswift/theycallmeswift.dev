import type { NextPage } from "next";

import { Suspense } from "react";
import Container from "components/Container";

const Home: NextPage = () => {
  return (
    <Suspense>
      <Container>
        <h1>Hello World</h1>
      </Container>
    </Suspense>
  );
};

export default Home;
