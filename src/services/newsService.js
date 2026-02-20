import api from "./api";
import { PAGE_SIZE, FALLBACK_IMAGE } from "../utils/constants";
import { formatRelativeTime, estimateReadTime } from "../utils/formatDate";
import { cleanNewsTitle, cleanNewsContent } from "../utils/truncateText";

// ─── Category Inference ───────────────────────────────────────────────────────
// NewsAPI free tier doesn't return a category field on articles,
// so we infer it from the title + description text.
function inferCategory(article) {
  const text = `${article.title} ${article.description || ""}`.toLowerCase();
  if (text.match(/stock|market|nasdaq|walmart|amazon|economy|trade|inflation|gdp|revenue|earnings/))
    return "Business";
  if (text.match(/health|alzheimer|heart|blood|medical|disease|cancer|covid|vaccine|surgery/))
    return "Health";
  if (text.match(/science|nasa|crispr|gene|research|study|species|biology|physics|astronomy/))
    return "Science";
  if (text.match(/climate|carbon|emission|wildfire|flood|drought|environment|rainforest/))
    return "Climate";
  if (text.match(/ai|tech|apple|google|microsoft|meta|openai|software|chip|robot|cyber/))
    return "Technology";
  if (text.match(/soccer|football|nba|nfl|nhl|sport|olympic|tennis|golf|match|goal|arsenal|wolves/))
    return "Sports";
  return "World";
}

// ─── Article Normalizer ───────────────────────────────────────────────────────
// Transforms raw NewsAPI article shape → clean internal shape
export function normalizeArticle(raw, index = 0) {
  return {
    id: `${raw.source?.name}-${index}-${raw.publishedAt}`,
    title: cleanNewsTitle(raw.title || "Untitled"),
    summary: raw.description || "",
    content: cleanNewsContent(raw.content || raw.description || ""),
    author: raw.author?.split(",")[0]?.trim() || raw.source?.name || "Unknown",
    source: raw.source?.name || "",
    url: raw.url || "#",
    image: raw.urlToImage || FALLBACK_IMAGE,
    category: inferCategory(raw),
    time: formatRelativeTime(raw.publishedAt),
    readTime: estimateReadTime(raw.content, raw.description),
    publishedAt: raw.publishedAt,
  };
}

// ─── Filter out junk articles ─────────────────────────────────────────────────
function filterValid(articles = []) {
  return articles.filter(
    (a) => a.title && a.title !== "[Removed]" && a.urlToImage
  );
}

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * Fetch top headlines. Optionally filtered by NewsAPI category.
 * @param {string} category - e.g. "technology", "health"
 * @param {number} page
 */
export async function getTopHeadlines(category = "", page = 1) {
  const params = {
    pageSize: PAGE_SIZE,
    page,
    ...(category && { category: category.toLowerCase() }),
  };
  const { data } = await api.get("/top-headlines", { params });
  console.log(data)
  return {
    totalResults: data.totalResults,
    articles: filterValid(data.articles).map(normalizeArticle),
  };
}

/**
 * Search articles by keyword using the /everything endpoint.
 * @param {string} query
 * @param {number} page
 */
export async function searchArticles(query, page = 1) {
  const params = {
    q: query,
    pageSize: PAGE_SIZE,
    page,
    sortBy: "publishedAt",
  };
  const { data } = await api.get("/everything", { params });
  return {
    totalResults: data.totalResults,
    articles: filterValid(data.articles).map(normalizeArticle),
  };
}

/**
 * Fetch top headlines by country.
 * @param {string} country - ISO 3166-1 code, e.g. "us", "in"
 */
export async function getHeadlinesByCountry(country = "us", page = 1) {
  const params = { country, pageSize: PAGE_SIZE, page };
  const { data } = await api.get("/top-headlines", { params });
  return {
    totalResults: data.totalResults,
    articles: filterValid(data.articles).map(normalizeArticle),
  };
}