import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import SignatureMenu from "@/components/SignatureMenu";
import DailyBread from "@/components/DailyBread";
import Gallery from "@/components/Gallery";
import StoreGuide from "@/components/StoreGuide";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="focus:outline-none">
        {/* 히어로: 88svh 풀블리드 푸드 비주얼 */}
        <Hero />

        {/* 브랜드 이야기: 왜 다른가 (천연발효종과 저온 숙성 원칙) */}
        <BrandStory />

        {/* 시그니처 메뉴: 무엇을 먹나 (3종 시그니처 & 준비 중인 메뉴) */}
        <SignatureMenu />

        {/* 일상의 빵: 누가 오나 (가족과 일상을 위한 빵) */}
        <DailyBread />

        {/* 뽀모의 빵과 매대: 매일 아침 구워내는 빵과 매대 갤러리 */}
        <Gallery />

        {/* 매장 안내: 어떻게 가나 (영업시간, 테이크아웃 안내) */}
        <StoreGuide />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
