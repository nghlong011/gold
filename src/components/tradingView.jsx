"use client";
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef(null);

  useEffect(() => {
    const containerElement = container.current;
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "OANDA:XAUUSD",
          "interval": "1",
          "timezone": "Asia/Ho_Chi_Minh",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "details": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

    containerElement.appendChild(script);

    return () => {
      // Xóa script nếu nó còn tồn tại
      if (containerElement && containerElement.contains(script)) {
        containerElement.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="text-black">Nguồn: TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
