import "styles/index.css";
import type { AppProps } from "next/app";
import Layout from "src/components/layout";
import { AuthProvider } from "src/auth/useAuth";
import { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/utils/apollo";

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
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    );
  }
}

export default MyApp;
