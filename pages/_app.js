import "../styles/styles.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../components/Layout";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>GastroWorld</title>
        <meta name="monetization" content="$ilp.uphold.com/LJmbPn7WD4JB" />
      </Head>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
};

export default App;
