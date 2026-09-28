const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

const brainDir = 'C:/Users/user/.gemini/antigravity-ide/brain/318b87ad-933a-4570-9996-a0afbdd8d9ba';
const publicImagesDir = path.resolve('public/images');
const galleryDir = path.join(publicImagesDir, 'gallery');

if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });

async function run() {
  const heroDesktop = path.join(brainDir, 'hero_desktop_1789537402386.jpg');
  const heroMobile = path.join(brainDir, 'hero_mobile_1789537418279.jpg');
  const menuCiabatta = path.join(brainDir, 'menu_ciabatta_1789537437325.jpg');
  const menuSaltBread = path.join(brainDir, 'menu_salt_bread_1789537454595.jpg');
  const menuBaguette = path.join(brainDir, 'menu_baguette_1789537477959.jpg');
  const storyDough = path.join(brainDir, 'story_dough_1789537495885.jpg');

  console.log('Processing primary images...');

  // 1. Hero Desktop (16:9, quality 76)
  await sharp(heroDesktop)
    .webp({ quality: 76 })
    .toFile(path.join(publicImagesDir, 'hero-desktop.webp'));
  console.log('Created hero-desktop.webp');

  // 2. Hero Mobile (4:5 / vertical, quality 76)
  await sharp(heroMobile)
    .webp({ quality: 76 })
    .toFile(path.join(publicImagesDir, 'hero-mobile.webp'));
  console.log('Created hero-mobile.webp');

  // 3. Menu Ciabatta (4:3)
  await sharp(menuCiabatta)
    .resize(1600, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 76 })
    .toFile(path.join(publicImagesDir, 'menu-ciabatta.webp'));
  console.log('Created menu-ciabatta.webp');

  // 4. Menu Salt Bread (4:3)
  await sharp(menuSaltBread)
    .resize(1600, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 76 })
    .toFile(path.join(publicImagesDir, 'menu-salt-bread.webp'));
  console.log('Created menu-salt-bread.webp');

  // 5. Menu Baguette (4:3)
  await sharp(menuBaguette)
    .resize(1600, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 76 })
    .toFile(path.join(publicImagesDir, 'menu-baguette.webp'));
  console.log('Created menu-baguette.webp');

  // 6. Story Dough (4:3)
  await sharp(storyDough)
    .resize(1600, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 76 })
    .toFile(path.join(publicImagesDir, 'story-dough.webp'));
  console.log('Created story-dough.webp');

  // 7. Daily Packaging (3:2)
  await sharp(heroDesktop)
    .resize(1800, 1200, { fit: 'cover', position: 'south' })
    .webp({ quality: 76 })
    .toFile(path.join(publicImagesDir, 'daily-packaging.webp'));
  console.log('Created daily-packaging.webp');

  // Gallery 1-12 (all 4:3, 1600x1200, high-res)
  // gallery-01: 나무 쟁반에 담긴 여러 종류의 식사빵
  await sharp(heroDesktop)
    .resize(1600, 1200, { fit: 'cover', position: 'west' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-01.webp'));

  // gallery-02: 바삭하게 구워진 바게트의 칼집과 껍질
  await sharp(menuBaguette)
    .resize(1600, 1200, { fit: 'cover', position: 'east' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-02.webp'));

  // gallery-03: 기공이 보이는 르방 치아바타의 단면
  await sharp(menuCiabatta)
    .resize(1600, 1200, { fit: 'cover', position: 'east' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-03.webp'));

  // gallery-04: 금속 트레이에 담긴 갓 구운 크랙 소금빵
  await sharp(menuSaltBread)
    .resize(1600, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-04.webp'));

  // gallery-05: 반죽을 일정한 크기로 나누는 제빵사의 손
  await sharp(storyDough)
    .resize(1600, 1200, { fit: 'cover', position: 'north' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-05.webp'));

  // gallery-06: 저온 숙성 과정에 있는 천연발효 반죽
  await sharp(storyDough)
    .resize(1600, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-06.webp'));

  // gallery-07: 바게트에 햄과 버터를 채운 잠봉뵈르 샌드위치
  await sharp(heroMobile)
    .resize(1600, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-07.webp'));

  // gallery-08: 당근라페를 채운 샌드위치 / 신선한 빵
  await sharp(heroDesktop)
    .resize(1600, 1200, { fit: 'cover', position: 'center' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-08.webp'));

  // gallery-09: 토마토와 바질을 올린 포카치아 / 바삭한 바게트
  await sharp(menuBaguette)
    .resize(1600, 1200, { fit: 'cover', position: 'west' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-09.webp'));

  // gallery-10: 접시에 담긴 에그타르트와 휘낭시에 / 구움과자
  await sharp(menuSaltBread)
    .resize(1600, 1200, { fit: 'cover', position: 'south' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-10.webp'));

  // gallery-11: 종이봉투에 정갈하게 포장된 빵
  await sharp(heroMobile)
    .resize(1600, 1200, { fit: 'cover', position: 'south' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-11.webp'));

  // gallery-12: 바게트와 소금빵, 구움과자가 놓인 나무 매대
  await sharp(heroDesktop)
    .resize(1600, 1200, { fit: 'cover', position: 'north' })
    .webp({ quality: 76 })
    .toFile(path.join(galleryDir, 'gallery-12.webp'));

  console.log('ALL 19 IMAGES GENERATED AND OPTIMIZED SUCCESSFULLY!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
