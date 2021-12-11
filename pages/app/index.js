import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const HomeApp = () => {
  return <div className="w-screen"></div>;
};

export const getServerSideProps = withPageAuthRequired();

export default HomeApp;

