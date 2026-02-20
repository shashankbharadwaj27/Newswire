import Button from "./Button";

/**
 * Displays an error state with an optional retry action.
 *
 * @param {string} message - error message to display
 * @param {Function} onRetry - optional retry callback
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-lg font-bold text-stone-700">Something went wrong</h3>
      <p className="text-stone-400 text-sm mt-1 max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-5">
          Try again
        </Button>
      )}
    </div>
  );
}