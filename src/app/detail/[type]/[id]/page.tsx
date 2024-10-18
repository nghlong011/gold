"use client";

import { Container, Row, Col, Card, Image, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  time: string;
  author: string;
}

const PostDetail = ({
  params,
}: {
  params: {
    type: any;
    id: string;
  };
}) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [breadcrumbItems, setBreadcrumbItems] = useState<string>();
  const [thisNews, setThisNews] = useState<NewsItem>();
  const type = params.type;
  const id = params.id;

  useEffect(() => {
    // Hàm để lấy dữ liệu từ API
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem>(
          `https://kiemtiencungsammy.click/api/${type}.php/${id}`
        );
        const response2 = await axios.get<NewsItem[]>(
          `https://kiemtiencungsammy.click/api/${type}.php`
        );
        setNews(response2.data);
        const newBreadcrumbItems = getBreadcrumbItems(type);
        setBreadcrumbItems(newBreadcrumbItems);

        // Sử dụng đối tượng trả về từ API
        setThisNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [id, type]);

  const getBreadcrumbItems = (type: string) => {
    let items: string = "";

    if (type === "news") {
      items = "Tin Tức XAUUSD";
    } else if (type === "info") {
      items = "Kiến Thức XAUUSD";
    } else if (type === "analysis") {
      items = "Phân Tích XAUUSD";
    }
    return items;
  };
  console.log(id);
  // Filter out the current post from the news array
  const filteredNews = news.filter((item) => {
    return String(item.id) !== String(id);
  });
  return (
    <Container className="my-5">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{breadcrumbItems}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col>
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            {thisNews?.title ?? "Default Title"}
          </h1>
          <hr />
          <div className="flex items-center text-gray-500 mb-4">
            <Image
              src="https://secure.gravatar.com/avatar/7a9987c6969aa6051742c46487a14a85?s=80&d=mm&r=g"
              alt="TuyenTrong"
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <span className="mr-4">
              by {thisNews?.author ?? "Default Title"}
            </span>
            <span> {thisNews?.time ?? "Default Title"}</span>
            <span className="ml-4">Reading Time: 3 mins read</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">RELATED POSTS</h2>
            <hr />
            <ul className="list-disc pl-5">
              {filteredNews.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <Link href={`/detail/${type}/${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <div
              dangerouslySetInnerHTML={{
                __html: thisNews?.description ?? "Default Title",
              }}
            />
          </div>
          <div className=" p-3  mb-4 flex items-center border-solid border-2 border-gray-300 cursor-pointer">
            <span className="bg-blue-500 text-white rounded-full flex items-center justify-center w-[30px] h-[30px]">
              <i className="lni lni-telegram-original"></i>
            </span>
            <span className="pl-2 text-red-500 font-bold">
              Tham gia nhóm tin hiệu Telegram{" "}
              <span className="text-blue-500">tại đây!</span>
            </span>
          </div>
          <div className="avatar-bottom border-solid border-2 border-gray-300 flex items-center p-3">
            <Image
              src="https://secure.gravatar.com/avatar/7a9987c6969aa6051742c46487a14a85?s=80&d=mm&r=g"
              alt="TuyenTrong"
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <span>{thisNews?.author}</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">RELATED POSTS</h2>
          <hr />
          <Row xs={1} md={2} lg={3} className="g-4 mb-6">
            {filteredNews.slice(0, 6).map((item) => (
              <Col key={item.id}>
                <Link href={`/detail/${type}/${item.id}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={item.imageurl}
                      className="h-[200px] object-cover"
                    />
                    <Card.Body>
                      <span className="text-xl font-bold line-clamp-3">
                        {item.title}
                      </span>
                    </Card.Body>
                    <Card.Footer className="text-muted d-flex align-items-center">
                      <i className="lni lni-timer"></i>
                      <small>{item.time}</small>
                    </Card.Footer>
                  </Card>
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
            {filteredNews.slice(0, 3).map((item) => (
              <Col key={item.id} xs={12} className="d-flex">
                <Link href={`/detail/${type}/${item.id}`}>
                  <div className="d-flex">
                    <Image
                      src={item.imageurl}
                      alt={item.title}
                      className="img-fluid me-3 w-[100px] md:h-[86px] md:w-[120px]"
                    />
                    <div className="article-content md:w-3/5 ml-3">
                      <p className="md:font-bold font-[15px] mb-1 line-clamp-3">
                        {item.title}
                      </p>
                      <p className="flex items-center text-xs text-[#A0A0A0]">
                        <i className="lni lni-timer"></i>
                        {item.time}
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
          <h3 className="text-[19px] mt-3">
            <span className="leading-[48px]">Được Xem Nhiều Nhất</span>
          </h3>
          <hr />
          <div>
            <Link href={`/detail/${type}/${news[0]?.id}`}>
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
            </Link>
          </div>
          <hr className="mt-3" />
          <Row className="g-3">
            {news.slice(1, 5).map((item, index) => (
              <Col key={item.id} xs={12} className="flex">
                <Link href={`/detail/${type}/${item.id}`}>
                  <div className="article-content flex items-center">
                    <div className="bg-[#eee] rounded-full w-[44px] h-[44px] flex items-center justify-center">
                      <i>0{index + 2}</i>
                    </div>
                    <p className="md:font-bold font-[15px] mb-1 most-title ml-3">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetail;
