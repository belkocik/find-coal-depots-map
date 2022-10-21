import { useState } from "react";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";

const Navbar = () => {
  const { logout, authenticated } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  return (
    <>
      <nav className="px-2 sm:px-4  py-5 md:py-1.5 rounded bg-nav">
        <div className="w-full flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center">
            <a
              href="https://www.flaticon.com/free-icon/combustible_6534871#"
              target="_blank"
            >
              <img
                src="/coal-icon-logo.png"
                alt="coal"
                className="mr-3 h-6 sm:h-9"
              />
            </a>
            <span className="self-center text-md md:text-xl font-semibold whitespace-nowrap dark:text-black">
              <Link href="/">
                <a> Mapa składów z opałem</a>
              </Link>
            </span>
          </div>

          {/* mobile menu start */}
          <section className=" flex lg:hidden">
            <div
              className="space-y-1"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-5 animate-pulse bg-gray-800"></span>
              <span className="block h-0.5 w-5 animate-pulse bg-gray-800"></span>
              <span className="block h-0.5 w-5 animate-pulse bg-gray-800"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                {authenticated ? (
                  <>
                    <li className="border-b border-gray-400 my-8 uppercase">
                      <Link href="/coal-depots/add">
                        <a>Dodaj skup węgla</a>
                      </Link>
                    </li>
                    <li className="border-b border-gray-400 my-8 ">
                      <button
                        onClick={() => {
                          logout();
                          setIsNavOpen(false);
                        }}
                        className="uppercase"
                      >
                        Wyloguj
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="border-b border-gray-400 my-8 uppercase">
                      <Link href="/auth">
                        <a onClick={() => setIsNavOpen(false)}>Zaloguj się</a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </section>

          {/* mobile menu end*/}

          {/* desktop menu */}
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4  rounded-lg border  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:text-black">
              {authenticated ? (
                <>
                  <li>
                    <Link
                      href="/coal-depots/add"
                      className="block py-2 pr-4 pl-3 md:p-0 dark:text-black"
                    >
                      <a>Dodaj skup węgla</a>
                    </Link>
                  </li>
                  <button onClick={logout}>Wyloguj</button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="block py-2 pr-4 pl-3 md:p-0 dark:text-black"
                >
                  <a>Zaloguj się</a>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
