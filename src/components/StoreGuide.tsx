import { store } from "@/data/store";

export default function StoreGuide() {
  return (
    <section
      id="visit"
      className="py-section-lg bg-cream text-wood"
      aria-labelledby="visit-heading"
    >
      <div className="max-w-container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-header-mobile md:mb-header-desktop">
          <h2
            id="visit-heading"
            className="text-h2 font-serif font-bold text-wood mb-title-sub"
          >
            매장 안내
          </h2>
          <p className="text-lead text-wood/80 font-normal">
            영업시간 및 포장 이용 안내
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* 
            Left Column:
            - 실제 주소/좌표/지도 자산이 모두 있을 때만 지도 렌더링
            - 주소가 없을 때 가짜 지도나 회색 플레이스홀더를 표시하지 않음
            - 대신 방문 전 필수 안내 및 전화 상담 카드로 우아하게 구성
          */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 md:p-10 border border-wood/15 rounded-sm bg-cream">
            {/* 
              TODO: [확인 필요: 도로명 전체 주소와 층·호수 확정 시 지도 및 길찾기 렌더링]
              {store.address && (
                <div className="mb-6">
                  <h3 className="text-h3 font-serif font-bold text-wood mb-2">오시는 길</h3>
                  <p className="text-body text-wood/90 mb-4">{store.address}</p>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(store.address!)}
                    className="accessible-link px-4 py-2 border border-wood/20 rounded text-sub font-medium hover:bg-wood/5"
                  >
                    주소 복사
                  </button>
                </div>
              )}
            */}

            <div>
              <div className="inline-block px-3 py-1 rounded bg-wood/10 text-wood text-caption font-semibold tracking-wider mb-4">
                {store.openingYear}년 개업 예정
              </div>
              <h3 className="text-h3 font-serif font-bold text-wood mb-4">
                좌석 없는 테이크아웃 전문 베이커리
              </h3>
              <p className="text-body text-wood/90 leading-relaxed mb-6">
                뽀모 베이커리는 모든 빵을 포장(테이크아웃)으로만 제공하는
                베이커리입니다. 매장 내 좌석과 취식 공간이 마련되어 있지 않으니
                이용에 참고해 주시기 바랍니다.
              </p>

              <div className="p-4 border-l-2 border-orange bg-wood/5 mb-6">
                <p className="text-sub font-medium text-wood mb-1">
                  품절 안내 및 당일 재고 문의
                </p>
                <p className="text-caption text-wood/80">
                  매일 당일 생산 원칙으로 빵을 구워내며, 오후 3시 이후에는 일부
                  시그니처 메뉴가 조기 품절될 수 있습니다. 헛걸음하지 않으시도록
                  방문 전 전화로 재고를 문의해 주시기 바랍니다.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-wood/10">
              <a
                href={store.phoneHref}
                className="accessible-link w-full justify-center px-6 py-3.5 rounded bg-orange text-cream font-medium text-body transition hover:brightness-105 shadow-sm text-center"
              >
                전화 문의 ({store.phoneDisplay})
              </a>
            </div>
          </div>

          {/* Right Column: Detailed Store Operating Specifications */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 md:p-10 border border-wood/15 rounded-sm bg-cream">
            <div>
              <h3 className="text-h3 font-serif font-bold text-wood mb-6">
                운영 상세 정보
              </h3>

              <dl className="divide-y divide-wood/10 text-body text-wood/90">
                <div className="py-3.5 flex justify-between items-baseline">
                  <dt className="font-semibold text-wood">영업 요일</dt>
                  <dd className="tabular-nums">수요일 – 일요일 (주 5일)</dd>
                </div>
                <div className="py-3.5 flex justify-between items-baseline">
                  <dt className="font-semibold text-wood">영업 시간</dt>
                  <dd className="tabular-nums">09:00 – 19:00</dd>
                </div>
                <div className="py-3.5 flex justify-between items-baseline">
                  <dt className="font-semibold text-wood">라스트 오더</dt>
                  <dd className="tabular-nums text-alert font-medium">18:30</dd>
                </div>
                <div className="py-3.5 flex justify-between items-baseline">
                  <dt className="font-semibold text-wood">정기 휴무</dt>
                  <dd className="text-alert font-medium">매주 월요일 · 화요일</dd>
                </div>
                <div className="py-3.5 flex justify-between items-baseline">
                  <dt className="font-semibold text-wood">매장 형태</dt>
                  <dd>좌석 없음 (포장 전용)</dd>
                </div>
                <div className="py-3.5 flex justify-between items-baseline">
                  <dt className="font-semibold text-wood">단체 이용</dt>
                  <dd>해당 없음</dd>
                </div>
                <div className="py-3.5 flex justify-between items-baseline">
                  <dt className="font-semibold text-wood">배달 운영</dt>
                  <dd className="text-sub text-wood/80">배달 운영 예정 (플랫폼 추후 안내)</dd>
                </div>
              </dl>
            </div>

            <div className="pt-6 border-t border-wood/10 text-caption text-wood/75">
              * 정식 개업 일정 및 확정 매장 위치는 추후 안내될 예정입니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
