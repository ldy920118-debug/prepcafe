export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cream focus:text-wood focus:border-2 focus:border-orange focus:rounded focus:shadow-lg text-body font-medium transition"
    >
      본문 바로가기
    </a>
  );
}
