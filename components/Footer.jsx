import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  if (router.pathname.includes("app")) {
    if (router.pathname.includes("add") || router.pathname.includes("food")) {
      console.log("lol");
    } else {
      return null;
    }
  }
  return (
    <section className="text-gray-700 bg-white body-font">
      <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
        <p className="text-xl font-black leading-none text-gray-900 select-none logo">
          GastroWorld<span className="text-yellow-400">.</span>
        </p>
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0">
          © 2021 GastroWorld - The world&apos;s most delicious map
        </p>
      </div>
    </section>
  );
};

export default Footer;
