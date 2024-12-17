"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import { fromUnixTime, isAfter } from "date-fns";
import { FC, PropsWithChildren, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (token) {
        try {
          const decodeToken = jwtDecode(token);
          const tokenExpiry = fromUnixTime(decodeToken.exp!);

          if (isAfter(new Date(), tokenExpiry)) {
            localStorage.removeItem("blog-storage");
            dispatch(logoutAction());
          }
        } catch (error) {
          localStorage.removeItem("blog-storage");
          dispatch(logoutAction());
        }
      }
    };
    const interval = setInterval(checkTokenValidity, 150000); // auto logout 15 menit
    return () => clearInterval(interval);
  }, [token, dispatch]);
  return <> {children} </>;
};

export default TokenProvider;
