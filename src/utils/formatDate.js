/**
 * Returns a relative time string from an ISO date string.
 * e.g. "2026-02-19T14:43:00Z" → "2h ago"
 */
export function formatRelativeTime(publishedAt) {
  if (!publishedAt) return "";
  const diffSeconds = (Date.now() - new Date(publishedAt)) / 1000;

  if (diffSeconds < 60) return "Just now";
  if (diffSeconds < 3600) return `${Math.round(diffSeconds / 60)}m ago`;
  if (diffSeconds < 86400) return `${Math.round(diffSeconds / 3600)}h ago`;
  return `${Math.round(diffSeconds / 86400)}d ago`;
}

/**
 * Returns a formatted date string.
 * e.g. "February 19, 2026"
 */
export function formatFullDate(publishedAt) {
  if (!publishedAt) return "";
  return new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Returns today's date as a long string.
 * e.g. "Thursday, February 20, 2026"
 */
export function formatTodayLong() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Estimates read time from text content.
 * @param {string} content
 * @param {string} description
 * @returns {string} e.g. "4 min"
 */
export function estimateReadTime(content = "", description = "") {
  const words = (content + " " + description).split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}