import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import PageTransition from "./PageTransition";

const Layout = () => {
  return (
    <PageTransition>
      <Navbar /> <Outlet />
    </PageTransition>
  );
};

export default Layout;
