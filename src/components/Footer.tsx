import { store } from "@/data/store";

export default function Footer() {
  return (
    <footer
      className="border-t border-wood/15 bg-cream py-12 text-wood/80 text-caption"
      role="contentinfo"
    >
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-wood/10">
          <div>
            <span className="block text-h3 font-serif font-bold text-wood mb-2">
              {store.name}
            </span>
            <p className="text-sub text-wood/80 font-normal">
              {store.businessType} · {store.openingYear}년 개업 예정
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <a
              href={store.phoneHref}
              className="accessible-link text-sub font-semibold text-wood hover:text-orange transition"
            >
              전화 {store.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-4 text-wood/75">
          <div className="space-y-1">
            <p className="tabular-nums">
              영업시간: {store.hours.formattedDetails}
            </p>
            {/* 
              TODO: [확인 필요: 도로명 전체 주소 확정 시 주소 노출]
              {store.address && <p>주소: {store.address}</p>}
            */}
          </div>
          <div>
            <p>© {store.openingYear} {store.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
