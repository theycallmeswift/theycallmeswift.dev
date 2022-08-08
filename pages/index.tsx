import type { NextPage } from "next";

import DefaultLayout from "layouts/DefaultLayout";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <h1>Hello World</h1>
    </DefaultLayout>
  );
};

export default Home;
