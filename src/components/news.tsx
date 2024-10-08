"use client";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  time: string;
  author: string;
}

const NewsComponent = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Hàm để lấy dữ liệu từ API
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>(
          "https://kiemtiencungsammy.click/api/news.php"
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);
  return (
    <Container className="mt-14">
      <h3 className="text-[19px]">
        <span className="leading-[48px]">TIN TỨC XAUUSD - VÀNG</span>
      </h3>
      <hr />
      <Row className="g-3">
        {news.slice(0, 6).map((news) => (
          <Col key={news.id} xs={12} md={4} className="d-flex">
            <Link href={`/detail/news/${news.id}`} className="no-underline">
              <div className="d-flex">
                <Image
                  src={news.imageurl}
                  alt={news.title}
                  className="me-3 w-[80px] md:w-[120px] md:h-[86px]"
                />
                <div className="article-content">
                  <p className="text-sm font-bold line-clamp-2 text-black">
                    {news.title}
                  </p>
                  <p className="flex items-center text-[#A0A0A0] text-sm">
                    <i className="lni lni-timer"></i>
                    {format(new Date(news.time), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NewsComponent;
