import React from "react";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";

const Navbar = () => {
  const { logout, authenticated } = useAuth();
  // const authenticated = false;
  // const logout = () => null;

  return (
    <nav>
      {/* <div classNameName="px-6 h-16 container flex flex-wrap justify-between items-center mx-auto">
          <Link href="https://www.flaticon.com/free-icon/combustible_6534871#">
            <a>
              <img src="/coal-icon-logo.png" alt="coal" classNameName="w-12" />
            </a>
          </Link>
          <Link href="/" classNameName="block py-2 pr-4 pl-3">
            <a>Home</a>
          </Link>
          <div classNameName="hidden w-full md:block md:w-auto">
            {authenticated ? (
              <>
                <Link href="/coal-depots/add" className="block py-2 pr-4 pl-3">
                  <a>Dodaj skup węgla</a>
                </Link>
                <button onClick={logout}>Wyloguj</button>
              </>
            ) : (
              <Link href="/auth" classNameName="block py-2 pr-4 pl-3">
                Zaloguj się
              </Link>
            )}
          </div>
        </div> */}
      <nav className=" px-2 sm:px-4 py-2.5 rounded bg-nav">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src="/coal-icon-logo.png"
              alt="coal"
              className="mr-3 h-6 sm:h-9"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black">
              <Link href="/">
                <a> Mapa składów z opałem</a>
              </Link>
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
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
                  Zaloguj się
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;
