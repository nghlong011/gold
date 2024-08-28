"use client";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  time: string;
  author: string;
}

const ArticleComponent = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Hàm để lấy dữ liệu từ API
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>(
          "https://kiemtiencungsammy.click/api/analysis.php"
        );
        setNews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);
  return (
    <Container className="mt-14 ">
      <h3 className="text-[19px]">
        <span className="leading-[48px]">PHÂN TÍCH XAUUSD - VÀNG</span>
      </h3>
      <hr />
      <Row className="g-3">
        {news.map((news) => (
          <Col key={news.id} xs={12} md={4} className="d-flex">
            <Image
              src={news.imageurl}
              alt={news.title}
              className="img-fluid me-3 w-[80px] md:w-[120px]"
            />
            <div className="article-content">
              <p className="text-sm font-bold">{news.title}</p>
              <p className="flex items-center">
                <i className="lni lni-timer"></i>
                {news.time}
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArticleComponent;
