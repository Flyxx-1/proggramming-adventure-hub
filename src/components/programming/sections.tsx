import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, ExternalLink, MapPin, MessageCircle, Phone, Send, Sparkles, Users } from "lucide-react";

import mascotAsset from "@/assets/pomi-official-cropped.png.asset.json";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACTS, EVENTS, FAQS, PLATFORMS, SITE, SLIDES, waLink, type Lang } from "@/data/programming";

function useSlides(auto?: number) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setIndex(api.selectedScrollSnap());
    const on = () => setIndex(api.selectedScrollSnap());
    api.on("select", on);
    return () => { api.off("select", on); };
  }, [api]);
  useEffect(() => {
    if (!api || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => api.scrollNext(), auto);
    return () => window.clearInterval(id);
  }, [api, auto, index]);
  return { api, setApi, index, count };
}

function Dots({ count, index, onPick, label }: { count: number; index: number; onPick: (i: number) => void; label: string }) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} type="button" aria-label={`${label} ${i + 1}`} onClick={() => onPick(i)} className={`h-3 cursor-pointer border-2 border-foreground transition-all ${i === index ? "w-8 bg-accent" : "w-3 bg-card"}`} />
      ))}
    </div>
  );
}

/* ---------------- HERO CAROUSEL ---------------- */
export function HeroCarousel({ lang, onRegister, onLearn }: { lang: Lang; onRegister: () => void; onLearn: () => void }) {
  const { setApi, api, index, count } = useSlides(6000);
  const t = lang === "id" ? { register: "Daftar Sekarang", learn: "Kenali Prog{r}amming", poster: "Template poster — ganti dengan gambar resmi", meet: "Kenalan dengan Pomi", slide: "Slide" } : { register: "Register Now", learn: "Discover Prog{r}amming", poster: "Poster template — replace with official image", meet: "Meet Pomi", slide: "Slide" };
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {SLIDES.map((s, i) => (
            <CarouselItem key={s.key}>
              {i === 0 ? (
                <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_.92fr]">
                  <div className="text-center lg:text-left">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-primary bg-card px-4 py-2 text-xs font-black uppercase text-primary shadow-pixel"><Sparkles className="size-4" />{lang === "id" ? "Petualangan teknologi lintas waktu" : "A time-travel technology adventure"}</div>
                    <h1 className="font-pixel text-[clamp(2rem,6vw,4.7rem)] leading-[1.15] text-foreground pixel-title">PROG<span className="text-primary">&#123;R&#125;</span>AMMING <span className="text-accent">9.0</span></h1>
                    <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:mx-0 lg:text-5xl">{s.title[lang]}</h2>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg lg:mx-0">{s.text[lang]}</p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                      <Button size="lg" className="game-button h-13 px-7" onClick={onRegister}>{t.register}<ArrowRight /></Button>
                      <Button size="lg" variant="outline" className="game-button-secondary h-13 px-7" onClick={onLearn}>{t.learn}</Button>
                    </div>
                  </div>
                  <div className="relative mx-auto flex min-h-96 w-full max-w-lg items-center justify-center">
                    <div className="time-portal absolute h-72 w-72 rounded-full sm:h-96 sm:w-96" />
                    <Link to="/pomi" aria-label={t.meet} className="group relative z-10 flex justify-center">
                      <img src={mascotAsset.url} alt="Pomi, maskot resmi Prog{r}amming 9.0" width={537} height={751} className="mascot-float h-[24rem] w-auto max-w-[78%] object-contain transition-transform group-hover:scale-105" />
                    </Link>
                    <Link to="/pomi" className="absolute bottom-2 z-20 rounded-md border-2 border-foreground bg-accent px-4 py-2 font-pixel text-xs text-accent-foreground shadow-pixel transition-transform hover:-translate-y-0.5">{t.meet} →</Link>
                  </div>
                </div>
              ) : (
                <div className="grid min-h-[30rem] place-items-center overflow-hidden rounded-lg border-2 border-foreground bg-card shadow-pixel-lg">
                  {s.image ? <img src={s.image} alt={s.title[lang]} className="h-full w-full object-cover" /> : (
                    <div className="p-8 text-center">
                      <p className="font-pixel text-xs text-primary">{s.label[lang]}</p>
                      <h2 className="mt-5 text-4xl font-black sm:text-5xl">{s.title[lang]}</h2>
                      <p className="mx-auto mt-4 max-w-md text-muted-foreground">{s.text[lang]}</p>
                      <p className="mt-8 font-pixel text-[9px] text-muted-foreground/70">{t.poster}</p>
                    </div>
                  )}
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 top-auto -bottom-14 translate-y-0 border-2 border-foreground sm:-left-2 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2" />
        <CarouselNext className="right-1 top-auto -bottom-14 translate-y-0 border-2 border-foreground sm:-right-2 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2" />
      </Carousel>
      <div className="mt-6"><Dots count={count} index={index} onPick={(i) => api?.scrollTo(i)} label={t.slide} /></div>
    </div>
  );
}

/* ---------------- EVENT CAROUSEL + MODAL ---------------- */
const statusLabel = { id: { open: "OPEN REGISTRATION", past: "SELESAI", upcoming: "AKAN DATANG" }, en: { open: "OPEN REGISTRATION", past: "FINISHED", upcoming: "COMING SOON" } };

export function EventCarousel({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<string | null>(null);
  const openIdx = Math.max(0, EVENTS.findIndex((e) => e.status === "open"));
  const { setApi, api, index, count } = useSlides();
  useEffect(() => { api?.scrollTo(openIdx, true); }, [api, openIdx]);
  const ev = EVENTS.find((e) => e.key === active);
  const openTo = lang === "id" ? "Terbuka untuk" : "Open to";

  return (
    <>
      <Carousel setApi={setApi} opts={{ align: "center" }} className="mx-auto mt-12 w-full max-w-5xl">
        <CarouselContent className="items-center py-6">
          {EVENTS.map((e) => {
            const Card = (
              <button type="button" onClick={() => setActive(e.key)} className={`event-card event-${e.status} w-full cursor-pointer text-left`}>
                <div className={`event-poster ${e.tone}`}>
                  {e.poster ? <img src={e.poster} alt={e.name[lang]} className="h-full w-full object-cover" /> : <><span className="font-pixel text-3xl">{e.key}</span><span className="mt-2 font-pixel text-[9px] opacity-70">{e.era}</span></>}
                  <span className="event-status">{statusLabel[lang][e.status]}</span>
                </div>
                <div className="p-4">
                  <p className="font-pixel text-[10px] text-primary">PROG&#123;R&#125;AMMING {e.key}</p>
                  <h3 className="mt-2 text-xl font-black leading-tight text-card-foreground">{e.theme[lang]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{openTo}: {e.openTo[lang]}</p>
                </div>
              </button>
            );
            return <CarouselItem key={e.key} className="basis-[82%] sm:basis-1/2 lg:basis-1/3">{Card}</CarouselItem>;
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-2 border-2 border-foreground sm:-left-12" />
        <CarouselNext className="-right-2 border-2 border-foreground sm:-right-12" />
      </Carousel>
      <div className="mt-4"><Dots count={count} index={index} onPick={(i) => api?.scrollTo(i)} label="Event" /></div>

      <Dialog open={!!ev} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-2 border-foreground sm:max-w-2xl">
          {ev && <EventDetail ev={ev} lang={lang} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

function EventDetail({ ev, lang }: { ev: (typeof EVENTS)[number]; lang: Lang }) {
  const t = lang === "id"
    ? { date: "Tanggal", loc: "Lokasi", target: "Target peserta", theme: "Tema", mech: "Mekanisme & informasi", register: `Daftar ${ev.key}`, docs: "Lihat Dokumentasi", learn: "Lihat halaman 9.4", testi: "Testimoni peserta", testiPh: "Ceritakan pengalamanmu…", name: "Nama", send: "Kirim testimoni", thanks: "Terima kasih atas testimonimu!" }
    : { date: "Date", loc: "Location", target: "Participants", theme: "Theme", mech: "Mechanism & information", register: `Register for ${ev.key}`, docs: "View Documentation", learn: "Open the 9.4 page", testi: "Participant testimonials", testiPh: "Tell us about your experience…", name: "Name", send: "Send testimonial", thanks: "Thank you for your testimonial!" };
  const [sent, setSent] = useState(false);
  return (
    <>
      <DialogHeader>
        <p className="font-pixel text-[10px] text-primary">{statusLabel[lang][ev.status]}</p>
        <DialogTitle className="text-3xl font-black">{ev.name[lang]}</DialogTitle>
        <DialogDescription>{ev.description[lang]}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 sm:grid-cols-3">
        {[{ i: CalendarDays, l: t.date, v: ev.date[lang] }, { i: MapPin, l: t.loc, v: ev.location[lang] }, { i: Users, l: t.target, v: ev.openTo[lang] }].map(({ i: Icon, l, v }) => (
          <div key={l} className="rounded-md border-2 border-border p-3"><Icon className="size-4 text-primary" /><p className="mt-2 text-xs font-bold text-muted-foreground">{l}</p><p className="text-sm font-bold">{v}</p></div>
        ))}
      </div>
      <div><h4 className="font-black">{t.theme}: {ev.theme[lang]}</h4><p className="mt-1 text-sm text-muted-foreground">{ev.themeText[lang]}</p></div>
      <div><h4 className="font-black">{t.mech}</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{ev.mechanism.map((m) => <li key={m.id}>{m[lang]}</li>)}</ul></div>
      <div className="flex flex-wrap gap-3">
        {ev.status === "open" && ev.slug && <Button asChild className="game-button"><Link to="/daftar/$event" params={{ event: ev.slug }}>{t.register}<ArrowRight /></Link></Button>}
        {ev.status === "past" && <Button asChild variant="outline" className="game-button-secondary"><a href={ev.driveUrl} target="_blank" rel="noreferrer">{t.docs}<ExternalLink /></a></Button>}
        {ev.key === "9.4" && <Button asChild variant="outline" className="game-button-secondary"><Link to="/programming-9-4">{t.learn}<ArrowRight /></Link></Button>}
      </div>
      <div className="border-t-2 border-dashed border-border pt-4">
        <h4 className="font-black">{t.testi}</h4>
        {sent ? <p className="mt-2 text-sm font-bold text-primary">{t.thanks}</p> : (
          <form className="mt-3 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <Input required placeholder={t.name} className="form-control" />
            <Textarea required placeholder={t.testiPh} className="border-2 border-foreground" />
            <Button type="submit" size="sm" variant="outline" className="game-button-secondary"><Send />{t.send}</Button>
          </form>
        )}
      </div>
    </>
  );
}

/* ---------------- PLATFORMS + MODAL ---------------- */
export function PlatformGrid({ lang }: { lang: Lang; }) {
  const [active, setActive] = useState<string | null>(null);
  const p = PLATFORMS.find((x) => x.key === active);
  const t = lang === "id" ? { level: "Tingkat", fn: "Fungsi", res: "Hasil", visit: "Kunjungi situs", more: "Lihat detail" } : { level: "Level", fn: "Functions", res: "Results", visit: "Visit website", more: "View details" };
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PLATFORMS.map((x, i) => (
          <button key={x.key} type="button" onClick={() => setActive(x.key)} className="platform-card cursor-pointer text-left">
            <span className="font-pixel text-[10px] text-primary">0{i + 1}</span>
            <strong className="mt-6 leading-tight">{x.name}</strong>
            <span className="mt-1 text-xs text-muted-foreground">{x.level[lang]}</span>
            <span className="mt-3 text-xs font-bold text-primary">{t.more} →</span>
          </button>
        ))}
      </div>
      <Dialog open={!!p} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="border-2 border-foreground sm:max-w-lg">
          {p && <>
            <DialogHeader><p className="font-pixel text-[10px] text-primary">{t.level}: {p.level[lang]}</p><DialogTitle className="text-3xl font-black">{p.name}</DialogTitle><DialogDescription>{p.description[lang]}</DialogDescription></DialogHeader>
            <div className="space-y-3 text-sm"><div><h4 className="font-black">{t.fn}</h4><p className="text-muted-foreground">{p.functions[lang]}</p></div><div><h4 className="font-black">{t.res}</h4><p className="text-muted-foreground">{p.results[lang]}</p></div></div>
            <Button asChild variant="outline" className="game-button-secondary"><a href={p.url} target="_blank" rel="noreferrer">{t.visit}<ExternalLink /></a></Button>
          </>}
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- FAQ + CONTACT ---------------- */
export function FaqSection({ lang }: { lang: Lang }) {
  const [all, setAll] = useState(false);
  const t = lang === "id" ? { eyebrow: "BUTUH PETUNJUK?", title: "Pertanyaan yang sering ditanyakan", more: "Lihat Lebih Banyak", less: "Tampilkan Lebih Sedikit", cp: "Contact Person", contact: "Hubungi" } : { eyebrow: "NEED A CLUE?", title: "Frequently asked questions", more: "View More", less: "Show Less", cp: "Contact Person", contact: "Contact" };
  const list = all ? FAQS : FAQS.slice(0, 5);
  return (
    <section id="faq" className="section-pad bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
        <div>
          <p className="eyebrow">{t.eyebrow}</p><h2 className="section-title">{t.title}</h2>
          <div className="mt-6 space-y-3">
            <p className="font-pixel text-[10px] text-primary">{t.cp}</p>
            {CONTACTS.map((c) => (
              <div key={c.name + c.whatsapp} className="flex items-center gap-3 rounded-md border-2 border-primary bg-card p-4 shadow-pixel">
                <Phone className="size-5 shrink-0 text-primary" />
                <div className="min-w-0 flex-1"><p className="font-bold">{c.name}</p><p className="text-xs text-muted-foreground">{c.role[lang]} · +{c.whatsapp}</p></div>
                <Button asChild size="sm" className="game-button"><a href={waLink(c.whatsapp)} target="_blank" rel="noreferrer">{t.contact}</a></Button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Accordion type="single" collapsible className="space-y-3">
            {list.map((f, i) => (
              <AccordionItem key={f.q.id} value={`item-${i}`} className="rounded-md border-2 border-border bg-card px-5 shadow-sm">
                <AccordionTrigger className="text-base font-black hover:no-underline">{f.q[lang]}</AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">{f.a[lang]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button variant="outline" className="game-button-secondary mt-5 w-full" onClick={() => setAll(!all)}>{all ? t.less : `${t.more} (${FAQS.length - 5})`}</Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHATSAPP FLOAT ---------------- */
export function WhatsAppFloat({ lang }: { lang: Lang }) {
  const label = lang === "id" ? "Hubungi via WhatsApp" : "Chat on WhatsApp";
  return (
    <a href={waLink(SITE.whatsappMain)} target="_blank" rel="noreferrer" aria-label={label} title={label} className="wa-float">
      <MessageCircle className="size-7" />
    </a>
  );
}
