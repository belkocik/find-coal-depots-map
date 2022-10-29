import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ReactNode, FC } from "react";
import ScrollToTop from "../ScrollToTop";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ScrollToTop />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
