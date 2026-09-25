import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { TimeModeToggle, type SiteLanguage } from "@/components/programming/site-preferences";

export function PageShell({ lang, setLang, dark, toggle, children }: { lang: SiteLanguage; setLang: (l: SiteLanguage) => void; dark: boolean; toggle: () => void; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b-2 border-primary/20 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary"><ArrowLeft className="size-4" />{lang === "id" ? "Beranda" : "Home"}</Link>
          <span className="font-pixel text-xs text-primary sm:text-sm">PROG&#123;R&#125;AMMING 9.0</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex rounded-md border-2 border-foreground bg-card p-0.5 text-xs font-black">
              {(["id", "en"] as const).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} className={`cursor-pointer rounded-sm px-2 py-1 ${lang === l ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{l.toUpperCase()}</button>
              ))}
            </div>
            <TimeModeToggle dark={dark} onToggle={toggle} language={lang} compact />
          </div>
        </div>
      </nav>
      {children}
    </main>
  );
}
