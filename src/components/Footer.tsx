import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-12 py-6 text-sm text-gray-600 bg-white">
      <div className="mx-auto max-w-5xl px-4 flex items-center justify-between">
        <span>© {new Date().getFullYear()} MemoStopwatch</span>
        <nav className="flex gap-4">
          <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}