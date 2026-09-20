import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Atom,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Castle,
  CheckCircle2,
  Code2,
  Cog,
  Flag,
  Gamepad2,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  Rocket,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import mascotAsset from "@/assets/pomi-official-cropped.png.asset.json";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prog{r}amming 9.0 | Petualangan Teknologi" },
      { name: "description", content: "Jelajahi dunia teknologi bersama Prog{r}amming 9.0 dari SISO Universitas Prasetiya Mulya." },
      { property: "og:title", content: "Prog{r}amming 9.0 | Petualangan Teknologi" },
      { property: "og:description", content: "Petualangan coding, desain, kreativitas, dan inovasi untuk anak dan remaja." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const copy = {
  id: {
    nav: ["Tentang", "Kenapa Ikut", "Petualangan", "FAQ"],
    headline: "Jelajahi Dunia Teknologi, Mulai Petualanganmu!",
    intro: "Petualangan belajar yang membawa anak dan remaja melintasi waktu—dari masa purba hingga masa depan—melalui coding, desain, dan kreativitas.",
    register: "Daftar Sekarang",
    know: "Kenali Prog{r}amming",
    aboutTitle: "Teknologi jadi petualangan yang seru.",
    about: "Prog{r}amming merupakan program kerja SISO yang bertujuan mengenalkan dunia teknologi kepada anak-anak dan remaja melalui coding, desain UI/UX, dan berbagai platform teknologi.",
    whyTitle: "Kenapa ikut?",
    whySub: "Bukan sekadar duduk dan mendengar. Setiap peserta ikut mencoba, membuat, dan bertumbuh.",
    adventureTitle: "Petualangan Prog{r}amming 9.0",
    adventureSub: "Empat era. Empat pengalaman. Satu perjalanan menuju masa depan.",
    mapTitle: "Peta Petualangan",
    galleryTitle: "Jejak Petualangan",
    gallerySub: "Keseruan dari perjalanan Prog{r}amming. Foto kegiatan akan hadir di sini.",
    faqTitle: "Pertanyaan yang sering ditanyakan",
    formTitle: "Siap memulai petualanganmu?",
    formSub: "Isi data singkat berikut. Informasi pendaftaran lengkap akan segera diumumkan.",
  },
  en: {
    nav: ["About", "Why Join", "Adventure", "FAQ"],
    headline: "Explore the World of Technology. Begin Your Adventure!",
    intro: "A learning adventure that takes children and teens through time—from prehistory to the future—through coding, design, and creativity.",
    register: "Register Now",
    know: "Discover Prog{r}amming",
    aboutTitle: "Technology becomes an exciting adventure.",
    about: "Prog{r}amming is a SISO program that introduces children and teenagers to technology through coding, UI/UX design, and various technology platforms.",
    whyTitle: "Why join?",
    whySub: "More than sitting and listening. Every participant gets to experiment, create, and grow.",
    adventureTitle: "The Prog{r}amming 9.0 Adventure",
    adventureSub: "Four eras. Four experiences. One journey to the future.",
    mapTitle: "Adventure Map",
    galleryTitle: "Adventure Highlights",
    gallerySub: "Moments from the Prog{r}amming journey. Activity photos are coming soon.",
    faqTitle: "Frequently asked questions",
    formTitle: "Ready to begin your adventure?",
    formSub: "Share a few details. Complete registration information will be announced soon.",
  },
};

const eras = [
  { no: "9.1", icon: Atom, era: "PURBA", title: "Prog{r}amming Goes to School", theme: "Petualangan Masa Purbakala", text: "Workshop teknologi interaktif untuk siswa sekolah dengan Code.org, Scratch, MIT App Inventor, dan Figma.", verb: "EXPLORE", tone: "era-prehistoric" },
  { no: "9.2", icon: Castle, era: "KINGDOMS", title: "Prog{r}amming 9.2", theme: "Petualangan Masa Kerajaan", text: "Kelas interaktif dengan fokus kreativitas dan kolaborasi melalui berbagai platform teknologi.", verb: "CREATE", tone: "era-kingdom" },
  { no: "9.3", icon: Cog, era: "INDUSTRIAL", title: "Prog{r}amming 9.3", theme: "Petualangan Revolusi Industri", text: "Kelas teknologi bernuansa inovasi dan masa depan melalui Code.org, Scratch, MIT App Inventor, dan Figma.", verb: "INVENT", tone: "era-industrial" },
  { no: "9.4", icon: Rocket, era: "THE FUTURE", title: "Prog{r}amming 9.4", theme: "Present → Future", text: "UI/UX Design Competition dan Hackathon 24 jam untuk tim 3–4 orang, berdasarkan real case dari mitra.", verb: "INNOVATE", tone: "era-future" },
];

const benefits = [
  { icon: Code2, title: "Belajar Teknologi", text: "Kenalan dengan coding dan desain lewat pengalaman langsung." },
  { icon: Palette, title: "Mengembangkan Kreativitas", text: "Ubah ide menjadi karya digital yang bermakna." },
  { icon: Gamepad2, title: "Belajar Sambil Bermain", text: "Materi interaktif yang seru, mudah diikuti, dan relevan." },
  { icon: Users, title: "Berkolaborasi", text: "Berbagi ide dan memecahkan tantangan bersama teman." },
];

function PixelCloud({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pixel-cloud ${className}`}><i /><i /><i /><i /></div>;
}

function Index() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [menu, setMenu] = useState(false);
  const t = copy[lang];
  const navHref = ["#tentang", "#kenapa", "#petualangan", "#faq"];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary/20 bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <a href="#top" className="min-w-0 font-pixel text-sm text-primary sm:text-base">PROG<span className="text-foreground">&#123;R&#125;</span>AMMING <span className="text-foreground">9.0</span></a>
          <div className="hidden items-center gap-7 lg:flex">
            {t.nav.map((item, i) => <a key={item} href={navHref[i]} className="text-sm font-bold text-foreground/75 transition-colors hover:text-primary">{item}</a>)}
            <div className="flex rounded-md border-2 border-foreground bg-card p-0.5 text-xs font-black">
              <button onClick={() => setLang("id")} className={`rounded-sm px-2 py-1 ${lang === "id" ? "bg-primary text-primary-foreground" : "text-foreground"}`}>ID</button>
              <button onClick={() => setLang("en")} className={`rounded-sm px-2 py-1 ${lang === "en" ? "bg-primary text-primary-foreground" : "text-foreground"}`}>EN</button>
            </div>
            <Button asChild size="sm" className="game-button"><a href="#daftar">{t.register}</a></Button>
          </div>
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setMenu(!menu)} aria-label="Buka menu">{menu ? <X /> : <Menu />}</Button>
        </div>
        {menu && <div className="border-t bg-background px-4 py-4 lg:hidden">{t.nav.map((item, i) => <a key={item} onClick={() => setMenu(false)} href={navHref[i]} className="block border-b py-3 font-bold">{item}</a>)}<div className="mt-4 flex gap-2"><Button size="sm" variant={lang === "id" ? "default" : "outline"} onClick={() => setLang("id")}>ID</Button><Button size="sm" variant={lang === "en" ? "default" : "outline"} onClick={() => setLang("en")}>EN</Button></div></div>}
      </nav>

      <section id="top" className="hero-sky relative flex min-h-[92vh] items-center pt-20">
        <PixelCloud className="left-[3%] top-28" /><PixelCloud className="right-[8%] top-40 scale-75" />
        <div className="absolute inset-x-0 bottom-0 h-40 pixel-land" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 pb-28 pt-8 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-primary bg-card px-4 py-2 text-xs font-black uppercase text-primary shadow-pixel"><Sparkles className="size-4" /> Time travel technology adventure</div>
            <h1 className="font-pixel text-[clamp(2rem,6vw,4.7rem)] leading-[1.15] text-foreground pixel-title">PROG<span className="text-primary">&#123;R&#125;</span>AMMING <span className="text-accent">9.0</span></h1>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black leading-tight text-foreground sm:text-4xl lg:mx-0 lg:text-5xl">{t.headline}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg lg:mx-0">{t.intro}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="game-button h-13 px-7"><a href="#daftar">{t.register}<ArrowRight /></a></Button>
              <Button asChild size="lg" variant="outline" className="game-button-secondary h-13 px-7"><a href="#tentang">{t.know}<ArrowDown /></a></Button>
            </div>
          </div>
          <div className="relative mx-auto flex min-h-96 w-full max-w-lg items-center justify-center">
            <div className="time-portal absolute h-72 w-72 rounded-full sm:h-96 sm:w-96" />
            <span className="pixel-star absolute left-8 top-12">✦</span><span className="pixel-star absolute right-6 top-24">✦</span><span className="pixel-star absolute bottom-20 right-14">✦</span>
            <img src={mascotAsset.url} alt="Pomi, maskot resmi Prog{r}amming 9.0" width={537} height={751} className="mascot-float relative z-10 h-[26rem] w-auto max-w-[78%] object-contain" />
            <div className="absolute bottom-2 z-20 rounded-md border-2 border-foreground bg-accent px-4 py-2 font-pixel text-xs text-accent-foreground shadow-pixel">READY, EXPLORER?</div>
          </div>
        </div>
      </section>

      <section id="tentang" className="section-pad bg-card">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div><p className="eyebrow">01 / ABOUT THE MISSION</p><h2 className="section-title">{t.aboutTitle}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{t.about}</p></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[{n:"01",name:"Code.org",i:Code2},{n:"02",name:"Scratch",i:Gamepad2},{n:"03",name:"MIT App Inventor",i:Boxes},{n:"04",name:"Figma",i:Palette}].map(({n,name,i:Icon}) => <div key={name} className="platform-card"><span className="font-pixel text-[10px] text-primary">{n}</span><Icon className="my-5 size-9 text-accent"/><strong className="leading-tight">{name}</strong></div>)}
          </div>
        </div>
      </section>

      <section id="kenapa" className="section-pad bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><p className="eyebrow">LEVEL UP YOUR SKILLS</p><h2 className="section-title">{t.whyTitle}</h2><p className="mt-4 text-lg text-muted-foreground">{t.whySub}</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(({icon:Icon,title,text},i)=><article key={title} className="benefit-card"><span className="mb-8 flex size-12 items-center justify-center rounded-md border-2 border-foreground bg-accent text-accent-foreground shadow-pixel"><Icon /></span><span className="font-pixel text-[10px] text-primary">0{i+1}</span><h3 className="mt-2 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
        </div>
      </section>

      <section id="petualangan" className="section-pad bg-foreground text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center"><p className="eyebrow text-accent">CHOOSE YOUR ERA</p><h2 className="section-title text-primary-foreground">{t.adventureTitle}</h2><p className="mx-auto mt-4 max-w-2xl text-primary-foreground/65">{t.adventureSub}</p></div>
          <div className="relative mt-14 grid gap-6 md:grid-cols-2"><div className="timeline-line" />{eras.map(({no,icon:Icon,era,title,theme,text,verb,tone})=><article key={no} className={`era-card ${tone}`}><div className="flex items-start justify-between gap-4"><span className="era-number">{no}</span><Icon className="size-9" /></div><p className="mt-8 font-pixel text-[10px] opacity-70">{era}</p><h3 className="mt-2 text-2xl font-black">{title}</h3><p className="mt-1 font-bold">{theme}</p><p className="mt-4 text-sm leading-6 opacity-75">{text}</p><div className="mt-6 inline-flex items-center gap-2 font-pixel text-[10px]">{verb}<ArrowRight className="size-4" /></div></article>)}</div>
        </div>
      </section>

      <section className="section-pad map-sky">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center"><p className="eyebrow">YOUR JOURNEY</p><h2 className="section-title">{t.mapTitle}</h2></div>
          <div className="adventure-map mt-12">
            <div className="map-path" />
            {[{l:"START",i:Flag},{l:"9.1",i:Atom},{l:"9.2",i:Castle},{l:"9.3",i:Cog},{l:"9.4",i:Rocket},{l:"FINISH",i:Sparkles}].map(({l,i:Icon},idx)=><div key={l} className={`map-stop ${idx%2 ? "map-stop-low" : ""}`}><div className="map-icon"><Icon /></div><span>{l}</span></div>)}
          </div>
        </div>
      </section>

      <section id="galeri" className="section-pad bg-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">MEMORY ARCHIVE</p><h2 className="section-title">{t.galleryTitle}</h2></div><p className="max-w-md text-muted-foreground">{t.gallerySub}</p></div>
          <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4">{["Workshop Coding","Creative Class","Team Challenge","Future Makers","School Visit","Demo Day"].map((label,i)=><div key={label} className={`gallery-placeholder ${i===0||i===5?"col-span-2":""}`}><div><Bot className="mx-auto size-8"/><span>{label}</span><small>COMING SOON</small></div></div>)}</div>
        </div>
      </section>

      <section id="faq" className="section-pad bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-8"><div><p className="eyebrow">NEED A CLUE?</p><h2 className="section-title">{t.faqTitle}</h2><div className="mt-6 rounded-md border-2 border-primary bg-card p-5 shadow-pixel"><MessageCircle className="size-7 text-primary"/><p className="mt-3 font-bold">Masih ada pertanyaan?</p><p className="mt-1 text-sm text-muted-foreground">Kontak resmi akan segera diumumkan.</p></div></div><Accordion type="single" collapsible className="space-y-3">{[
          ["Siapa yang bisa ikut?","Program ditujukan untuk peserta jenjang TK, SD, SMP, dan SMA. Detail peserta untuk setiap rangkaian akan segera diumumkan."],
          ["Apakah harus sudah bisa coding?","Tidak. Kegiatan dirancang agar dapat diikuti pemula dan memperkenalkan teknologi secara bertahap."],
          ["Apa saja yang akan dipelajari?","Peserta akan mengeksplorasi coding, kreativitas digital, desain UI/UX, dan kolaborasi melalui Code.org, Scratch, MIT App Inventor, atau Figma sesuai program."],
          ["Bagaimana cara mendaftar?","Isi formulir minat di bawah. Tautan dan jadwal pendaftaran resmi akan segera diumumkan."],
          ["Di mana acaranya?","Informasi akan segera diumumkan."],
        ].map(([q,a],i)=><AccordionItem key={q} value={`item-${i}`} className="rounded-md border-2 border-border bg-card px-5 shadow-sm"><AccordionTrigger className="text-base font-black hover:no-underline">{q}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div>
      </section>

      <section id="daftar" className="section-pad bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div><p className="font-pixel text-xs text-accent">FINAL CHECKPOINT</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">{t.formTitle}</h2><p className="mt-5 max-w-md text-lg text-primary-foreground/75">{t.formSub}</p><img src={mascotAsset.url} alt="Pomi mengajak peserta mendaftar" loading="lazy" width={537} height={751} className="mt-8 hidden h-56 w-auto md:block" /></div>
          <form onSubmit={(e)=>e.preventDefault()} className="rounded-lg border-2 border-foreground bg-card p-5 text-card-foreground shadow-pixel-lg sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Nama lengkap<Input placeholder="Nama peserta" className="form-control" /></label><label className="field-label">Sekolah<Input placeholder="Nama sekolah" className="form-control" /></label><label className="field-label">Jenjang pendidikan<Select><SelectTrigger className="form-control"><SelectValue placeholder="Pilih jenjang" /></SelectTrigger><SelectContent><SelectItem value="tk">TK</SelectItem><SelectItem value="sd">SD</SelectItem><SelectItem value="smp">SMP</SelectItem><SelectItem value="sma">SMA</SelectItem></SelectContent></Select></label><label className="field-label">Email<Input type="email" placeholder="nama@email.com" className="form-control" /></label><label className="field-label">WhatsApp<Input type="tel" placeholder="08xxxxxxxxxx" className="form-control" /></label><label className="field-label">Pilihan program<Select><SelectTrigger className="form-control"><SelectValue placeholder="Pilih program" /></SelectTrigger><SelectContent>{eras.map(e=><SelectItem key={e.no} value={e.no}>{e.no} — {e.title}</SelectItem>)}</SelectContent></Select></label></div>
            <Button type="submit" size="lg" className="game-button mt-7 w-full">{t.register}<ArrowRight /></Button><p className="mt-4 text-center text-xs text-muted-foreground">Formulir ini adalah pencatatan minat. Informasi pendaftaran resmi akan segera diumumkan.</p>
          </form>
        </div>
      </section>

      <footer className="bg-foreground py-10 text-primary-foreground"><div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-[1fr_auto] sm:px-6 lg:px-8"><div><p className="font-pixel text-lg text-accent">PROG&#123;R&#125;AMMING 9.0</p><p className="mt-3 text-sm text-primary-foreground/65">STEM Innovation Student Organization<br/>Universitas Prasetiya Mulya</p></div><div className="flex items-center gap-3"><a className="social-button" href="#" aria-label="Instagram"><Instagram /></a><a className="social-button" href="#" aria-label="Email"><Mail /></a></div></div><div className="mx-auto mt-8 max-w-6xl border-t border-primary-foreground/15 px-4 pt-6 text-xs text-primary-foreground/45 sm:px-6 lg:px-8">© 2026 Prog&#123;r&#125;amming 9.0 · Contact & social media will be announced soon.</div></footer>
    </main>
  );
}