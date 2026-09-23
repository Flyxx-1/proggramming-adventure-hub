import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export type SiteLanguage = "id" | "en";

export function useSiteLanguage() {
  const [language, setLanguageState] = useState<SiteLanguage>("id");

  useEffect(() => {
    const saved = window.localStorage.getItem("programming-language");
    if (saved === "id" || saved === "en") setLanguageState(saved);
  }, []);

  const setLanguage = (next: SiteLanguage) => {
    setLanguageState(next);
    window.localStorage.setItem("programming-language", next);
    document.documentElement.lang = next;
  };

  return [language, setLanguage] as const;
}

export function useTimeMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("programming-time-mode");
    const next = saved === "dark";
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  const toggle = () => {
    setDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("programming-time-mode", next ? "dark" : "light");
      return next;
    });
  };

  return [dark, toggle] as const;
}

export function TimeModeToggle({ dark, onToggle, language, compact = false }: { dark: boolean; onToggle: () => void; language: SiteLanguage; compact?: boolean }) {
  const label = dark
    ? language === "id" ? "Aktifkan mode terang" : "Switch to light mode"
    : language === "id" ? "Aktifkan mode gelap" : "Switch to dark mode";

  return (
    <Button type="button" variant="outline" size={compact ? "icon" : "sm"} onClick={onToggle} aria-label={label} title={label} className="time-toggle border-2">
      <span className="relative size-4" aria-hidden="true">
        <Sun className={`absolute inset-0 transition-all duration-500 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
        <Moon className={`absolute inset-0 transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
      </span>
      {!compact && <span>{dark ? (language === "id" ? "Gelap" : "Dark") : (language === "id" ? "Terang" : "Light")}</span>}
    </Button>
  );
}

export function TimeSky() {
  return (
    <div className="time-sky" aria-hidden="true">
      <div className="sky-stars"><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="sun-orbit"><span className="sun-disc" /></div>
      <div className="moon-orbit"><span className="moon-disc" /></div>
    </div>
  );
}