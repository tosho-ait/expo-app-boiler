// iOS 17 / soft-neumorphic palette.
//
// Prefer the Tailwind semantic tokens (`bg-primary-500`, `text-typography-900`,
// `border-outline-200`, `bg-background-100`, etc.) defined in tailwind.config.js
// + global.css. The COLORS export below is kept for the few call-sites that
// need a raw hex (gradients, native APIs, animated style values).

const ACCENT_HEX = "#091A2F";

export const COLORS = {

    // System accents (iOS-aligned).
    BLUE: "#0A84FF",
    GREEN: "#34C759",
    PURPLE: "#AF52DE",
    YELLOW: "#FF9500",
    RED: "#FF3B30",
    TEAL: "#5AC8FA",
    PINK: "#FF2D55",

    GREEN_BG: "bg-success-500",
    BLUE_BG: "bg-tertiary-500",
    YELLOW_BG: "bg-warning-500",
    RED_BG: "bg-error-500",
    PURPLE_BG: "bg-[#AF52DE]",

    GREEN_TEXT: "text-success-600",
    BLUE_TEXT: "text-tertiary-500",
    YELLOW_TEXT: "text-warning-600",
    RED_TEXT: "text-error-500",
    PURPLE_TEXT: "text-[#AF52DE]",

    // Brand accent — primary CTAs, headings, FAB.
    ACCENT: ACCENT_HEX,
    ACCENT_BG: "bg-primary-800",
    ACCENT_TEXT: "text-primary-800",

    // Surfaces / backgrounds — semantic, dark-mode aware.
    GRAY_BACKGROUND: "#F2F2F7",
    GRAY_LOW: "#E5E5EA",
    GRAY_HIGH: "#3A3A3C",

    BLACK: "#000000",
    WHITE: "#FFFFFF",
    MUTED_500: "#8E8E93",
    MUTED_600: "#636366",

    // iOS 17 system labels / fills (kept as raw hex for native style props).
    LABEL: "#000000",
    LABEL_SECONDARY: "rgba(60, 60, 67, 0.60)",
    LABEL_TERTIARY: "rgba(60, 60, 67, 0.30)",
    SEPARATOR: "rgba(60, 60, 67, 0.18)",
    FILL_PRIMARY: "rgba(120, 120, 128, 0.20)",
    FILL_SECONDARY: "rgba(120, 120, 128, 0.16)",
    FILL_TERTIARY: "rgba(118, 118, 128, 0.12)",
}
