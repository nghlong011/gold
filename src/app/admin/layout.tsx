// app/admin/layout.tsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./sidebar";
import Image from "next/image";
import logo from "@/assets/image/logo.png";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col">
      {/* Header */}
      <header className="bg-gray-500 text-white py-4">
        <Container fluid>
          <Row className="items-center">
            <Col xs={6} className="flex items-center">
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
        <aside className="w-64 bg-gray-500 text-white p-4">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
