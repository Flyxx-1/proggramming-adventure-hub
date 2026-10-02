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

// Light/dark mode removed: site always uses the light (day) look.
export function useTimeMode() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    window.localStorage.removeItem("programming-time-mode");
  }, []);
  return [false, () => {}] as const;
}

export function TimeModeToggle(_props: { dark: boolean; onToggle: () => void; language: SiteLanguage; compact?: boolean }) {
  return null;
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