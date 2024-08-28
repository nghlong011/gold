import { Container, Row, Col } from "react-bootstrap";
const Information = () => {
  return (
    <Container className="mt-14 pb-[20px] px-0">
      <h3 className="text-[19px]">
        <span className="leading-[48px]">BẢNG THÔNG TIN VỀ VÀNG</span>{" "}
      </h3>
      <hr />
      <Row>
        <Col xs={12} md={6}>
          <div className="mb-[30px]">
            <div className="wpb_wrapper">
              <h5>
                <strong>XAU/USD, VÀNG</strong>
              </h5>
              <p>
                Trong Forex, Vàng được xếp vào dạng tiền tệ.
                <br />
                <strong>Mã giao dịch</strong>: XAU/USD với giá quy đổi tính theo
                Ounce. Ví dụ giá vàng hiển thị&nbsp; XAUUSD: 1800 USD, tức là
                cần 1800 USD để MUA 1 OUNCE vàng.
                <br />
                <strong>Theo cách tính người Việt:</strong>
              </p>
              <ul className="list-disc mb-6">
                <li>
                  1 <strong>ounce vàng </strong>= 8,29426{" "}
                  <strong>chỉ vàng </strong>
                </li>
                <li>
                  1 <strong>lượng vàng</strong> = 1.20565302733{" "}
                  <strong>ounce vàng</strong>
                </li>
              </ul>
              <p>
                VÀNG luôn được xem là dạng hàng hóa tăng giá&nbsp; đặc biệt khi
                thế giới có những biến động về chính trị hoặc kinh tế.
              </p>
            </div>
          </div>
          <div className="mb-[30px] ">
            <div className="wpb_wrapper">
              <h5>
                <strong>TOP 3 QUỐC GIA NẰM GIỮ VÀNG LỚN NHẤT THẾ GIỚI</strong>
              </h5>
              <ul className="list-disc mb-6">
                <li>Hoa Kỳ (hơn 8000 tấn)</li>
                <li>Đức (hơn 3000 tấn)</li>
                <li>Italy (hơn 2000 tấn)</li>
              </ul>
            </div>
          </div>
          <div className="mb-[30px] ">
            <div className="wpb_wrapper">
              <h5>
                <strong>ĐỈNH VÀNG, ĐÁY VÀNG LÀ BAO NHIÊU?</strong>
              </h5>
              <p>Trong 10 năm từ 2001-2011</p>
              <ul className="list-disc mb-6">
                <li>
                  <strong>Mức cao nhất: </strong>2075.28 USD/Ounce
                </li>
                <li>
                  <strong>Mức thấp nhất</strong>: 1046.45 USD/Ounce
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-[30px] ">
            <div className="wpb_wrapper">
              <h5>
                <strong>CÁC THÀNH TỐ ẢNH HƯỞNG TỚI XAU/USD</strong>
              </h5>
              <div className="">
                <strong>Tiền tệ:</strong> USD và EUR.
                <br />
                <strong>Hàng hóa:</strong> Bạc kim loại phổ biến nhất sau Vàng.
                <br />
                <strong>Trái phiếu</strong>: Trái phiếu kho bạc do chính phủ,
                đặc biệt, chính phủ Mỹ phát hành
                <br />
                <strong>Các chỉ số:</strong> Hui (AMEX Gold BUGS), XAU
                (Philadelphia Gold and Silver Sector Index) và GDM (NYSE Arca
                Gold Miners Index)
                <br />
                <strong>Sàn giao dịch chứng khoán</strong>
                <strong>:</strong> Sàn giao dịch hàng hóa New York (COMEX), Ủy
                ban thương mại Chicago, Euronext/LIFFE, Thị trường vàng London,
                Sàn giao dịch hàng hóa Tokyo, Bolsa der Mercadorias e Futuros và
                Sàn giao dịch hợp đồng tương lai Hàn Quốc.
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="mb-[30px] ">
            <div className="wpb_wrapper">
              <h5>
                <strong>CÁC TỔ CHỨC ẢNH HƯỞNG NHẤT ĐẾN CẶP XAU/USD</strong>
              </h5>
              <ul className="list-disc mb-6">
                <li>
                  <strong>WGC (Hội đồng vàng thế giới)</strong>
                  <strong>: </strong>tổ chức phát triển thị trường cho ngành
                  vàng.
                </li>
                <li>
                  <strong>LBMA</strong>
                  <strong> (Hiệp hội Thị trường Vàng London</strong>
                  <strong>): </strong>“trùm” bán buôn vàng.
                </li>
                <li>
                  <strong>COMEX (Commodity Exchange Inc.)</strong>
                  <strong>: </strong>thị trường chính cho giao dịch kim loại.
                </li>
                <li>
                  <strong>Zurich Gold Pool</strong>
                  <strong>:</strong> được thành lập bởi những ngân hàng hàng đầu
                  của Thuỵ Sĩ.
                </li>
                <li>
                  <strong>CGSE</strong>
                  <strong>:</strong> Hiệp hội trao đổi vàng và bạc Trung Quốc.
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-[30px] ">
            <div className="wpb_wrapper">
              <h5>
                <strong>CÁC NHÂN TỐ ẢNH HƯỞNG NHẤT ĐẾN CẶP XAU/USD</strong>
              </h5>
              <ul className="list-disc mb-6">
                <li>
                  <strong>David Harquail</strong>, Chủ tịch Hội đồng vàng thế
                  giới và Giám đốc điều hành của Tập đoàn Franco-Nevada.
                </li>
                <li>
                  <strong>Jerome Powell</strong>, Chủ tịch thứ 16 của Cục Dự trữ
                  Liên bang Mỹ.
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-[30px] ">
            <div className="wpb_wrapper">
              <h5>
                <strong>CÁC YẾU TỐ ẢNH HƯỞNG TỚI VÀNG</strong>
              </h5>
              <ul className="list-disc mb-6">
                <li>
                  <strong>Tin lãi suất</strong>: phụ thuộc vào việc lãi suất
                  tăng hay giảm, nếu lãi suất tăng nhà đầu tư có xu hướng bán
                  vàng để tìm kiếm cơ hội kinh doanh mới.
                </li>
                <li>
                  <strong>Lạm phát:</strong> Luôn được xem là sản phẩm trú ẩn an
                  toàn, nên khi lạm phát tăng sẽ khiến vàng tăng giá.
                </li>
                <li>
                  <strong>Khủng hoảng kinh tế – chính trị: thế</strong> giới bất
                  ổn sẽ là lúc nhà đầu tư chạy vào vàng để giảm thiểu rủi ro
                </li>
                <li>
                  <strong>Ngân hàng trung ương:</strong> nơi quyết định các
                  chính sách tiền tệ đặc biệt là việc tăng giảm lãi suất.
                </li>
                <li>
                  <strong>Dự trữ vàng đến từ chính phủ:</strong> thường sẽ mua
                  vào hoặc bán ra với khối lượng rất lớn nên sẽ gây ảnh hưởng
                  tới vàng.
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Information;
