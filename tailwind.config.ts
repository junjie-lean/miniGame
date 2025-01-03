import type { Config } from "tailwindcss/tailwind-config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // 确保 antd 的样式不被 tailwind 的样式覆盖
  corePlugins: {
    preflight: false,
  },
};

export default config;
