import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import useUserStore from "@/store/authStore";

export default function withAuth(component: any) {
  const Wrapper = (props: any) => {
    const { token } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
      if (
        !token &&
        pathname !== "/signin" &&
        pathname !== "/signup" &&
        pathname !== "/"
      ) {
        navigate("/signin", { state: { from: pathname } });
      }
      if (
        token &&
        (pathname === "/signin" || pathname === "/signup" || pathname === "/")
      ) {
        const from = location.state?.from || "/dashboard";
        navigate(from, { replace: true });
      }
    }, [token, pathname]);

    return component(props);
  };
  return Wrapper;
}
