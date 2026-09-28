export interface SignatureMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  flourOrigin: string;
  saltOrigin: string;
  butterOrigin?: string;
  allergens: string[];
  image: string;
  alt: string;
}

export interface UpcomingMenuCategory {
  category: string;
  items: string[];
}

// TODO: [확인 필요: 전체 메뉴 최저·최고 가격대 확정 시 priceRange 업데이트]
// 현재 확인된 시그니처 메뉴 가격은 3,500원 ~ 4,000원이며, 전체 매장 메뉴의 최종 가격대가 아닙니다.
export const signatureMenus: SignatureMenuItem[] = [
  {
    id: "levain-ciabatta",
    name: "르방 치아바타",
    description: "천연발효종을 넣어 저온 숙성한 치아바타",
    price: 3500,
    ingredients: ["밀가루", "천연발효종", "물", "소금"],
    flourOrigin: "프랑스산·국내산 배합",
    saltOrigin: "국내산",
    allergens: ["밀"],
    image: "/images/menu-ciabatta.webp",
    alt: "천연발효종으로 만든 르방 치아바타와 단면",
  },
  {
    id: "crack-salt-bread",
    name: "크랙 소금빵",
    description: "프랑스산 고메 버터로 만든 겉바속쫀 소금빵",
    price: 3500,
    ingredients: ["밀가루", "버터", "소금", "물"],
    flourOrigin: "프랑스산·국내산 배합",
    butterOrigin: "프랑스산",
    saltOrigin: "국내산",
    allergens: ["밀", "우유"],
    image: "/images/menu-salt-bread.webp",
    alt: "프랑스산 고메 버터로 만든 크랙 소금빵",
  },
  {
    id: "traditional-baguette",
    name: "정통 바게트",
    description: "천연발효종과 저온 발효로 만든 프랑스식 바게트",
    price: 4000,
    ingredients: ["밀가루", "천연발효종", "물", "소금"],
    flourOrigin: "프랑스산",
    saltOrigin: "국내산",
    allergens: ["밀"],
    image: "/images/menu-baguette.webp",
    alt: "프랑스산 밀가루로 만든 정통 바게트",
  },
];

// 가격, 재료, 원산지, 알레르기 미정이므로 이름만 관리
export const upcomingMenus: UpcomingMenuCategory[] = [
  {
    category: "하드롤",
    items: ["핫도그", "누텔라", "깨꿀버터"],
  },
  {
    category: "포카치아",
    items: ["바질토마토"],
  },
  {
    category: "샌드위치",
    items: ["잠봉뵈르", "당근라페", "햄치즈"],
  },
  {
    category: "구움과자",
    items: ["에그타르트", "휘낭시에"],
  },
];
