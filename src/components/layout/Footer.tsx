import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="absolute bottom-0 text-center pb-2 z-50 hidden md:block">
      <div className="flex">
        <div>
          {" "}
          &copy; {new Date().getFullYear()} znajdź skup węgla - Built with{" "}
          <span className="text-red-600">♥</span> by{" "}
          <Link href="https://www.marcinniedbalec.xyz/">
            <a
              target="_blank"
              rel="external"
              className="hover:text-zinc-600 transition-all"
            >
              Marcin Niedbalec
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
