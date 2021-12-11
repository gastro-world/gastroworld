import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";
const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();
  const logout = router.pathname.includes("app") ? true : false;
  if (router.pathname.includes("app")) {
    if (router.pathname.includes("add") || router.pathname.includes("food")) {
      console.log("lol")
    } else {
      return null
    }
  }
  return (
    <header>
      <div className="flex flex-row flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <Link href="/">
          <a className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none">
            GastroWorld
          </a>
        </Link>
          <span className="inline-flex rounded-md shadow-sm">
            {!logout && (
              <Link href={user ? "/app" : "/api/auth/login"}>
                <a className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-yellow-400 rounded-md md:mb-0 hover:bg-yellow-600 md:w-auto">
                  {user ? "Go to the app" : "Login to start"}
                </a>
              </Link>
            )}
            {logout && (
              <Link href="/api/auth/logout">
                <a className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-yellow-400 rounded-md md:mb-0 hover:bg-yellow-600 md:w-auto">
                  Logout
                </a>
              </Link>
            )}
          </span>
        </div>
    </header>
  );
};

export default Navbar;
