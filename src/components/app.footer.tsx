import { Container, Row, Col, Image } from "react-bootstrap";
import logo from "@/assets/image/logo.png";
import MiniTradingViewWidget from "@/components/minitradingView";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Giá vàng tăng trở lại, mục tiêu tiếp theo ở đâu?",
    content: "Content of Article 1",
    imageUrl:
      "https://xauusd.vn/wp-content/uploads/2024/08/XAUUSD_2024-08-26_14-37-36_0853e-120x86.png",
    timestamp: " August 26, 2024",
  },
  {
    id: 2,
    title:
      "Vàng tạo đỉnh cao mới, trước thông tin Fed cắt giảm lãi suất và căng thẳng địa chính trị",
    content: "Content of Article 2",
    imageUrl:
      "https://xauusd.vn/wp-content/uploads/2024/08/XAUUSD_2024-08-26_14-37-36_0853e-120x86.png",
    timestamp: "2023-10-02 11:00",
  },
  {
    id: 3,
    title: "Vàng có thể giảm tiếp sau hàng loạt tin tốt từ Hoa Kỳ",
    content: "Content of Article 3",
    imageUrl:
      "https://xauusd.vn/wp-content/uploads/2024/08/XAUUSD_2024-08-26_14-37-36_0853e-120x86.png",
    timestamp: "2023-10-03 12:00",
  },
];
const Footer = () => {
  return (
    <>
      <Container fluid className="footer bg-[#f7f7f7] px-0">
        <Container>
          <Row className="py-14">
            <Col xs={12} md={3}>
              <div
                className="footer_widget widget_jnews_about"
                id="jnews_about-1"
              >
                <h3 className="text-base font-bold">
                  <span>XAUUSD.VN</span>
                </h3>

                <Image
                  src={logo.src}
                  alt="logo"
                  className="w-[200px] my-3"
                ></Image>
                <div className="jeg_about ">
                  <Link
                    className="footer_logo"
                    href="https://xauusd.vn/"
                  ></Link>
                  <p>
                    XAUUSD là trang web cập nhật biểu đồ giá vàng online. Chia
                    sẽ các phân tích nhận định về giá vàng bằng tin tức phân
                    tích cơ bản và phân tích kỹ thuật.
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div
                className="footer_widget widget_recent_entries"
                id="recent-posts-3"
              >
                <div className="jeg_footer_heading jeg_footer_heading_1">
                  <h3 className="font-bold">
                    <span>Bài Viết Mới</span>
                  </h3>
                </div>
                <ul className="pl-0 pt-3">
                  {articles.slice(0, 3).map((article) => (
                    <li key={article.id} className="py-2">
                      <Link href={`/bai-viet/${article.id}`}>
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className="font-bold" id="recent-posts-3">
                <div className="jeg_footer_heading jeg_footer_heading_1">
                  <h3 className="font-bold">
                    <span>Danh Mục</span>
                  </h3>
                </div>
                <ul className="pl-0 pt-3 grid grid-cols-2 gap-2">
                  <li className="py-2">
                    <Link href="/kien-thuc" className="hover:text-primary">
                      Kiến Thức XAUUSD
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/phan-tich" className="hover:text-primary">
                      Phân Tích XAU/USD
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/tin-tuc" className="hover:text-primary">
                      Tin Tức XAUUSD
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <MiniTradingViewWidget />
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="px-0 py-4">
        <div className="footer_right">
          <div className="social-icon">
            <i className="lni lni-facebook-fill mr-2 text-[#a0a0a0]"></i>
            <i className="lni lni-twitter-original"></i>
          </div>
        </div>
        <p className="copyright m-0 text-xs">
          © 2021
          <Link href="https://xauusd.vn" title="XAUUSD" className="px-1">
            XAUUSD.VN
          </Link>
          - Chuyên trang phân tích giá vàng online{" "}
        </p>
      </Container>
    </>
  );
};
export default Footer;
