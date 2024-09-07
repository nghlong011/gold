"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  console.log(isLogin);
  return !isLogin ? (
    <div className="login-layout">{children}</div>
  ) : (
    <div>Loading...</div>
  );
}
