import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

const Hero = () => {
  const { user } = useUser();
  return (
    <section className="px-2 pt-32 bg-white md:px-0">
      <div className="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-left text-gray-900 sm:text-5xl md:text-6xl md:text-center">
          <span className="block">
          The world&apos;s most {" "}
            <span className="block mt-1 text-yellow-500 lg:inline lg:mt-0">
            delicious map            </span>
          </span>
        </h1>
        <p className="w-full mx-auto text-base text-left text-gray-500 sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
        Discover the best dishes in the world, published by local experts
        </p>
        <div className="relative flex flex-col justify-center md:flex-row md:space-x-4">
          <Link href={user ? "/app" : "/api/auth/login"}>
            <a className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-yellow-500 rounded-md md:mb-0 hover:bg-yellow-700 md:w-auto">
              {user ? "Go to the app" : "Login to start"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </Link>
        </div>
      </div>
      <div className="container items-center max-w-4xl px-5 mx-auto mt-16 text-center">
        <Image
          src="https://www.nicepng.com/png/full/175-1759039_crab-food-illustration-chalk-food-chalk-art-png.png"
          alt="banner"
          width="896px"
          height="600px"
        />
      </div>
    </section>
  );
};

export default Hero;
