import Image from "next/image";
import { signatureMenus, upcomingMenus } from "@/data/menu";
import { store } from "@/data/store";

export default function SignatureMenu() {
  return (
    <section
      id="menu"
      className="py-section-lg bg-cream text-wood border-b border-wood/10"
      aria-labelledby="menu-heading"
    >
      <div className="max-w-container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-header-mobile md:mb-header-desktop">
          <h2
            id="menu-heading"
            className="text-h2 font-serif font-bold text-wood mb-title-sub"
          >
            시그니처 메뉴
          </h2>
          <p className="text-lead text-wood/80 font-normal">
            천연발효종과 저온 숙성으로 빚어낸 세 가지 시그니처 빵
          </p>
        </div>

        {/* Expected Main Items Notice */}
        <div className="mb-10 text-caption text-wood/75">
          * 개업 준비 중인 매장으로 예상 주력 메뉴는 소금빵과 치아바타입니다.
        </div>

        {/* 
          시그니처 메뉴 목록: 
          - 흰색 라운드 카드 그리드 금지
          - 데스크톱 좌우 지그재그 에디토리얼 레이아웃
          - 가격 우측 정렬 및 tabular-nums
        */}
        <div className="space-y-16 md:space-y-24">
          {signatureMenus.map((item, index) => {
            const isEven = index % 2 === 1;

            return (
              <article
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 border-b border-wood/10 last:border-b-0"
              >
                {/* Dedicated Photo */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-wood/5 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Details & Specs */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-between ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Name and Price Header */}
                  <div className="flex items-baseline justify-between border-b border-wood/15 pb-3 mb-4">
                    <h3 className="text-h3 font-serif font-bold text-wood">
                      {item.name}
                    </h3>
                    <span className="text-h3 font-serif font-semibold text-wood tabular-nums">
                      {item.price.toLocaleString("ko-KR")}원
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-body text-wood/90 mb-6">
                    {item.description}
                  </p>

                  {/* Ingredients, Origins, Allergens Metadata Table */}
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sub text-wood/80 pt-2">
                    <div>
                      <dt className="inline font-medium text-wood">주재료: </dt>
                      <dd className="inline">{item.ingredients.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-wood">밀가루: </dt>
                      <dd className="inline">{item.flourOrigin}</dd>
                    </div>
                    {item.butterOrigin && (
                      <div>
                        <dt className="inline font-medium text-wood">버터: </dt>
                        <dd className="inline">{item.butterOrigin}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="inline font-medium text-wood">소금: </dt>
                      <dd className="inline">{item.saltOrigin}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-wood">
                        알레르기 유발 물질:{" "}
                      </dt>
                      <dd className="inline text-alert font-medium">
                        {item.allergens.join(", ")}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>

        {/* Upcoming Menu Section */}
        {upcomingMenus.length > 0 && (
          <div className="mt-20 pt-12 border-t border-wood/15">
            <h3 className="text-h3 font-serif font-semibold text-wood mb-2">
              준비 중인 예정 메뉴
            </h3>
            <p className="text-caption text-wood/75 mb-8">
              * 정식 개업 후 순차적으로 선보일 메뉴들입니다. 가격 및 원재료 정보는 개업 시점에 공지됩니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingMenus.map((category) => (
                <div
                  key={category.category}
                  className="p-5 border-l border-wood/20 bg-cream"
                >
                  <h4 className="text-sub font-bold text-wood mb-3">
                    {category.category}
                  </h4>
                  <ul className="space-y-1.5 text-sub text-wood/80">
                    {category.items.map((menuItem) => (
                      <li key={menuItem}>• {menuItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 
          TODO: [확인 필요: 예약 URL 확정 시 메뉴 하단 예약 CTA 노출]
          {store.reservationUrl && (
            <div className="mt-14 text-center">
              <a
                href={store.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-slot="menu-reservation"
                className="accessible-link px-8 py-3.5 rounded bg-orange text-cream font-medium text-body shadow hover:brightness-105"
              >
                예약하기
                <span className="sr-only">(새 창)</span>
              </a>
            </div>
          )}
        */}
      </div>
    </section>
  );
}
