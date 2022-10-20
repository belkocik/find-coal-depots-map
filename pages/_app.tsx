import "styles/index.css";
import type { AppProps } from "next/app";
import Layout from "src/components/layout";
import { AuthProvider } from "src/auth/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
