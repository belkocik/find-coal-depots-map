import "../styles/index.css";
import type { AppProps } from "next/app";
import Layout from "../src/components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
