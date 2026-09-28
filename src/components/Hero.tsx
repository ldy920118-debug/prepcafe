import { store } from "@/data/store";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[88svh] min-h-[580px] flex items-end justify-start overflow-hidden"
      aria-label="대표 소개"
    >
      {/* 
        <picture>를 통한 모바일과 데스크톱 이미지 실제 다운로드 분기
        CSS display 토글로 이중 다운로드하지 않음
      */}
      <picture className="absolute inset-0 w-full h-full">
        <source
          media="(max-width: 767px)"
          srcSet="/images/hero-mobile.webp"
          type="image/webp"
        />
        <img
          src="/images/hero-desktop.webp"
          alt="나무 테이블 위에 놓인 바게트와 치아바타, 소금빵"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
      </picture>

      {/* 
        사진 위 어두운 효과: 텍스트색 #2E2118의 RGB(46, 33, 24)를 투명도로 조절
        1) 텍스트 뒤 radial 국부 감광
        2) 하단 linear 스크림
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 25% 75%, rgba(46, 33, 24, 0.78) 0%, rgba(46, 33, 24, 0.45) 50%, rgba(46, 33, 24, 0.2) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(46, 33, 24, 0.92) 0%, rgba(46, 33, 24, 0.6) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Hero Content Container (Max width 1160px) */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 pb-14 md:pb-16 pt-24 text-cream">
        <div className="max-w-2xl">
          {/* H1 Title */}
          <h1
            className="text-display font-serif font-bold text-cream mb-4"
            style={{
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            {store.name}
          </h1>

          {/* Lead Paragraph */}
          <p
            className="text-lead text-cream/95 mb-4 max-w-xl font-normal"
            style={{
              textShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            천연발효종과 저온 숙성으로 만드는 바게트, 치아바타, 소금빵
          </p>

          {/* Hours & Operation summary */}
          <div
            className="flex items-center gap-2 text-sub text-cream/90 mb-8 tabular-nums"
            style={{
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
            }}
          >
            <span>{store.hours.formattedDetails}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            {/* 
              TODO: [확인 필요: 도로명 전체 주소와 층·호수 확정 후 네이버/카카오 길찾기 CTA 노출]
              {store.naverDirectionsUrl && (
                <a
                  href={store.naverDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accessible-link px-6 py-3 rounded bg-orange text-cream font-medium text-body shadow hover:brightness-105"
                >
                  길찾기
                  <span className="sr-only">(새 창)</span>
                </a>
              )}
            */}

            {/* 
              TODO: [확인 필요: 예약·온라인 주문 URL 확정 시 예약 CTA 노출]
              {store.reservationUrl && (
                <a
                  href={store.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-slot="hero-reservation"
                  className="accessible-link px-6 py-3 rounded bg-orange text-cream font-medium text-body shadow hover:brightness-105"
                >
                  예약하기
                  <span className="sr-only">(새 창)</span>
                </a>
              )}
            */}

            {/* 현재 활성화된 대표 보조 CTA: 전화로 재고 문의 */}
            <a
              id="hero-phone-cta"
              href={store.phoneHref}
              data-slot="hero-phone"
              className="accessible-link px-6 py-3 rounded bg-orange text-cream font-medium text-body transition-transform active:scale-95 shadow-md hover:brightness-105"
            >
              전화로 재고 문의
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
