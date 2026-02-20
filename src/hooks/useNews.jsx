import { useState, useEffect, useCallback } from "react";
import { getTopHeadlines, searchArticles } from "../services/newsService";

/**
 * Hook to fetch and manage news articles.
 * Handles category switching, search, and pagination.
 *
 * @param {string} category  - active category (e.g. "Technology")
 * @param {string} query     - search query string
 */
export function useNews(category = "All", query = "") {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const fetchNews = useCallback(async (cat, q, pg) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (q) {
        result = await searchArticles(q, pg);
      } else {
        // NewsAPI category must be lowercase; "All" means no filter
        const apiCategory = cat === "All" ? "" : cat;
        result = await getTopHeadlines(apiCategory, pg);
      }
      setArticles(result.articles);
      setTotalResults(result.totalResults);
    } catch (err) {
      setError(err.message || "Failed to load news.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Re-fetch when category, query, or page changes
  useEffect(() => {
    setPage(1); // reset to first page on filter change
  }, [category, query]);

  useEffect(() => {
    fetchNews(category, query, page);
  }, [category, query, page, fetchNews]);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToPage = (pg) => setPage(pg);

  return {
    articles,
    loading,
    error,
    totalResults,
    page,
    nextPage,
    prevPage,
    goToPage,
    refetch: () => fetchNews(category, query, page),
  };
}