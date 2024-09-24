"use client";
import { Image, Nav, Container, Row, Col } from "react-bootstrap";
import logo from "@/assets/Simple Trading logo/Simple Trading logo final-01.png";
import logo1 from "@/assets/Simple Trading logo/Simple Trading logo final-03.png";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <Container className="hidden xl:block">
        <Row className="h-[90px] items-center">
          <Col xs={2} md={3} className="h-full">
            <Image
              src={logo.src}
              alt="logo"
              className=" h-full cursor-pointer"
            />
          </Col>
          <Col xs={8} md={6} className="flex justify-center">
            <div className="relative h-full flex items-center w-full">
              <input
                placeholder="Search..."
                className="input shadow-sm focus:border-2 border-gray-300 px-3 py-2 rounded-full transition-all outline-none w-full"
                name="search"
                type="search"
              />
              <svg
                className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
          </Col>
          <Col xs={2} md={3} className="flex justify-end hidden md:flex">
            <div className="social-icon">
              <i className="lni lni-facebook-fill mr-2 cursor-pointer"></i>
              <i className="lni lni-twitter-original cursor-pointer"></i>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="xl:hidden p-0">
        <div className="bg-[#231F20] w-full overflow-hidden relative">
          <Row className="h-[90px] items-center">
            <Col xs={2} md={3} className="flex items-center justify-center">
              <button onClick={toggleMobileMenu} className="xl:hidden">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </Col>
            <Col xs={8} md={6} className="flex justify-center">
              <Link href="/">
                <Image
                  src={logo1.src}
                  alt="logo"
                  className=" mx-auto h-[90px] cursor-pointer"
                />
              </Link>
            </Col>
            <Col xs={2} md={3} className="flex">
              <svg
                className="w-8 h-8 text-white cursor-pointer"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </Col>
          </Row>
          <Row className="xl:hidden">
            <Col>
              <div
                ref={menuRef}
                className={`flex flex-col bg-white pt-4 fixed top-0 left-0 h-full w-3/4 z-50 transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="relative flex px-4 items-center w-full h-[60px]">
                  <input
                    placeholder="Search..."
                    className="input shadow-sm focus:border-2 border-gray-300 px-3 py-2 rounded-full transition-all w-full"
                    name="search"
                    type="search"
                  />
                  <svg
                    className="w-6 h-6 absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
                <hr className="mt-2" />
                <Nav className="grid gap-4 px-4">
                  <Link href="/" className="link" onClick={closeMobileMenu}>
                    Home
                  </Link>
                  <Link
                    href="/tin-tuc"
                    className="link"
                    onClick={closeMobileMenu}
                  >
                    Tin Tức XAUUSD
                  </Link>
                  <Link
                    href="/phan-tich"
                    className="link"
                    onClick={closeMobileMenu}
                  >
                    Phân tích XAUUSD
                  </Link>
                  <Link
                    href="/kien-thuc"
                    className="link"
                    onClick={closeMobileMenu}
                  >
                    Kiến Thức XAUUSD
                  </Link>
                </Nav>
              </div>
              {isMobileMenuOpen && (
                <div
                  className="fixed inset-0 bg-black opacity-70 z-40"
                  onClick={closeMobileMenu}
                ></div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Header;
