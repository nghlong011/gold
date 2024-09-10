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
          <div className="flex w-full cursor-pointer">
            <Image
              src={Gift.src}
              alt="Hot Icon"
              width={40} // Specify width
            />
            <div className="overflow-hidden relative text-marquee ">
              <div className="whitespace-nowrap animate-marquee font-bold ">
                Tham gia khoá học{" "}
                <span className="text-red-500">“Trade Vàng”</span> bằng phương
                pháp <span className="text-red-500">“SMC Magic”</span> . Học qua
                Zoom hoàn toàn miễn phí!{" "}
                <span className="text-primary">Nhấp vào đây!</span>
              </div>
            </div>
          </div>
          <div className="flex w-full cursor-pointer">
            <Image
              src={Gift.src}
              alt="Hot Icon"
              width={40} // Specify width
            />
            <div className="overflow-hidden relative font-bold flex items-center">
              <div className="text-sm md:text-base">
                Tham gia nhóm{" "}
                <span className="text-red-500 px-1">“VIP GOLD Scalping”</span>
                <span className="text-primary">tại đây!</span>
              </div>
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
