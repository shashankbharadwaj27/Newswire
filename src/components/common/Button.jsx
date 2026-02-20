/**
 * Reusable Button component.
 *
 * @param {"primary"|"secondary"|"ghost"} variant
 * @param {"sm"|"md"|"lg"} size
 */
export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-stone-900 text-white hover:bg-stone-700 active:scale-95",
    secondary:
      "bg-stone-100 text-stone-800 hover:bg-stone-200 active:scale-95",
    ghost:
      "bg-transparent text-stone-600 hover:bg-stone-100 active:scale-95",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}