"use client";
import { Container, Image } from "react-bootstrap";
import TradingViewWidget from "@/components/tradingView";
import Gift from "@/assets/image/gif-icon-hot.gif";
import ArticleComponent from "@/components/analysis";
import NewsComponent from "@/components/news";
import Information from "@/components/infor";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Container>
        <div className="relative w-full">
          <div className="flex w-full">
            <Image
              src={Gift.src}
              alt="Hot Icon"
              width={40} // Specify width
            />
            <div className="overflow-hidden relative text-marquee">
              <div className="whitespace-nowrap animate-marquee">
                Tham gia khoá học <span>“Trade Vàng”</span> bằng phương pháp{" "}
                <span>“SMC Magic”</span> . Học qua Zoom hoàn toàn miễn phí!{" "}
                <span>Nhấp vào đây!</span>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <Image
              src={Gift.src}
              alt="Hot Icon"
              width={40} // Specify width
            />
            <div className="overflow-hidden relative text-marquee">
              Tham gia nhóm <span>“VIP GOLD Scalping”</span>{" "}
              <span>tại đây!</span>
            </div>
          </div>
          <div className="h-[550px] md:h-[575px] w-full mt-4 text-lg">
            <p className="mb-3">BIỂU ĐỒ GIÁ VÀNG XAU/USD</p>
            <TradingViewWidget />
          </div>
        </div>
      </Container>
      <ArticleComponent />
      <NewsComponent />
      <Information />
    </div>
  );
}
