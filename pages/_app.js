import "tailwindcss/tailwind.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../components/Layout";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GastroWorld</title>
      </Head>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}

export default App;
