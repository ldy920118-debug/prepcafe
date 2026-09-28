export const OPERATIONS_STORAGE_KEY = "ppomo-operations-records-v1";

export const salesChannels = [
  "매장 POS (대면)",
  "배달의민족 / 쿠팡이츠",
  "전용 테이크아웃 창구",
] as const;

export const menuOptions = [
  { id: "americano", name: "아메리카노", suggestedPrice: 4500 },
  { id: "cafe-latte", name: "카페라떼", suggestedPrice: 5000 },
  { id: "vanilla-latte", name: "바닐라빈 라떼", suggestedPrice: 5800 },
  { id: "cold-brew", name: "콜드브루", suggestedPrice: 5200 },
  { id: "grapefruit-ade", name: "자몽 에이드", suggestedPrice: 6000 },
  { id: "matcha-latte", name: "말차 라떼", suggestedPrice: 5500 },
  { id: "plain-scone", name: "플레인 스콘", suggestedPrice: 3800 },
  { id: "carrot-cake", name: "당근 케이크", suggestedPrice: 6500 },
] as const;

export const materialOptions = [
  { name: "에스프레소 블렌드 원두", unit: "g" },
  { name: "매일 바리스타 우유 1L", unit: "ml" },
  { name: "콜드브루 원액", unit: "ml" },
  { name: "수제 바닐라빈 시럽", unit: "ml" },
  { name: "생과일 자몽청", unit: "g" },
  { name: "탄산수 (캔 190ml)", unit: "캔" },
  { name: "유기농 제주 말차 파우더", unit: "g" },
  { name: "프랑스 엘르앤비르 고메버터", unit: "g" },
  { name: "제과용 유기농 박력분", unit: "kg" },
  { name: "끼리 크림치즈 블록", unit: "g" },
  { name: "생분해 16oz 테이크아웃 컵세트", unit: "세트" },
] as const;

export const expenseCategories = [
  "소모품비",
  "배달 플랫폼 수수료",
  "긴급 식자재 구매",
  "수선유지 및 위생비",
  "기타 잡비",
] as const;

export type SaleRecord = {
  id: string;
  date: string;
  channel: (typeof salesChannels)[number];
  menuId: (typeof menuOptions)[number]["id"];
  quantity: number;
  unitPrice: number;
  discount: number;
  paymentFee: number;
  createdAt: string;
  updatedAt: string;
};

export type ExpenseRecord = {
  id: string;
  date: string;
  item: string;
  category: (typeof expenseCategories)[number];
  amount: number;
  createdAt: string;
  updatedAt: string;
};

export type StoredRecords = {
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
};

export function formatWon(amount: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}

export function getTodayInKorea(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function readStoredRecords(value: string | null): StoredRecords {
  if (!value) return { sales: [], expenses: [] };
  const parsed: unknown = JSON.parse(value);
  if (!parsed || typeof parsed !== "object") return { sales: [], expenses: [] };

  const record = parsed as Partial<StoredRecords>;
  return {
    sales: Array.isArray(record.sales) ? record.sales : [],
    expenses: Array.isArray(record.expenses) ? record.expenses : [],
  };
}

export function saleNetRevenue(quantity: number, unitPrice: number, discount: number): number {
  return quantity * unitPrice - discount;
}
