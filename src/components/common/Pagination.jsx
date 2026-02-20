import Button from "./Button";

/**
 * Pagination controls.
 *
 * @param {number} page - current page (1-indexed)
 * @param {number} totalResults - total number of results from API
 * @param {number} pageSize - results per page
 * @param {Function} onNext
 * @param {Function} onPrev
 */
export default function Pagination({
  page,
  totalResults,
  pageSize = 30,
  onNext,
  onPrev,
}) {
  const totalPages = Math.ceil(totalResults / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        variant="secondary"
        onClick={onPrev}
        disabled={page <= 1}
      >
        ← Previous
      </Button>

      <span className="text-sm text-stone-500">
        Page <span className="font-semibold text-stone-900">{page}</span> of{" "}
        <span className="font-semibold text-stone-900">{totalPages}</span>
      </span>

      <Button
        variant="secondary"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Next →
      </Button>
    </div>
  );
}