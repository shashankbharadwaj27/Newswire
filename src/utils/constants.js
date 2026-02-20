// ─── API ──────────────────────────────────────────────────────────────────────
export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://newsapi.org/v2";

// ─── Categories ───────────────────────────────────────────────────────────────
export const CATEGORIES = [
  "All",
  "Business",
  "Technology",
  "Health",
  "Science",
  "Sports",
  "Climate",
  "World",
];

// NewsAPI native categories (used in API requests)
export const NEWSAPI_CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

// ─── Category Colors ──────────────────────────────────────────────────────────
export const CATEGORY_COLORS = {
  Business: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  Technology: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  Health: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Science: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
  Sports: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    dot: "bg-rose-500",
  },
  Climate: {
    bg: "bg-teal-100",
    text: "text-teal-700",
    dot: "bg-teal-500",
  },
  World: {
    bg: "bg-stone-100",
    text: "text-stone-600",
    dot: "bg-stone-400",
  },
};

// ─── Misc ─────────────────────────────────────────────────────────────────────
export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80";

export const PAGE_SIZE = 30;