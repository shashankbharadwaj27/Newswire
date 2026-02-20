import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-16 py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Newswire" className="w-5 h-5" />
          <span className="font-semibold text-stone-600">Newswire</span>
        </Link>

        <p>© {new Date().getFullYear()} Newswire · Powered by NewsAPI</p>
      </div>
    </footer>
  );
}