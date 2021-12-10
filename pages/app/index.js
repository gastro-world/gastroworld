import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";

const HomeApp = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={user.picture}
        alt={user.name}
        width="200px"
        height="200px"
        className="rounded-full"
      />
      <h1 className="font-bold text-2xl">{user.name} - @{user.nickname}</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default HomeApp;
