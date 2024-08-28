"use client";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";

const Menu: React.FC = () => {
  return (
    <Container className="">
      <Navbar expand="lg">
        <Nav className="mr-auto uppercase">
          <Link className="nav-link" href="/">
            HOME
          </Link>
          <Link className="nav-link" href="/tin-tuc">
            Tin Tức XAUUSD
          </Link>
          <Link className="nav-link" href="/phan-tich">
            Phân tích XAUUSD
          </Link>
          <Link className="nav-link" href="/kien-thuc">
            Kiến Thức XAUUSD
          </Link>
          <Link className="nav-link" href="/detail">
            Lịch kinh tế
          </Link>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Menu;
