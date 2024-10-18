"use client";

import Header from "@/components/app.header";
import Menu from "@/components/menu";
import Footer from "@/components/app.footer";
import { Container } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Kiểm tra nếu URL chứa "admin" hoặc "login"
  const isSpecialLayout =
    pathname.includes("admin") || pathname.includes("login");

  return (
    <>
      {!isSpecialLayout && (
        <>
          <div className="w-full bg-[#f7f7f7]">
            <Header />
          </div>
          <div className="w-full shadow-md mb-4 hidden xl:block xl:sticky xl:top-0 z-[9999] bg-white">
            <Menu />
          </div>
        </>
      )}
      <Container fluid className="text-black p-0">
        {children}
      </Container>
      {!isSpecialLayout && <Footer />}
    </>
  );
}
