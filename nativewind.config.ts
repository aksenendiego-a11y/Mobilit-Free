import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: "#0A0A0F",
          surface: "#12121A",
          surfaceElevated: "#1A1A24",
          primary: "#FF4D00",
          onPrimary: "#FFFFFF",
          secondary: "#6B46C1",
          muted: "#6E6E7A",
          onBackground: "#F8F8F8",
          onSurface: "#333333",
          border: "#3A3A4A",
        },
        light: {
          background: "#F8F9FA",
          surface: "#FFFFFF",
          surfaceElevated: "#F0F2F5",
          primary: "#FF4D00",
          onPrimary: "#FFFFFF",
          secondary: "#6B46C1",
          muted: "#888888",
          onBackground: "#111827",
          onSurface: "#18181B",
          border: "#D1D5DB",
        },
        success: "#22C55E",
        warning: "#EAB308",
        error: "#EF4444",
        info: "#3B82F6",
        disabled: "#A3A3A3",
        zone: {
          excellent: "#22C55E",
          good: "#84CC16",
          fair: "#EAB308",
          poor: "#F87171",
          "very-poor": "#EF4444",
        },
      },
      fontFamily: {
        heading: ["Inter", "SF Pro Display", "system-ui"],
        body: ["Inter", "SF Pro", "system-ui"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        xxxl: "64px",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "16px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1) 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1) 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        lgDark: "0 20px 25px -5px rgba(0, 0, 0, 0.1) 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px",
      },
    },
  },
  plugins: [forms],
};
export default config;