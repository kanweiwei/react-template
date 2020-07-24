import * as React from "react";

type HomeProps = {
  a: string;
};

const Home: React.FC<HomeProps> = () => {
  return <h1>hello world</h1>;
};

export default Home;
