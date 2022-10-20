import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ReactNode, FC } from "react";

interface IPageProps {
  children: ReactNode;
}

const Layout: FC<IPageProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
