"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  expenseCategories,
  formatWon,
  getTodayInKorea,
  materialOptions,
  menuOptions,
  OPERATIONS_STORAGE_KEY,
  readStoredRecords,
  saleNetRevenue,
  salesChannels,
  type ExpenseRecord,
  type SaleRecord,
} from "@/data/operations";

type ActiveTab = "sales" | "expenses";
type SaleDraft = {
  date: string;
  channel: (typeof salesChannels)[number];
  menuId: (typeof menuOptions)[number]["id"];
  quantity: string;
  unitPrice: string;
  discount: string;
  paymentFee: string;
};
type ExpenseDraft = {
  date: string;
  item: string;
  category: (typeof expenseCategories)[number];
  amount: string;
};
type DialogState =
  | { kind: "sale"; id?: string }
  | { kind: "expense"; id?: string }
  | null;
type PendingDelete =
  | { kind: "sale"; record: SaleRecord }
  | { kind: "expense"; record: ExpenseRecord }
  | null;

const inputClass =
  "mt-1 block min-h-11 w-full rounded-lg border border-[#d4c3bc] bg-white px-3 py-2 text-sm text-[#1b1c1a] outline-none transition focus:border-[#5c3d2e] focus:ring-2 focus:ring-[#5c3d2e]/10";
const labelClass = "block text-sm font-semibold text-[#43352f]";
const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#5c3d2e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#472f23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c3d2e] disabled:cursor-not-allowed disabled:opacity-50";
const secondaryButtonClass =
  "inline-flex min-h-10 items-center justify-center rounded-lg border border-[#d4c3bc] bg-white px-3 py-2 text-sm font-semibold text-[#5c3d2e] transition hover:bg-[#f5f3f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c3d2e]";

function blankSale(): SaleDraft {
  return {
    date: getTodayInKorea(),
    channel: salesChannels[0],
    menuId: menuOptions[0].id,
    quantity: "1",
    unitPrice: String(menuOptions[0].suggestedPrice),
    discount: "0",
    paymentFee: "0",
  };
}

function blankExpense(): ExpenseDraft {
  return {
    date: getTodayInKorea(),
    item: "",
    category: expenseCategories[0],
    amount: "",
  };
}

function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function menuName(menuId: SaleRecord["menuId"]): string {
  return menuOptions.find((menu) => menu.id === menuId)?.name ?? "알 수 없는 메뉴";
}

function dateLabel(date: string): string {
  return date.replaceAll("-", ".");
}

export default function OperationsApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("sales");
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null);
  const [saleDraft, setSaleDraft] = useState<SaleDraft>(blankSale);
  const [expenseDraft, setExpenseDraft] = useState<ExpenseDraft>(blankExpense);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState("");
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);

  useEffect(() => {
    try {
      const data = readStoredRecords(window.localStorage.getItem(OPERATIONS_STORAGE_KEY));
      setSales(data.sales);
      setExpenses(data.expenses);
    } catch {
      setStorageError("저장된 기록을 읽지 못했습니다. 이 브라우저의 저장 공간을 확인해 주세요.");
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!dialog) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !savingRef.current) setDialog(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dialog]);

  const menu = useMemo(
    () => menuOptions.find((item) => item.id === saleDraft.menuId) ?? menuOptions[0],
    [saleDraft.menuId],
  );
  const saleGross = Number(saleDraft.quantity || 0) * Number(saleDraft.unitPrice || 0);
  const saleNet = saleGross - Number(saleDraft.discount || 0);

  function persist(nextSales: SaleRecord[], nextExpenses: ExpenseRecord[]): boolean {
    try {
      window.localStorage.setItem(
        OPERATIONS_STORAGE_KEY,
        JSON.stringify({ sales: nextSales, expenses: nextExpenses }),
      );
      setSales(nextSales);
      setExpenses(nextExpenses);
      setStorageError("");
      return true;
    } catch {
      setStorageError("브라우저에 저장하지 못했습니다. 저장 공간을 확인한 뒤 다시 시도해 주세요.");
      return false;
    }
  }

  function openSaleDialog(record?: SaleRecord) {
    setFormError("");
    setNotice("");
    if (record) {
      setSaleDraft({
        date: record.date,
        channel: record.channel,
        menuId: record.menuId,
        quantity: String(record.quantity),
        unitPrice: String(record.unitPrice),
        discount: String(record.discount),
        paymentFee: String(record.paymentFee),
      });
      setDialog({ kind: "sale", id: record.id });
    } else {
      setSaleDraft(blankSale());
      setDialog({ kind: "sale" });
    }
  }

  function openExpenseDialog(record?: ExpenseRecord) {
    setFormError("");
    setNotice("");
    if (record) {
      setExpenseDraft({
        date: record.date,
        item: record.item,
        category: record.category,
        amount: String(record.amount),
      });
      setDialog({ kind: "expense", id: record.id });
    } else {
      setExpenseDraft(blankExpense());
      setDialog({ kind: "expense" });
    }
  }

  function saveSale(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingRef.current) return;
    const quantity = Number(saleDraft.quantity);
    const unitPrice = Number(saleDraft.unitPrice);
    const discount = Number(saleDraft.discount);
    const paymentFee = Number(saleDraft.paymentFee);
    const gross = quantity * unitPrice;

    if (!saleDraft.date || !saleDraft.channel || !saleDraft.menuId) {
      setFormError("날짜, 채널, 메뉴를 모두 입력해 주세요.");
      return;
    }
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      setFormError("판매 수량은 1개 이상의 정수로 입력해 주세요.");
      return;
    }
    if (!Number.isSafeInteger(unitPrice) || unitPrice < 0) {
      setFormError("판매 단가는 0원 이상의 정수로 입력해 주세요.");
      return;
    }
    if (!Number.isSafeInteger(discount) || discount < 0 || discount > gross) {
      setFormError("할인액은 0원 이상, 총 판매액 이하로 입력해 주세요.");
      return;
    }
    if (!Number.isSafeInteger(paymentFee) || paymentFee < 0) {
      setFormError("결제 수수료는 실제 금액을 0원 이상으로 입력해 주세요.");
      return;
    }

    savingRef.current = true;
    setSaving(true);
    const now = new Date().toISOString();
    const previous = dialog?.kind === "sale" && dialog.id
      ? sales.find((record) => record.id === dialog.id)
      : undefined;
    const nextRecord: SaleRecord = {
      id: previous?.id ?? makeId(),
      date: saleDraft.date,
      channel: saleDraft.channel,
      menuId: saleDraft.menuId,
      quantity,
      unitPrice,
      discount,
      paymentFee,
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
    };
    const nextSales = previous
      ? sales.map((record) => (record.id === previous.id ? nextRecord : record))
      : [nextRecord, ...sales];

    if (persist(nextSales, expenses)) {
      setDialog(null);
      setNotice(previous ? "판매 기록을 수정하고 저장했습니다." : "판매 기록을 저장했습니다.");
    }
    savingRef.current = false;
    setSaving(false);
  }

  function saveExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingRef.current) return;
    const amount = Number(expenseDraft.amount);
    if (!expenseDraft.date || !expenseDraft.item.trim() || !expenseDraft.category) {
      setFormError("날짜, 비용 항목, 비용 구분을 모두 입력해 주세요.");
      return;
    }
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      setFormError("비용 금액은 1원 이상의 정수로 입력해 주세요.");
      return;
    }

    savingRef.current = true;
    setSaving(true);
    const now = new Date().toISOString();
    const previous = dialog?.kind === "expense" && dialog.id
      ? expenses.find((record) => record.id === dialog.id)
      : undefined;
    const nextRecord: ExpenseRecord = {
      id: previous?.id ?? makeId(),
      date: expenseDraft.date,
      item: expenseDraft.item.trim(),
      category: expenseDraft.category,
      amount,
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
    };
    const nextExpenses = previous
      ? expenses.map((record) => (record.id === previous.id ? nextRecord : record))
      : [nextRecord, ...expenses];

    if (persist(sales, nextExpenses)) {
      setDialog(null);
      setNotice(previous ? "비용 기록을 수정하고 저장했습니다." : "비용 기록을 저장했습니다.");
    }
    savingRef.current = false;
    setSaving(false);
  }

  function deleteSale(record: SaleRecord) {
    setPendingDelete({ kind: "sale", record });
  }

  function deleteExpense(record: ExpenseRecord) {
    setPendingDelete({ kind: "expense", record });
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    if (pendingDelete.kind === "sale") {
      const nextSales = sales.filter((item) => item.id !== pendingDelete.record.id);
      if (persist(nextSales, expenses)) {
        setNotice("판매 기록을 삭제했습니다.");
        setPendingDelete(null);
      }
      return;
    }
    const nextExpenses = expenses.filter((item) => item.id !== pendingDelete.record.id);
    if (persist(sales, nextExpenses)) {
      setNotice("비용 기록을 삭제했습니다.");
      setPendingDelete(null);
    }
  }

  const sortedSales = [...sales].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
  const sortedExpenses = [...expenses].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));

  return (
    <main className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a]">
      <div className="border-b border-[#5c3d2e] bg-[#43271a] px-4 py-2 text-center text-xs font-medium text-[#f9eee7] sm:text-sm">
        데모 운영 기록 · 판매와 비용은 이 브라우저에 저장됩니다. 실제 운영 자료 대신 검증용 값을 사용해 주세요.
      </div>
      <header className="border-b border-[#e4ddd7] bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5c3d2e] text-xl font-bold text-white">P</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a7064]">Ppomo · Store operations</p>
              <h1 className="mt-0.5 text-xl font-bold tracking-tight sm:text-2xl">매장 운영 기록</h1>
            </div>
            <span className="hidden rounded-full bg-[#f5eee8] px-3 py-1 text-xs font-semibold text-[#6b4330] sm:inline-flex">데모</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-2 text-xs font-medium text-[#6d625c]">
              <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
              {loaded ? "이 브라우저에 저장" : "저장 자료 확인 중"}
            </span>
            <button className={secondaryButtonClass} type="button" onClick={() => openSaleDialog()}>
              <span aria-hidden="true">＋</span> 판매 입력
            </button>
            <button className={primaryButtonClass} type="button" onClick={() => openExpenseDialog()}>
              <span aria-hidden="true">＋</span> 비용 전표 입력
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section aria-label="기록 요약" className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <SummaryCard label="판매 기록" value={`${sales.length}건`} detail="입력·수정·삭제" />
          <SummaryCard label="비용 기록" value={`${expenses.length}건`} detail="날짜별 지출 전표" />
          <SummaryCard label="메뉴 · 채널" value={`${menuOptions.length} · ${salesChannels.length}`} detail="시안 예시 기준 자료" />
          <SummaryCard label="재료 기준 자료" value={`${materialOptions.length}종`} detail="목록만 제공 · 재고 관리 미포함" />
        </section>

        {storageError && (
          <p role="alert" className="mt-4 rounded-lg border border-[#e8b3ac] bg-[#fff0ed] px-4 py-3 text-sm text-[#8d2e24]">
            {storageError}
          </p>
        )}
        {notice && !storageError && (
          <p role="status" className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
            {notice}
          </p>
        )}

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#e4ddd7] bg-white shadow-[0_4px_16px_-2px_rgba(92,61,46,0.06)]">
          <div className="flex flex-col gap-4 border-b border-[#eae8e5] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a7064]">Daily records</p>
              <h2 className="mt-1 text-lg font-bold">판매와 비용 기록</h2>
            </div>
            <div role="tablist" aria-label="기록 종류" className="inline-flex w-fit rounded-xl bg-[#f5f3f0] p-1">
              <button
                id="sales-tab"
                type="button"
                role="tab"
                aria-selected={activeTab === "sales"}
                aria-controls="records-panel"
                onClick={() => { setActiveTab("sales"); setNotice(""); }}
                className={`min-h-10 rounded-lg px-4 text-sm font-semibold transition ${activeTab === "sales" ? "bg-white text-[#43271a] shadow-sm" : "text-[#70635c] hover:text-[#43271a]"}`}
              >판매 기록 <span className="ml-1 text-xs opacity-70">{sales.length}</span></button>
              <button
                id="expenses-tab"
                type="button"
                role="tab"
                aria-selected={activeTab === "expenses"}
                aria-controls="records-panel"
                onClick={() => { setActiveTab("expenses"); setNotice(""); }}
                className={`min-h-10 rounded-lg px-4 text-sm font-semibold transition ${activeTab === "expenses" ? "bg-white text-[#43271a] shadow-sm" : "text-[#70635c] hover:text-[#43271a]"}`}
              >비용 전표 <span className="ml-1 text-xs opacity-70">{expenses.length}</span></button>
            </div>
          </div>

          <div id="records-panel" role="tabpanel" aria-labelledby={activeTab === "sales" ? "sales-tab" : "expenses-tab"} className="p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-base font-bold">{activeTab === "sales" ? "일일 판매 내역" : "날짜별 비용 지출"}</h3>
                <p className="mt-1 text-sm text-[#756963]">
                  {activeTab === "sales"
                    ? "수량·실제 단가·할인·실제 결제 수수료를 기록합니다."
                    : "비용 항목·구분·금액을 입력하고 날짜별로 보관합니다."}
                </p>
              </div>
              <button className={secondaryButtonClass} type="button" onClick={() => activeTab === "sales" ? openSaleDialog() : openExpenseDialog()}>
                ＋ {activeTab === "sales" ? "판매 기록 추가" : "비용 기록 추가"}
              </button>
            </div>

            {!loaded ? (
              <div className="rounded-xl border border-dashed border-[#d4c3bc] px-5 py-12 text-center text-sm text-[#756963]" role="status">저장된 기록을 불러오는 중입니다…</div>
            ) : activeTab === "sales" ? (
              <SalesTable records={sortedSales} onEdit={openSaleDialog} onDelete={deleteSale} onAdd={() => openSaleDialog()} />
            ) : (
              <ExpensesTable records={sortedExpenses} onEdit={openExpenseDialog} onDelete={deleteExpense} onAdd={() => openExpenseDialog()} />
            )}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e4ddd7] bg-white p-4 shadow-[0_4px_16px_-2px_rgba(92,61,46,0.04)] sm:p-6" aria-labelledby="master-data-title">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a7064]">Reference data</p>
              <h2 id="master-data-title" className="mt-1 text-base font-bold">시안 예시 기준 자료</h2>
            </div>
            <p className="text-xs text-[#756963]">첨부 판매 이력은 불러오지 않았습니다.</p>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <MasterList title={`메뉴 ${menuOptions.length}`} items={menuOptions.map((item) => item.name)} />
            <MasterList title={`판매 채널 ${salesChannels.length}`} items={[...salesChannels]} />
            <MasterList title={`재료 ${materialOptions.length}`} items={materialOptions.map((item) => `${item.name} · ${item.unit}`)} />
          </div>
        </section>

        <p className="mt-5 text-xs leading-5 text-[#81756e]">
          지금은 브라우저별 데모 저장입니다. 다른 기기와 공유되는 운영 데이터베이스 연결은 설정되어 있지 않습니다.
        </p>
      </div>

      {dialog?.kind === "sale" && (
        <Dialog title={dialog.id ? "판매 기록 수정" : "판매 기록 입력"} onClose={() => !saving && setDialog(null)}>
          <form onSubmit={saveSale} className="space-y-4" noValidate>
            <FormField label="판매 일자" htmlFor="sale-date">
              <input id="sale-date" className={inputClass} type="date" required value={saleDraft.date} onChange={(event) => setSaleDraft({ ...saleDraft, date: event.target.value })} />
            </FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="판매 채널" htmlFor="sale-channel">
                <select id="sale-channel" className={inputClass} value={saleDraft.channel} onChange={(event) => setSaleDraft({ ...saleDraft, channel: event.target.value as SaleDraft["channel"] })}>
                  {salesChannels.map((channel) => <option key={channel} value={channel}>{channel}</option>)}
                </select>
              </FormField>
              <FormField label="메뉴" htmlFor="sale-menu">
                <select id="sale-menu" className={inputClass} value={saleDraft.menuId} onChange={(event) => {
                  const selected = menuOptions.find((item) => item.id === event.target.value) ?? menuOptions[0];
                  setSaleDraft({ ...saleDraft, menuId: selected.id, unitPrice: String(selected.suggestedPrice) });
                }}>
                  {menuOptions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </FormField>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="판매 수량" htmlFor="sale-quantity" hint="1개 이상의 정수">
                <input id="sale-quantity" className={inputClass} type="number" inputMode="numeric" min="1" step="1" required value={saleDraft.quantity} onChange={(event) => setSaleDraft({ ...saleDraft, quantity: event.target.value })} />
              </FormField>
              <FormField label="개당 실제 단가" htmlFor="sale-unit-price">
                <input id="sale-unit-price" className={inputClass} type="number" inputMode="numeric" min="0" step="1" required value={saleDraft.unitPrice} onChange={(event) => setSaleDraft({ ...saleDraft, unitPrice: event.target.value })} />
              </FormField>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="할인액" htmlFor="sale-discount" hint="총 판매액 이하">
                <input id="sale-discount" className={inputClass} type="number" inputMode="numeric" min="0" step="1" required value={saleDraft.discount} onChange={(event) => setSaleDraft({ ...saleDraft, discount: event.target.value })} />
              </FormField>
              <FormField label="실제 결제 수수료" htmlFor="sale-fee" hint="수수료율을 추정하지 않습니다">
                <input id="sale-fee" className={inputClass} type="number" inputMode="numeric" min="0" step="1" required value={saleDraft.paymentFee} onChange={(event) => setSaleDraft({ ...saleDraft, paymentFee: event.target.value })} />
              </FormField>
            </div>
            <div className="rounded-xl border border-[#eadfd7] bg-[#fbf9f6] p-4" aria-live="polite">
              <div className="flex items-center justify-between text-sm text-[#62544c]"><span>순매출 미리보기</span><span className="font-bold tabular-nums text-[#43271a]">{Number.isFinite(saleNet) && saleNet >= 0 ? formatWon(saleNet) : "금액 확인 필요"}</span></div>
              <p className="mt-1 text-xs text-[#81756e]">{menu.name} · {formatWon(Number(saleDraft.quantity || 0) * Number(saleDraft.unitPrice || 0))} − 할인 {formatWon(Number(saleDraft.discount || 0))}</p>
            </div>
            {formError && <p role="alert" className="rounded-lg bg-[#fff0ed] px-3 py-2 text-sm text-[#8d2e24]">{formError}</p>}
            {storageError && <p role="alert" className="rounded-lg bg-[#fff0ed] px-3 py-2 text-sm text-[#8d2e24]">{storageError}</p>}
            <div className="flex justify-end gap-2 border-t border-[#eee8e3] pt-4">
              <button className={secondaryButtonClass} type="button" onClick={() => setDialog(null)} disabled={saving}>취소</button>
              <button className={primaryButtonClass} type="submit" disabled={saving}>{saving ? "저장 중…" : dialog.id ? "수정 내용 저장" : "판매 기록 저장"}</button>
            </div>
          </form>
        </Dialog>
      )}

      {dialog?.kind === "expense" && (
        <Dialog title={dialog.id ? "비용 기록 수정" : "비용 전표 입력"} onClose={() => !saving && setDialog(null)}>
          <form onSubmit={saveExpense} className="space-y-4" noValidate>
            <FormField label="비용 날짜" htmlFor="expense-date">
              <input id="expense-date" className={inputClass} type="date" required value={expenseDraft.date} onChange={(event) => setExpenseDraft({ ...expenseDraft, date: event.target.value })} />
            </FormField>
            <FormField label="비용 항목" htmlFor="expense-item">
              <input id="expense-item" className={inputClass} type="text" maxLength={120} required placeholder="예: 냅킨 및 스트로우 구매" value={expenseDraft.item} onChange={(event) => setExpenseDraft({ ...expenseDraft, item: event.target.value })} />
            </FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="비용 구분" htmlFor="expense-category">
                <select id="expense-category" className={inputClass} value={expenseDraft.category} onChange={(event) => setExpenseDraft({ ...expenseDraft, category: event.target.value as ExpenseDraft["category"] })}>
                  {expenseCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </FormField>
              <FormField label="비용 금액" htmlFor="expense-amount" hint="1원 이상의 정수">
                <input id="expense-amount" className={inputClass} type="number" inputMode="numeric" min="1" step="1" required placeholder="예: 1000" value={expenseDraft.amount} onChange={(event) => setExpenseDraft({ ...expenseDraft, amount: event.target.value })} />
              </FormField>
            </div>
            {formError && <p role="alert" className="rounded-lg bg-[#fff0ed] px-3 py-2 text-sm text-[#8d2e24]">{formError}</p>}
            {storageError && <p role="alert" className="rounded-lg bg-[#fff0ed] px-3 py-2 text-sm text-[#8d2e24]">{storageError}</p>}
            <div className="flex justify-end gap-2 border-t border-[#eee8e3] pt-4">
              <button className={secondaryButtonClass} type="button" onClick={() => setDialog(null)} disabled={saving}>취소</button>
              <button className={primaryButtonClass} type="submit" disabled={saving}>{saving ? "저장 중…" : dialog.id ? "수정 내용 저장" : "비용 기록 저장"}</button>
            </div>
          </form>
        </Dialog>
      )}

      {pendingDelete && (
        <Dialog title="기록 삭제 확인" onClose={() => setPendingDelete(null)}>
          <p className="text-sm leading-6 text-[#62544c]">
            {pendingDelete.kind === "sale"
              ? `${menuName(pendingDelete.record.menuId)} 판매 기록을 삭제할까요?`
              : `“${pendingDelete.record.item}” 비용 기록을 삭제할까요?`}
          </p>
          <p className="mt-2 text-xs text-[#81756e]">삭제하면 이 브라우저의 기록 목록에서 제거됩니다.</p>
          <div className="mt-5 flex justify-end gap-2 border-t border-[#eee8e3] pt-4">
            <button className={secondaryButtonClass} type="button" onClick={() => setPendingDelete(null)}>취소</button>
            <button className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#f1c8c4] bg-[#fff0ed] px-4 py-2 text-sm font-semibold text-[#9b3931] hover:bg-[#ffe4e0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b3931]" type="button" onClick={confirmDelete}>삭제</button>
          </div>
        </Dialog>
      )}
    </main>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="min-h-[104px] rounded-xl border border-[#e4ddd7] bg-white p-4 shadow-[0_2px_8px_-2px_rgba(92,61,46,0.04)] sm:p-5">
      <p className="text-xs font-semibold text-[#756963]">{label}</p>
      <div className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-[#43271a]">{value}</div>
      <p className="mt-1 text-[11px] text-[#81756e]">{detail}</p>
    </div>
  );
}

function MasterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-[#51433b]">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => <li key={item} className="rounded-full border border-[#eae3db] bg-[#fbf9f6] px-3 py-1.5 text-xs text-[#574a43]">{item}</li>)}
      </ul>
    </div>
  );
}

function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-[#d4c3bc] bg-[#fbf9f6] px-5 py-12 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-[#795746] shadow-sm" aria-hidden="true">＋</div>
      <h4 className="mt-3 text-sm font-bold text-[#43352f]">{title}</h4>
      <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-[#756963]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

function SalesTable({ records, onEdit, onDelete, onAdd }: { records: SaleRecord[]; onEdit: (record: SaleRecord) => void; onDelete: (record: SaleRecord) => void; onAdd: () => void }) {
  if (!records.length) {
    return <EmptyState title="아직 판매 기록이 없습니다" description="검증용 판매 한 건을 입력하면 이 목록에 저장됩니다. 첨부된 과거 판매 이력은 시작 자료에 포함하지 않았습니다." action={<button type="button" className={secondaryButtonClass} onClick={onAdd}>판매 기록 입력</button>} />;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-[#eae3db]">
      <table className="w-full min-w-[860px] border-collapse text-left text-sm">
        <thead className="bg-[#f5f3f0] text-xs font-semibold text-[#6f625b]"><tr>
          <th className="px-4 py-3">일자</th><th className="px-4 py-3">판매 채널</th><th className="px-4 py-3">메뉴</th>
          <th className="px-4 py-3 text-right">수량</th><th className="px-4 py-3 text-right">개당 단가</th><th className="px-4 py-3 text-right">할인</th>
          <th className="px-4 py-3 text-right">순매출</th><th className="px-4 py-3 text-right">실제 수수료</th><th className="px-4 py-3 text-right">관리</th>
        </tr></thead>
        <tbody className="divide-y divide-[#eee8e3]">
          {records.map((record) => <tr key={record.id} className="transition hover:bg-[#fbf9f6]">
            <td className="whitespace-nowrap px-4 py-3 text-[#62544c]">{dateLabel(record.date)}</td>
            <td className="whitespace-nowrap px-4 py-3"><span className="rounded-full bg-[#f5eee8] px-2.5 py-1 text-xs font-medium text-[#654632]">{record.channel}</span></td>
            <td className="whitespace-nowrap px-4 py-3 font-semibold">{menuName(record.menuId)}</td>
            <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{record.quantity}</td>
            <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{formatWon(record.unitPrice)}</td>
            <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{formatWon(record.discount)}</td>
            <td className="whitespace-nowrap px-4 py-3 text-right font-bold tabular-nums text-[#43271a]">{formatWon(saleNetRevenue(record.quantity, record.unitPrice, record.discount))}</td>
            <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{formatWon(record.paymentFee)}</td>
            <td className="whitespace-nowrap px-4 py-3 text-right"><RecordActions label={`${menuName(record.menuId)} 판매 기록`} onEdit={() => onEdit(record)} onDelete={() => onDelete(record)} /></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

function ExpensesTable({ records, onEdit, onDelete, onAdd }: { records: ExpenseRecord[]; onEdit: (record: ExpenseRecord) => void; onDelete: (record: ExpenseRecord) => void; onAdd: () => void }) {
  if (!records.length) {
    return <EmptyState title="아직 비용 전표가 없습니다" description="검증용 비용 기록을 추가하면 날짜·항목·구분·금액이 이 목록에 저장됩니다." action={<button type="button" className={secondaryButtonClass} onClick={onAdd}>비용 전표 입력</button>} />;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-[#eae3db]">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <thead className="bg-[#f5f3f0] text-xs font-semibold text-[#6f625b]"><tr><th className="px-4 py-3">일자</th><th className="px-4 py-3">비용 항목</th><th className="px-4 py-3">비용 구분</th><th className="px-4 py-3 text-right">금액</th><th className="px-4 py-3 text-right">관리</th></tr></thead>
        <tbody className="divide-y divide-[#eee8e3]">{records.map((record) => <tr key={record.id} className="transition hover:bg-[#fbf9f6]">
          <td className="whitespace-nowrap px-4 py-3 text-[#62544c]">{dateLabel(record.date)}</td>
          <td className="px-4 py-3 font-semibold">{record.item}</td>
          <td className="whitespace-nowrap px-4 py-3"><span className="rounded-full bg-[#f5f3f0] px-2.5 py-1 text-xs font-medium text-[#62544c]">{record.category}</span></td>
          <td className="whitespace-nowrap px-4 py-3 text-right font-bold tabular-nums text-[#43271a]">{formatWon(record.amount)}</td>
          <td className="whitespace-nowrap px-4 py-3 text-right"><RecordActions label={`${record.item} 비용 기록`} onEdit={() => onEdit(record)} onDelete={() => onDelete(record)} /></td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}

function RecordActions({ label, onEdit, onDelete }: { label: string; onEdit: () => void; onDelete: () => void }) {
  return <div className="inline-flex items-center gap-1">
    <button type="button" className="min-h-9 rounded-md px-2 text-xs font-semibold text-[#5c3d2e] hover:bg-[#f5eee8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5c3d2e]" aria-label={`${label} 수정`} onClick={onEdit}>수정</button>
    <button type="button" className="min-h-9 rounded-md px-2 text-xs font-semibold text-[#9b3931] hover:bg-[#fff0ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9b3931]" aria-label={`${label} 삭제`} onClick={onDelete}>삭제</button>
  </div>;
}

function FormField({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: ReactNode }) {
  return <div><label className={labelClass} htmlFor={htmlFor}>{label}</label>{children}{hint && <p className="mt-1 text-xs text-[#81756e]">{hint}</p>}</div>;
}

function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1e293b]/45 p-3 backdrop-blur-[2px] sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="record-dialog-title" className="my-auto max-h-[calc(100vh-1.5rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#e4ddd7] bg-white shadow-[0_20px_35px_-8px_rgba(92,61,46,0.15)] sm:max-h-[calc(100vh-3rem)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eae8e5] bg-white px-5 py-4 sm:px-6">
          <h2 id="record-dialog-title" className="text-lg font-bold text-[#43271a]">{title}</h2>
          <button type="button" onClick={onClose} aria-label="입력창 닫기" className="flex h-10 w-10 items-center justify-center rounded-lg text-xl text-[#756963] hover:bg-[#f5f3f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5c3d2e]">×</button>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </section>
    </div>
  );
}
