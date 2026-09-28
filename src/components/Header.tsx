"use client";

import { useState, useEffect } from "react";
import { store } from "@/data/store";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "브랜드 이야기", href: "#story" },
  { label: "시그니처 메뉴", href: "#menu" },
  { label: "일상의 빵", href: "#daily" },
  { label: "뽀모의 빵과 매대", href: "#gallery" },
  { label: "매장 안내", href: "#visit" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? "bg-[#FFF7EC]/95 backdrop-blur-md border-b border-[#2E2118]/10 shadow-sm"
          : "bg-transparent text-cream"
      }`}
    >
      <div className="max-w-container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Name */}
        <a
          href="/"
          className={`accessible-link text-h3 font-serif font-bold tracking-tight transition-colors ${
            isScrolled ? "text-wood" : "text-cream drop-shadow-sm"
          }`}
          aria-label={`${store.name} 홈으로 이동`}
        >
          {store.name}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`accessible-link text-sub font-medium transition-colors hover:text-orange ${
                isScrolled ? "text-wood" : "text-cream drop-shadow-sm hover:text-cream/80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Header CTA (Minimum 152x44px, text >= 14px) */}
        <div className="hidden lg:flex items-center">
          {/* 
            TODO: store.reservationUrl 확정 시 "예약하기" <a> 활성화
            TODO: store.naverDirectionsUrl / kakaoDirectionsUrl 확정 시 "길찾기" <a> 활성화
          */}
          <a
            href={store.phoneHref}
            className="accessible-link min-w-[152px] justify-center px-5 py-2.5 rounded bg-orange text-cream font-medium text-sub transition-transform active:scale-95 shadow-sm hover:brightness-105"
            aria-label={`전화 문의하기 (${store.phoneDisplay})`}
          >
            전화 문의
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden accessible-link justify-center rounded p-2 focus-visible:outline-2 ${
            isScrolled ? "text-wood" : "text-cream"
          }`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-cream/98 backdrop-blur-lg border-t border-wood/10 p-6 flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="모바일 내비게이션 메뉴"
        >
          <nav className="flex flex-col gap-2 pt-4" aria-label="모바일 메뉴 목록">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="accessible-link text-h3 font-serif font-semibold text-wood py-3 border-b border-wood/10 transition-colors hover:text-orange"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-8 pb-12">
            <a
              href={store.phoneHref}
              onClick={() => setIsMobileMenuOpen(false)}
              className="accessible-link w-full justify-center py-3.5 rounded bg-orange text-cream font-medium text-lead shadow-sm text-center"
            >
              전화 문의 ({store.phoneDisplay})
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
