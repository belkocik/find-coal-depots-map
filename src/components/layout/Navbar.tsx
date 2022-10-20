import React from "react";
import Link from "next/link";

const Navbar = () => {
  const authenticated = false;
  const logout = () => null;

  return (
    <div className="bg-nav h-16">
      <nav>
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="https://www.flaticon.com/free-icon/combustible_6534871#">
            <a>
              <img src="/coal-icon-logo.png" alt="coal" className="w-12" />
            </a>
          </Link>
          {authenticated ? (
            <>
              <Link href="/coal-depots/add">
                <a>Dodaj skup węgla</a>
              </Link>
              <button onClick={logout}>Wyloguj</button>
            </>
          ) : (
            <Link href="/auth">Zaloguj się</Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
