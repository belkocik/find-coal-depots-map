import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ReactNode, FC } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
