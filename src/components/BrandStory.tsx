import Image from "next/image";

export default function BrandStory() {
  return (
    <section
      id="story"
      className="py-section-md bg-cream text-wood border-b border-wood/10"
      aria-labelledby="story-heading"
    >
      <div className="max-w-container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-header-mobile md:mb-header-desktop">
          <h2
            id="story-heading"
            className="text-h2 font-serif font-bold text-wood mb-title-sub"
          >
            브랜드 이야기
          </h2>
          <p className="text-lead text-wood/80 font-normal">
            느린 시간과 정성으로 완성하는 뽀모의 제빵 철학
          </p>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Column 1: Fermentation Photo */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-wood/5 shadow-sm">
              <Image
                src="/images/story-dough.webp"
                alt="천연발효 반죽을 접고 있는 제빵사의 손"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-caption text-wood/75">
              천연발효종을 사용해 정성스레 반죽을 다루는 저온 숙성 과정
            </p>
          </div>

          {/* Column 2: Story & Craftsmanship */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-between space-y-6">
            {/* Story Paragraph */}
            <div className="space-y-4">
              <p className="text-body text-wood/90 leading-relaxed">
                10년차 대기업 직장인이 바쁜 일상을 보내며 빵과 샌드위치로 자주 식사를
                해결했습니다. 그러다 속이 불편하고 소화가 잘되지 않는 경험을
                하면서, 천연발효종과 저온 숙성을 적용한 맛있는 빵을 직접
                만들고자 첫 매장을 준비하게 되었습니다.
              </p>
            </div>

            {/* Principle & Meaning Box (Neutral styling, no white card) */}
            <div className="border-l-2 border-orange pl-5 py-2 space-y-3">
              <div>
                <span className="block text-sub font-semibold text-wood mb-1">
                  절대 바꾸지 않을 기본 원칙
                </span>
                <p className="text-body text-wood/90">
                  천연발효종을 사용하고 저온 장시간 숙성 과정을 지키는 것이
                  뽀모의 기본 원칙입니다.
                </p>
              </div>

              <div className="pt-2">
                <span className="block text-sub font-semibold text-wood mb-1">
                  이름의 뜻
                </span>
                <p className="text-body text-wood/90">
                  뽀모는 친근하고 편안한 인상의 건강한 빵집을 뜻합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
