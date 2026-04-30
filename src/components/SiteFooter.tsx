import { Link } from "wouter";
import { LanguageBar } from "./LanguageBar";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 glass border-t border-white/10 mt-auto">
      <div className="container mx-auto max-w-6xl px-4 py-8 text-sm text-slate-400">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-lg font-bold tracking-tight text-white flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
              GeoProbe Intelligence
            </p>
            <p className="max-w-md leading-relaxed text-slate-500 font-medium font-sans">
              Advanced IP intelligence and geolocation suite providing real-time network reconnaissance and infrastructure analysis across global data nodes.
            </p>
          </div>

          <nav aria-label="Footer" className="space-y-4 text-center md:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
              Navigation Tree
            </p>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                >
                  <a className="inline-flex w-fit mx-auto md:mx-0 transition-all duration-300 hover:translate-x-1 hover:text-blue-400 text-slate-500 font-mono text-xs uppercase cursor-pointer">
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <LanguageBar />

      <div className="container mx-auto max-w-6xl px-4 pb-6 text-[10px] uppercase tracking-widest font-mono text-slate-600">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-center leading-6 md:flex-row">
          <p>Copyright © 2026 Hiqain Share. All systems operational.</p>
          <div className="md:text-right">
            <a
              href="https://hiqain.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex font-bold text-slate-400 transition-colors hover:text-blue-400"
            >
              Powered by Hiqain
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
