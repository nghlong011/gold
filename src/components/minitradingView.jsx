"use client";
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function MiniTradingViewWidget() {
  const container = useRef(null);

  useEffect(() => {
    const containerElement = container.current;
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbol": "OANDA:XAUUSD",
  "width": "100%",
  "height": "100%",
  "locale": "en",
  "dateRange": "1D",
  "colorTheme": "light",
  "trendLineColor": "rgba(0, 0, 255, 1)",
  "underLineColor": "rgba(73, 133, 231, 1)",
  "underLineBottomColor": "rgba(73, 133, 231, 0)",
  "isTransparent": false,
  "autosize": true,
  "largeChartUrl": ""
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
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">XAUUSD Chart by TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(MiniTradingViewWidget);
