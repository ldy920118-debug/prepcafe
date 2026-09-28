async function test() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  const checks = [
    '뽀모 베이커리',
    '브랜드 이야기',
    '시그니처 메뉴',
    '일상의 빵',
    '뽀모의 빵과 매대',
    '매장 안내',
    '르방 치아바타',
    '크랙 소금빵',
    '정통 바게트',
    '010-4610-1798',
    'tel:01046101798',
    'hero-desktop.webp',
    'hero-mobile.webp',
    'menu-ciabatta.webp',
    'menu-salt-bread.webp',
    'menu-baguette.webp',
    'story-dough.webp',
    'daily-packaging.webp',
    'gallery-01.webp',
    'gallery-12.webp',
    '3,500',
    '4,000',
    '수–일 09:00–19:00',
    '라스트오더 18:30'
  ];

  console.log('--- HTML CONTENT VERIFICATION ---');
  let allPass = true;
  for (const c of checks) {
    const ok = html.includes(c);
    console.log(`[${ok ? 'PASS' : 'FAIL'}] ${c}`);
    if (!ok) allPass = false;
  }

  // Confirm NO unverified items are rendered
  const negativeChecks = [
    '베스트셀러',
    '가장 인기 있는',
    '소화불량을 개선하는',
    '소화가 잘되는',
    '장 건강에 좋은',
    '건강 효과가 입증된',
    '먹으면 속이 편해지는',
    'href="#"'
  ];

  console.log('--- NEGATIVE CHECK (PROHIBITIONS) ---');
  for (const n of negativeChecks) {
    const found = html.includes(n);
    console.log(`[${!found ? 'PASS (NOT FOUND)' : 'FAIL (FOUND)'}] ${n}`);
    if (found) allPass = false;
  }

  console.log(`\nOverall Result: ${allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
}

test().catch(console.error);
