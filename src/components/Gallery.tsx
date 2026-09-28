"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { galleryItems } from "@/data/gallery";

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update current slide index on scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24
      : 320;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setCurrentIndex(Math.min(Math.max(newIndex, 0), galleryItems.length - 1));
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const targetChild = container.children[index] as HTMLElement;
    if (targetChild) {
      targetChild.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handlePrev = () => {
    const prev = Math.max(currentIndex - 1, 0);
    scrollToSlide(prev);
  };

  const handleNext = () => {
    const next = Math.min(currentIndex + 1, galleryItems.length - 1);
    scrollToSlide(next);
  };

  return (
    <section
      id="gallery"
      className="py-section-lg bg-cream text-wood border-b border-wood/10 overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-container mx-auto px-6">
        {/* Header & Navigation Bar */}
        <div className="mb-header-mobile md:mb-header-desktop flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2
              id="gallery-heading"
              className="text-h2 font-serif font-bold text-wood mb-title-sub"
            >
              뽀모의 빵과 매대
            </h2>
            <p className="text-lead text-wood/80 font-normal">
              매일 아침 정성껏 구워내는 빵과 따뜻한 매대 풍경
            </p>
          </div>

          {/* Progress Indicator & Controls */}
          <div className="flex items-center gap-4">
            <span
              className="text-sub font-medium text-wood/80 tabular-nums select-none"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="font-bold text-wood">{currentIndex + 1}</span> /{" "}
              {galleryItems.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="accessible-link justify-center rounded border border-wood/20 bg-cream text-wood p-2 hover:bg-wood/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="이전 사진 보기"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === galleryItems.length - 1}
                className="accessible-link justify-center rounded border border-wood/20 bg-cream text-wood p-2 hover:bg-wood/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="다음 사진 보기"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Horizontal Scroll Gallery:
        - All images 4:3
        - First image aligns with main content container
        - Mobile peeks next image ~20%
        - Scroll snap
      */}
      <div
        ref={scrollRef}
        tabIndex={0}
        aria-label="빵과 매대 갤러리 가로 스크롤 (화살표 키로 탐색 가능)"
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 lg:px-[max(1.5rem,calc((100vw-1160px)/2+1.5rem))] focus-visible:outline-2 py-2"
      >
        {galleryItems.map((item, idx) => (
          <figure
            key={item.id}
            className="w-[80vw] sm:w-[360px] md:w-[420px] shrink-0 snap-start flex flex-col"
          >
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-wood/5 shadow-sm">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 80vw, 420px"
                className="object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-caption text-wood/75 baseline">
              <span className="font-medium text-wood/90 mr-2">
                {String(idx + 1).padStart(2, "0")}.
              </span>
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
