import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { X, Minus } from "lucide-react";

import mascotAsset from "@/assets/pomi-official-cropped.png.asset.json";

/**
 * Reusable animation states. Each maps to a CSS class `pomi-s-<state>`.
 * Swap the CSS (or add sprite frames) later without touching the logic.
 */
export type PomiState =
  | "idle" | "wave" | "blink" | "nod" | "look-left" | "look-right" | "walk"
  | "point-left" | "point-right" | "point-up" | "point-down"
  | "jump" | "excited" | "thinking";

type Lang = "id" | "en";
type Ctx = "home" | "adventure" | "register" | "faq" | "pomi" | "future";

const LINES: Record<Lang, Record<string, string[]>> = {
  id: {
    home: ["Halo! 👋", "Mau mulai petualangan?"],
    adventure: ["Psst... ada event baru!", "Coba lihat yang ini!"],
    register: ["Yuk isi datanya dulu!", "Klik di sini untuk daftar!"],
    faq: ["Kalau masih bingung, coba cek pertanyaan ini!", "Butuh bantuan?"],
    pomi: ["Hehe, ini halamanku! ✨", "Yuk lanjut ke petualangan berikutnya!"],
    future: ["Selamat datang di chapter Future.", "Siap membangun solusi?"],
    cta: ["Klik di sini untuk daftar!", "Coba lihat yang ini!"],
    page: ["Yuk lanjut ke petualangan berikutnya!"],
    fun: ["Wiii! 🎉", "Hop!", "Hehe!"],
  },
  en: {
    home: ["Hi there! 👋", "Ready to start the adventure?"],
    adventure: ["Psst... there's a new event!", "Check this one out!"],
    register: ["Let's fill in your details first!", "Click here to register!"],
    faq: ["Still unsure? Check these questions!", "Need some help?"],
    pomi: ["Hehe, this is my page! ✨", "Let's go to the next adventure!"],
    future: ["Welcome to the Future chapter.", "Ready to build solutions?"],
    cta: ["Click here to register!", "Check this one out!"],
    page: ["Let's go to the next adventure!"],
    fun: ["Wheee! 🎉", "Hop!", "Hehe!"],
  },
};

const MENU = {
  id: { title: "Mau ke mana?", who: "Siapa Pomi?", adv: "Lihat Petualangan", reg: "Daftar", faq: "FAQ", hide: "Sembunyikan Pomi", show: "Panggil Pomi", close: "Tutup" },
  en: { title: "Where to?", who: "Who is Pomi?", adv: "See Adventures", reg: "Register", faq: "FAQ", hide: "Hide Pomi", show: "Call Pomi", close: "Close" },
};

const pickOne = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]!;
const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function InteractivePomi() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>("id");
  const [hidden, setHidden] = useState(false);
  const [state, setState] = useState<PomiState>("idle");
  const [bubble, setBubble] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const selfRef = useRef<HTMLDivElement>(null);
  const lastBubble = useRef(0);
  const stateTimer = useRef<number | undefined>(undefined);
  const bubbleTimer = useRef<number | undefined>(undefined);
  const clickTimer = useRef<number | undefined>(undefined);
  const busy = useRef(false);

  const ctx: Ctx = pathname.startsWith("/programming-9-4") ? "future" : pathname.startsWith("/daftar") ? "register" : pathname.startsWith("/pomi") ? "pomi" : "home";
  const subtle = ctx === "future";

  // language + hidden preference (client only)
  useEffect(() => {
    setHidden(localStorage.getItem("programming-pomi-hidden") === "1");
    const read = () => setLang(document.documentElement.lang === "en" ? "en" : "id");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => mo.disconnect();
  }, []);

  const play = useCallback((s: PomiState, ms = 1400) => {
    const next = subtle && (s === "jump" || s === "excited" || s === "walk") ? "nod" : s;
    setState(next);
    busy.current = next !== "idle";
    window.clearTimeout(stateTimer.current);
    if (next !== "idle") stateTimer.current = window.setTimeout(() => { setState("idle"); busy.current = false; }, ms);
  }, [subtle]);

  const say = useCallback((text: string, force = false) => {
    const now = Date.now();
    if (!force && now - lastBubble.current < 12000) return; // not too often
    lastBubble.current = now;
    setBubble(text);
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setBubble(null), 4500);
  }, []);

  // page open / change → greet or small gesture
  const firstPage = useRef(true);
  useEffect(() => {
    if (hidden) return;
    const t = window.setTimeout(() => {
      if (firstPage.current) { play("wave", 1800); say(pickOne(LINES[lang][ctx === "home" ? "home" : ctx]!), true); firstPage.current = false; }
      else if (ctx === "home") play("idle");
      else { play(ctx === "pomi" ? "excited" : "nod"); say(pickOne(LINES[lang][ctx]!), true); }
    }, 700);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hidden]);

  // idle behaviours
  useEffect(() => {
    if (hidden || reducedMotion()) return;
    const pool: PomiState[] = subtle ? ["blink", "nod", "look-left", "look-right"] : ctx === "pomi" ? ["blink", "wave", "jump", "look-left", "look-right", "excited"] : ["blink", "nod", "look-left", "look-right", "wave", "thinking"];
    const id = window.setInterval(() => { if (!busy.current && !menu) play(pickOne(pool), 1200); }, subtle ? 11000 : 8000);
    return () => window.clearInterval(id);
  }, [hidden, ctx, subtle, menu, play]);

  // point toward an element without covering it
  const pointAt = useCallback((el: Element, line?: string) => {
    const me = selfRef.current?.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (!me) return;
    const dx = r.left + r.width / 2 - (me.left + me.width / 2);
    const dy = r.top + r.height / 2 - (me.top + me.height / 2);
    const s: PomiState = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "point-right" : "point-left") : dy < 0 ? "point-up" : "point-down";
    play(s, 1800);
    if (line) say(line);
  }, [play, say]);

  // sections scrolled into view (home)
  useEffect(() => {
    if (hidden || ctx !== "home") return;
    const map: Record<string, keyof (typeof LINES)["id"]> = { petualangan: "adventure", daftar: "register", faq: "faq" };
    const seen = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || seen.has(e.target.id)) return;
        seen.add(e.target.id);
        const target = e.target.querySelector("h2") ?? e.target;
        pointAt(target, pickOne(LINES[lang][map[e.target.id]!]!));
      });
    }, { threshold: 0.35 });
    Object.keys(map).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [hidden, ctx, lang, pointAt, pathname]);

  // hover / focus on important CTA → look & point
  useEffect(() => {
    if (hidden) return;
    let last: Element | null = null;
    const re = /daftar|register|petualangan|adventure|faq/i;
    const onOver = (ev: Event) => {
      const el = (ev.target as Element | null)?.closest?.("a,button");
      if (!el || el === last || selfRef.current?.contains(el)) return;
      const label = `${el.textContent ?? ""} ${el.getAttribute("href") ?? ""}`;
      if (!re.test(label)) return;
      last = el;
      pointAt(el, pickOne(LINES[lang]["cta"]!));
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("focusin", onOver);
    return () => { document.removeEventListener("mouseover", onOver); document.removeEventListener("focusin", onOver); };
  }, [hidden, lang, pointAt]);

  const go = (where: "who" | "adv" | "reg" | "faq") => {
    setMenu(false);
    play(subtle ? "nod" : "excited");
    if (where === "who") return navigate({ to: "/pomi" });
    if (where === "reg" && ctx === "future") return document.getElementById("register-94")?.scrollIntoView({ behavior: "smooth" });
    const id = where === "adv" ? "petualangan" : where === "reg" ? "daftar" : "faq";
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (pathname === "/") scroll();
    else navigate({ to: "/" }).then(() => window.setTimeout(scroll, 300));
  };

  const onClick = () => {
    window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => { play("nod", 700); setBubble(null); setMenu((m) => !m); }, 220);
  };
  const onDouble = () => {
    window.clearTimeout(clickTimer.current);
    setMenu(false);
    play(subtle ? "nod" : pickOne<PomiState>(["jump", "excited", "nod"]), 1100);
    say(pickOne(LINES[lang]["fun"]!), true);
  };

  const setHide = (v: boolean) => { setHidden(v); setMenu(false); setBubble(null); localStorage.setItem("programming-pomi-hidden", v ? "1" : "0"); };
  const m = MENU[lang];

  if (hidden) {
    return (
      <button type="button" onClick={() => setHide(false)} className="pomi-tab" aria-label={m.show}>
        <img src={mascotAsset.url} alt="" width={20} height={28} className="h-7 w-auto" style={{ imageRendering: "pixelated" }} />
        <span>{m.show}</span>
      </button>
    );
  }

  return (
    <div ref={selfRef} className={`pomi-companion ${subtle ? "pomi-subtle" : ""}`}>
      {bubble && !menu && (
        <div className="pomi-bubble" role="status">
          <span>{bubble}</span>
          <button type="button" onClick={() => setBubble(null)} aria-label={m.close} className="pomi-x"><X className="size-3" /></button>
        </div>
      )}
      {menu && (
        <div className="pomi-menu" role="menu">
          <p className="font-pixel text-[0.55rem] text-primary">{m.title}</p>
          {(["who", "adv", "reg", "faq"] as const).map((k) => (
            <button key={k} type="button" role="menuitem" onClick={() => go(k)}>{m[k]}</button>
          ))}
          <button type="button" onClick={() => setHide(true)} className="pomi-menu-hide"><Minus className="size-3" />{m.hide}</button>
        </div>
      )}
      <div className="flex items-end gap-1">
        <button type="button" onClick={onClick} onDoubleClick={onDouble} aria-label="Pomi" aria-expanded={menu} className={`pomi-body pomi-s-${state}`}>
          <img src={mascotAsset.url} alt="Pomi" width={537} height={751} draggable={false} />
        </button>
        <button type="button" onClick={() => setHide(true)} className="pomi-min" aria-label={m.hide} title={m.hide}><Minus className="size-3" /></button>
      </div>
    </div>
  );
}
