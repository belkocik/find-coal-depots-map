import "styles/index.css";
import type { AppProps } from "next/app";
import Layout from "src/components/layout";
import { AuthProvider } from "src/auth/useAuth";
import { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/utils/apollo";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <ApolloProvider client={client}>
        <Head>
          <title>Mapa składów węgla/opału</title>
          <meta name="description" content="apa składów węgla/opału w Polsce" />
          <link rel="icon" href="/coal-icon-logo.png" />
        </Head>
        <AuthProvider>
          <Layout>
            <Toaster position="top-center" />
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    );
  }
}

export default MyApp;
