import { createFileRoute, Link } from "@tanstack/react-router";

import mascotAsset from "@/assets/pomi-official-cropped.png.asset.json";
import { PageShell } from "@/components/programming/page-shell";
import { useSiteLanguage, useTimeMode } from "@/components/programming/site-preferences";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pomi")({
  head: () => ({
    meta: [
      { title: "Kenalan dengan Pomi | Prog{r}amming 9.0" },
      { name: "description", content: "Pomi, maskot resmi Prog{r}amming 9.0 yang menemani petualangan teknologi lintas waktu." },
      { property: "og:title", content: "Kenalan dengan Pomi | Prog{r}amming 9.0" },
      { property: "og:description", content: "Maskot resmi yang menemani perjalanan time travel Prog{r}amming 9.0." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PomiPage,
});

function PomiPage() {
  const [lang, setLang] = useSiteLanguage();
  const [dark, toggle] = useTimeMode();
  const t = lang === "id"
    ? { eyebrow: "MASKOT RESMI", title: "Halo, aku Pomi!", text: "Pomi adalah maskot resmi Prog{r}amming 9.0. Pomi akan menemanimu menjelajahi dunia teknologi melintasi waktu — dari masa purba, kerajaan, revolusi industri, hingga masa depan.", more: "Cerita lengkap Pomi akan segera diumumkan.", cta: "Mulai petualangan" }
    : { eyebrow: "OFFICIAL MASCOT", title: "Hi, I'm Pomi!", text: "Pomi is the official mascot of Prog{r}amming 9.0. Pomi will guide you through the world of technology across time — from prehistory, kingdoms, and the industrial revolution to the future.", more: "Pomi's full story will be announced soon.", cta: "Start the adventure" };
  return (
    <PageShell lang={lang} setLang={setLang} dark={dark} toggle={toggle}>
      <section className="hero-sky">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <img src={mascotAsset.url} alt="Pomi" width={537} height={751} className="mascot-float mx-auto h-96 w-auto" />
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 className="section-title">{t.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.text}</p>
            <p className="mt-4 text-sm font-bold text-primary">{t.more}</p>
            <Button asChild size="lg" className="game-button mt-8"><Link to="/">{t.cta}</Link></Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
