"use client";

import { useEffect, useState } from "react";
import { store } from "@/data/store";

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  // 예약 URL이나 길찾기 URL이 둘 다 없으면 고정 바를 렌더링하지 않는다
  const hasAction = Boolean(store.reservationUrl || store.naverDirectionsUrl || store.kakaoDirectionsUrl);

  useEffect(() => {
    if (!hasAction) return;

    const heroCta = document.getElementById("hero-phone-cta");
    if (!heroCta) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 히어로 CTA가 화면을 벗어날 때만 표시
        const shouldShow = !entry.isIntersecting;
        setIsVisible(shouldShow);
        if (shouldShow) {
          document.body.setAttribute("data-sticky-cta", "visible");
        } else {
          document.body.removeAttribute("data-sticky-cta");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroCta);

    return () => {
      observer.disconnect();
      document.body.removeAttribute("data-sticky-cta");
    };
  }, [hasAction]);

  if (!hasAction || !isVisible) {
    return null;
  }

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-cream/95 backdrop-blur-md border-t border-wood/15 p-3 shadow-lg"
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex items-center gap-3">
        {store.reservationUrl ? (
          <a
            href={store.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-slot="mobile-sticky-reservation"
            className="accessible-link flex-1 justify-center py-3 rounded bg-orange text-cream font-medium text-body shadow hover:brightness-105"
          >
            예약하기
            <span className="sr-only">(새 창)</span>
          </a>
        ) : store.naverDirectionsUrl ? (
          <a
            href={store.naverDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="accessible-link flex-1 justify-center py-3 rounded bg-orange text-cream font-medium text-body shadow hover:brightness-105"
          >
            길찾기
            <span className="sr-only">(새 창)</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
