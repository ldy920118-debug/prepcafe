import Image from "next/image";

export default function DailyBread() {
  return (
    <section
      id="daily"
      className="py-section-md bg-cream text-wood border-b border-wood/10"
      aria-labelledby="daily-heading"
    >
      <div className="max-w-container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-header-mobile md:mb-header-desktop">
          <h2
            id="daily-heading"
            className="text-h2 font-serif font-bold text-wood mb-title-sub"
          >
            일상의 빵
          </h2>
          <p className="text-lead text-wood/80 font-normal">
            가족의 식탁과 아이의 간식을 위한 정직한 빵
          </p>
        </div>

        {/* Full-width / Editorial 3:2 Image */}
        <div className="relative aspect-[3/2] w-full max-w-4xl mx-auto rounded-sm overflow-hidden bg-wood/5 shadow-sm mb-10">
          <Image
            src="/images/daily-packaging.webp"
            alt="가족과 함께 먹을 빵을 종이봉투에 담는 모습"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Narrative Content */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-body md:text-lead text-wood/90 leading-relaxed font-normal">
            아이의 간식을 고르고, 가족이 함께 먹을 빵을 준비하는 일상에
            자연스럽게 놓이는 빵을 만들고자 합니다.
          </p>
          <p className="text-sub text-wood/75">
            바게트와 치아바타 같은 식사빵부터 소금빵과 샌드위치, 구움과자까지 준비할 예정입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
