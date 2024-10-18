"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/breadcrumbs";
import { Col, Container, Row, Image } from "react-bootstrap";
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

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const breadcrumbItems = ["Category", "Tin Tức XAUUSD"];

  useEffect(() => {
    // Hàm để lấy dữ liệu từ API
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>(
          "https://kiemtiencungsammy.click/api/news.php"
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
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <Container className="my-4">
        <Row>
          <Col xs={12} xl={7}>
            <Row className="gy-5">
              {news.map((item) => (
                <Col key={item.id} xs={12} className="d-flex">
                  <Link href={`/detail/news/${item.id}`}>
                    <div className="d-flex">
                      <Image
                        src={item.imageurl}
                        alt={item.title}
                        className="img-fluid me-3 w-[100px] h-[75px] md:h-auto md:w-[260px]"
                      />
                      <div className="article-content md:w-3/5 ml-3">
                        <p className="md:text-2xl md:font-bold font-[15px] mb-1">
                          {item.title}
                        </p>
                        <p className="flex items-center text-xs text-[#A0A0A0]">
                          BY {item.author}
                          <i className="lni lni-timer pl-2"></i>
                          {format(new Date(item.time), "MMMM dd, yyyy")}
                        </p>
                        <p className="hidden md:block">
                          <span className="line-clamp-2">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={12} xl={4}>
            <h3 className="text-[19px]">
              <span className="leading-[48px]">Được đề xuất</span>
            </h3>
            <hr />
            <Row className="gy-5">
              {news.slice(0, 3).map((item) => (
                <Col key={item.id} xs={12} className="d-flex">
                  <Image
                    src={item.imageurl}
                    alt={item.title}
                    className="img-fluid me-3 w-[100px] md:h-[86px] md:w-[120px]"
                  />
                  <div className="article-content md:w-3/5 ml-3">
                    <p className="md:font-bold font-[15px] mb-1">
                      {item.title}
                    </p>
                    <p className="flex items-center text-xs text-[#A0A0A0]">
                      <i className="lni lni-timer"></i>
                      {format(new Date(item.time), "MMMM dd, yyyy")}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
            <h3 className="text-[19px] mt-3">
              <span className="leading-[48px]">Được Xem Nhiều Nhất</span>
            </h3>
            <hr />
            <div>
              <Image
                src={news[0]?.imageurl}
                alt={news[0]?.title}
                className="img-fluid my-3 w-full h-[200px] object-cover"
              />
              <Row>
                <Col xs={10}>
                  <p className="m-0 text-[15px] md:text-xl font-bold">
                    {news[0]?.title}
                  </p>
                </Col>
                <Col xs={2} className="one flex items-center justify-center">
                  <span className="text-[#d7d7d7] text-4xl">
                    <i>01</i>
                  </span>
                </Col>
              </Row>
            </div>
            <hr className="mt-3" />
            <Row className="g-3">
              {news.slice(1, 5).map((item, index) => (
                <Col key={item.id} xs={12} className="flex">
                  <div className="article-content flex items-center">
                    <div className="bg-[#eee] rounded-full w-[44px] h-[44px] flex items-center justify-center">
                      <i>0{index + 2}</i>
                    </div>
                    <p className="md:font-bold font-[15px] mb-1 most-title ml-3">
                      {item.title}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsPage;
