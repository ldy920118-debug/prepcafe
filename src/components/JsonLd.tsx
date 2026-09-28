import { store } from "@/data/store";

export default function JsonLd() {
  // 주소와 좌표가 확정됐을 때만 Restaurant JSON-LD 출력
  if (!store.address || !store.latitude || !store.longitude) {
    return null;
  }

  // TODO: [확인 필요: 전체 메뉴 가격대 확정 시 priceRange 보완 (현재 시그니처 3,500원 ~ 4,000원)]
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "Restaurant"],
    name: store.name,
    telephone: store.phoneDisplay,
    servesCuisine: "Bakery",
    priceRange: "₩₩",
    acceptsReservations: Boolean(store.reservationUrl),
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address,
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: store.latitude,
      longitude: store.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
