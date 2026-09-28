export const store = {
  name: "뽀모 베이커리",
  businessType: "테이크아웃 전문 베이커리",
  openingYear: 2027,
  phoneDisplay: "010-4610-1798",
  phoneHref: "tel:01046101798",

  address: null,
  // TODO: [확인 필요: 도로명 전체 주소와 층·호수]

  latitude: null,
  // TODO: [확인 필요: 위도]

  longitude: null,
  // TODO: [확인 필요: 경도]

  reservationUrl: null,
  // TODO: [확인 필요: 예약·온라인 주문 URL과 예약 운영 여부]

  naverDirectionsUrl: null,
  // TODO: 주소와 좌표 확정 후 실제 네이버지도 길찾기 URL 입력

  kakaoDirectionsUrl: null,
  // TODO: 주소와 좌표 확정 후 실제 카카오맵 길찾기 URL 입력

  parking: null,
  // TODO: [확인 필요: 주차장 이름과 매장까지의 도보 시간]

  delivery: {
    available: true,
    platform: null,
    // TODO: [확인 필요: 배달 플랫폼과 주문 URL]
  },

  hours: {
    openDays: ["수", "목", "금", "토", "일"],
    open: "09:00",
    close: "19:00",
    lastOrder: "18:30",
    closedDays: ["월", "화"],
    formattedHours: "수–일 09:00–19:00",
    formattedDetails: "수–일 09:00–19:00 · 라스트오더 18:30 · 월·화 휴무",
    notice: "오후 3시 이후 일부 메뉴가 품절될 수 있으니, 방문 전 전화로 재고를 확인해 주세요.",
  },

  seating: "좌석 없음",
  groupCapacity: "해당 없음",
  serviceType: "포장 전용",
};
