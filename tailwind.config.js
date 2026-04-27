/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1813",
        moss: "#1F2C24",
        spruce: "#2A3B30",
        bone: "#F2EDE2",
        paper: "#E8E1D1",
        cream: "#EFE8D8",
        copper: "#B5683B",
        rust: "#8E4A26",
        ochre: "#C9963A",
        fog: "#9AA59C",
        glass: "rgba(242,237,226,0.08)",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        widest2: "0.32em",
      },
      keyframes: {
        riseIn: {
          "0%": { opacity: 0, transform: "translateY(28px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flicker: {
          "0%,100%": { opacity: 0.95 },
          "50%": { opacity: 0.6 },
        },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        riseIn: "riseIn 1s cubic-bezier(.2,.7,.2,1) both",
        marquee: "marquee 38s linear infinite",
        drift: "drift 6s ease-in-out infinite",
        flicker: "flicker 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
