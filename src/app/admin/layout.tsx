// app/admin/layout.tsx
"use client";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./sidebar";
import Image from "next/image";
import logo from "@/assets/Simple Trading logo/Simple Trading logo final-01.png";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin, router]);

  if (!isLogin) {
    return null; // hoặc một spinner loading
  }

  return (
    <div className=" flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-500 text-white py-4">
        <Container fluid>
          <Row className="items-center">
            <Col
              xs={6}
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image src={logo.src} alt="logo" width={150} height={50} />
            </Col>
            <Col xs={6} className="flex justify-end">
              <Button variant="danger">Logout</Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-500 text-white p-4 ">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
