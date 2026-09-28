import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF7EC",
        wood: "#2E2118",
        orange: "#D9652B",
        alert: "#9B2C2C",
      },
      fontSize: {
        display: [
          "clamp(42px, 7vw, 72px)",
          {
            lineHeight: "1.18",
            letterSpacing: "-0.02em",
          },
        ],
        h2: [
          "clamp(32px, 4.5vw, 48px)",
          {
            lineHeight: "1.32",
            letterSpacing: "-0.02em",
          },
        ],
        h3: [
          "clamp(22px, 3vw, 28px)",
          {
            lineHeight: "1.36",
            letterSpacing: "-0.02em",
          },
        ],
        lead: [
          "18px",
          {
            lineHeight: "1.70",
            letterSpacing: "0",
          },
        ],
        body: [
          "16px",
          {
            lineHeight: "1.70",
            letterSpacing: "0",
          },
        ],
        sub: [
          "15px",
          {
            lineHeight: "1.70",
            letterSpacing: "0",
          },
        ],
        caption: [
          "13px",
          {
            lineHeight: "1.55",
            letterSpacing: "0",
          },
        ],
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Noto Serif KR", "Nanum Myeongjo", "Batang", "serif"],
        sans: [
          "var(--font-sans)",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1160px",
      },
      spacing: {
        "section-sm": "112px",
        "section-md": "144px",
        "section-lg": "176px",
        "header-desktop": "64px",
        "header-mobile": "40px",
        "title-sub": "12px",
      },
    },
  },
  plugins: [],
};

export default config;
