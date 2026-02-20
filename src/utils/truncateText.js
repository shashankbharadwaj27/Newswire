/**
 * Truncates a string to a max number of words.
 * @param {string} text
 * @param {number} maxWords
 * @returns {string}
 */
export function truncateWords(text = "", maxWords = 20) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

/**
 * Truncates a string to a max number of characters.
 * @param {string} text
 * @param {number} maxChars
 * @returns {string}
 */
export function truncateChars(text = "", maxChars = 120) {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trimEnd() + "…";
}

/**
 * Strips the " - Source Name" suffix NewsAPI appends to titles.
 * e.g. "Article title - CNBC" → "Article title"
 */
export function cleanNewsTitle(title = "") {
  return title.replace(/\s[-–|]\s[^-–|]+$/, "").trim();
}

/**
 * Strips "[+N chars]" from partial content returned by NewsAPI.
 */
export function cleanNewsContent(content = "") {
  return content.replace(/\[\+\d+ chars\]/, "…").trim();
}