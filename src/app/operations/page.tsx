import type { Metadata } from "next";
import OperationsApp from "@/components/OperationsApp";

export const metadata: Metadata = {
  title: "매장 운영 기록 | 뽀모",
  description: "시안 기준 자료와 일별 판매·비용 기록을 관리합니다.",
};

export default function OperationsPage() {
  return <OperationsApp />;
}
