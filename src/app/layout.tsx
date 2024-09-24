"use client";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import ClientLayout from "./ClientLayout"; // Import Client Layout
import { Provider } from "react-redux";
import store from "../store/store";
import logo from "@/assets/Simple Trading logo/Simple Trading logo final-01.png";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.lineicons.com/4.0/lineicons.css"
          rel="stylesheet"
        />
        <link rel="icon" href={logo.src} sizes="any" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <ClientLayout>{children}</ClientLayout>
        </Provider>
      </body>
    </html>
  );
}
