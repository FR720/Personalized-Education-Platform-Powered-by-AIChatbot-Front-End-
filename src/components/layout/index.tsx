import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import PageTransition from "./PageTransition";

const Layout = () => {
  return (
    <>
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
    </>
  );
};

export default Layout;
