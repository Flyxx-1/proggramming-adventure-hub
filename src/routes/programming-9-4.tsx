import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, Code2, Lightbulb, Menu, MoonStar, Palette, Presentation, Users, X } from "lucide-react";

import mascotAsset from "@/assets/pomi-official-cropped.png.asset.json";
import { TimeModeToggle, TimeSky, useSiteLanguage, useTimeMode } from "@/components/programming/site-preferences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/programming-9-4")({
  head: () => ({
    meta: [
      { title: "Prog{r}amming 9.4 | Future Competition" },
      { name: "description", content: "UI/UX Design Competition dan Hackathon Prog{r}amming 9.4 untuk siswa SMA dan mahasiswa." },
      { property: "og:title", content: "Prog{r}amming 9.4 | Future Competition" },
      { property: "og:description", content: "Kompetisi solusi digital berbasis real case untuk siswa SMA dan mahasiswa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Programming94,
});

const content = {
  id: {
    back: "Kembali ke 9.0", menu: "Buka menu", chapter: "CHAPTER 04 / THE FUTURE", title: "Prog{r}amming 9.4", headline: "Bangun solusi untuk tantangan nyata.",
    intro: "Chapter kompetisi untuk siswa SMA dan mahasiswa yang siap mengubah ide menjadi solusi digital, lalu mempertahankannya di hadapan panel.", register: "Daftar 9.4", explore: "Lihat kompetisi",
    audience: "Untuk SMA & mahasiswa", competition: "Dua jalur kompetisi", compIntro: "Pilih cara terbaikmu membangun masa depan.",
    tracks: [
      { title: "UI/UX Design Competition", text: "Rancang pengalaman digital yang relevan, terarah, dan menjawab kebutuhan pengguna dari sebuah real case." },
      { title: "Hackathon", text: "Bekerja dalam tim berisi 3–4 orang selama 24 jam untuk membangun solusi digital dari real case partner atau perusahaan." },
    ],
    journey: "Dari tantangan menjadi solusi", steps: ["Memahami real case", "Mengembangkan ide", "Membuat solusi digital", "Melakukan presentasi"],
    values: ["Real case partner/perusahaan", "Tim 3–4 orang", "Hackathon 24 jam", "Presentasi solusi"],
    formEyebrow: "REGISTRATION CHECKPOINT", formTitle: "Daftar Prog{r}amming 9.4", formText: "Formulir minat khusus 9.4. Informasi pendaftaran resmi akan segera diumumkan.",
    note: "Pendaftaran tim 3–4 orang untuk kompetisi.", submit: "Kirim pendaftaran 9.4", disclaimer: "Formulir ini adalah pencatatan minat. Tanggal, lokasi, harga, dan detail resmi akan segera diumumkan.",
    success: "Pendaftaran 9.4 tercatat!", successText: "Terima kasih. Informasi lanjutan akan segera diumumkan.", again: "Isi lagi",
    fields: { team: "Nama tim", teamPh: "Nama tim", category: "Kategori kompetisi", categoryPh: "Pilih kategori", leader: "Nama ketua tim", leaderPh: "Nama ketua tim", institution: "Asal sekolah / institusi", institutionPh: "Nama sekolah atau kampus", members: "Jumlah anggota tim", membersPh: "Pilih jumlah", email: "Email ketua tim", whatsapp: "WhatsApp ketua tim" },
    footer: "STEM Innovation Student Organization · Universitas Prasetiya Mulya",
  },
  en: {
    back: "Back to 9.0", menu: "Open menu", chapter: "CHAPTER 04 / THE FUTURE", title: "Prog{r}amming 9.4", headline: "Build solutions for real challenges.",
    intro: "A competition chapter for high school and university students ready to turn ideas into digital solutions and present them to a panel.", register: "Register for 9.4", explore: "Explore competitions",
    audience: "For high school & university students", competition: "Two competition tracks", compIntro: "Choose how you will help build the future.",
    tracks: [
      { title: "UI/UX Design Competition", text: "Design a relevant, focused digital experience that responds to user needs from a real case." },
      { title: "Hackathon", text: "Work in a team of 3–4 for 24 hours to build a digital solution based on a real case from a partner or company." },
    ],
    journey: "From challenge to solution", steps: ["Understand the real case", "Develop the idea", "Build a digital solution", "Present the solution"],
    values: ["Partner/company real case", "Teams of 3–4", "24-hour Hackathon", "Solution presentation"],
    formEyebrow: "REGISTRATION CHECKPOINT", formTitle: "Register for Prog{r}amming 9.4", formText: "A dedicated interest form for 9.4. Official registration information will be announced soon.",
    note: "Team registration for 3–4 competition members.", submit: "Submit 9.4 registration", disclaimer: "This form records interest. Dates, location, fees, and official details will be announced soon.",
    success: "Your 9.4 registration is recorded!", successText: "Thank you. Further information will be announced soon.", again: "Fill it again",
    fields: { team: "Team name", teamPh: "Team name", category: "Competition category", categoryPh: "Select category", leader: "Team leader name", leaderPh: "Team leader name", institution: "School / institution", institutionPh: "School or university name", members: "Number of team members", membersPh: "Select number", email: "Team leader email", whatsapp: "Team leader WhatsApp" },
    footer: "STEM Innovation Student Organization · Universitas Prasetiya Mulya",
  },
};

function Programming94() {
  const [language, setLanguage] = useSiteLanguage();
  const [dark, toggleDark] = useTimeMode();
  const [menu, setMenu] = useState(false);
  const [done, setDone] = useState(false);
  const t = content[language];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="future-page min-h-screen overflow-hidden">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-future-line bg-future-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="min-w-0 font-pixel text-xs text-future-cyan sm:text-sm">PROG<span className="text-future-text">&#123;R&#125;</span>AMMING <span className="text-future-text">9.4</span></Link>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild className="text-future-muted hover:bg-future-card hover:text-future-text"><Link to="/"><ArrowLeft />{t.back}</Link></Button>
            <div className="flex rounded-md border border-future-line bg-future-card p-0.5 text-xs font-black"><button onClick={() => setLanguage("id")} className={`rounded px-2 py-1 ${language === "id" ? "bg-future-cyan text-future-bg" : "text-future-muted"}`}>ID</button><button onClick={() => setLanguage("en")} className={`rounded px-2 py-1 ${language === "en" ? "bg-future-cyan text-future-bg" : "text-future-muted"}`}>EN</button></div>
            <TimeModeToggle dark={dark} onToggle={toggleDark} language={language} compact />
            <Button className="future-cta" onClick={() => scrollTo("register-94")}>{t.register}</Button>
          </div>
          <Button variant="outline" size="icon" className="border-future-line bg-future-card text-future-text md:hidden" onClick={() => setMenu(!menu)} aria-label={t.menu}>{menu ? <X /> : <Menu />}</Button>
        </div>
        {menu && <div className="flex items-center gap-2 border-t border-future-line bg-future-bg px-4 py-3 md:hidden"><Button variant="ghost" asChild className="mr-auto text-future-muted"><Link to="/"><ArrowLeft />{t.back}</Link></Button><button onClick={() => setLanguage(language === "id" ? "en" : "id")} className="h-9 rounded-md border border-future-line px-3 text-xs font-bold text-future-text">{language === "id" ? "EN" : "ID"}</button><TimeModeToggle dark={dark} onToggle={toggleDark} language={language} compact /></div>}
      </nav>

      <section className="future-hero relative flex min-h-[92vh] items-center pt-20">
        <TimeSky />
        <div className="future-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:px-8">
          <div>
            <p className="font-pixel text-[10px] text-future-cyan">{t.chapter}</p>
            <h1 className="mt-6 font-pixel text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] text-future-text">PROG<span className="text-future-cyan">&#123;R&#125;</span>AMMING <span className="text-future-purple">9.4</span></h1>
            <h2 className="mt-8 max-w-3xl text-4xl font-black leading-tight text-future-text sm:text-5xl">{t.headline}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-future-muted">{t.intro}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-future-line bg-future-card px-4 py-2 text-sm font-bold text-future-cyan"><MoonStar className="size-4" />{t.audience}</div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button size="lg" className="future-cta h-12 px-7" onClick={() => scrollTo("register-94")}>{t.register}<ArrowRight /></Button><Button size="lg" variant="outline" className="h-12 border-future-line bg-future-card px-7 text-future-text hover:bg-future-panel" onClick={() => scrollTo("competitions")}>{t.explore}</Button></div>
          </div>
          <div className="relative mx-auto flex min-h-[28rem] w-full max-w-md items-end justify-center">
            <div className="future-portal absolute inset-10 rounded-full" aria-hidden="true" />
            <img src={mascotAsset.url} alt="Pomi, maskot resmi Prog{r}amming 9.0" width={537} height={751} className="future-mascot relative z-10 h-[29rem] w-auto max-w-full object-contain" />
          </div>
        </div>
      </section>

      <section id="competitions" className="bg-future-bg py-24 text-future-text sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-pixel text-[10px] text-future-cyan">02 / COMPETITION TRACKS</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">{t.competition}</h2><p className="mt-4 text-lg text-future-muted">{t.compIntro}</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">{t.tracks.map((track, i) => { const Icon = i === 0 ? Palette : Code2; return <article key={track.title} className="future-card"><div className="flex items-center justify-between"><span className="font-pixel text-[10px] text-future-cyan">0{i + 1}</span><Icon className="size-7 text-future-purple" /></div><h3 className="mt-14 text-3xl font-black">{track.title}</h3><p className="mt-4 max-w-xl leading-7 text-future-muted">{track.text}</p></article>; })}</div>
          <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-future-line bg-future-line sm:grid-cols-2 lg:grid-cols-4">{t.values.map((value, i) => { const icons = [BriefcaseBusiness, Users, Clock3, Presentation]; const Icon = icons[i] ?? Lightbulb; return <div key={value} className="flex min-h-32 flex-col justify-between bg-future-panel p-5"><Icon className="size-5 text-future-cyan"/><strong className="mt-8 text-sm">{value}</strong></div>; })}</div>
        </div>
      </section>

      <section className="bg-future-panel py-24 text-future-text sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><p className="font-pixel text-[10px] text-future-cyan">03 / PROCESS</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">{t.journey}</h2><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{t.steps.map((step, i) => <div key={step} className="relative border-t border-future-line pt-6"><span className="font-pixel text-xs text-future-purple">0{i + 1}</span><h3 className="mt-5 text-xl font-bold">{step}</h3>{i < 3 && <ArrowRight className="absolute right-0 top-5 hidden text-future-line lg:block" />}</div>)}</div></div>
      </section>

      <section id="register-94" className="bg-future-bg py-24 text-future-text sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div><p className="font-pixel text-[10px] text-future-cyan">{t.formEyebrow}</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">{t.formTitle}</h2><p className="mt-5 leading-7 text-future-muted">{t.formText}</p></div>
          {done ? <div className="future-card flex min-h-80 flex-col items-center justify-center text-center"><CheckCircle2 className="size-12 text-future-cyan"/><h3 className="mt-5 text-2xl font-black">{t.success}</h3><p className="mt-3 text-future-muted">{t.successText}</p><Button variant="outline" className="mt-7 border-future-line bg-future-panel text-future-text" onClick={() => setDone(false)}>{t.again}</Button></div> :
          <form onSubmit={(event) => { event.preventDefault(); setDone(true); }} className="future-card"><p className="mb-7 text-sm text-future-muted">{t.note}</p><div className="grid gap-5 sm:grid-cols-2">
            <label className="future-label">{t.fields.team}<Input required name="team" placeholder={t.fields.teamPh} className="future-control" /></label>
            <label className="future-label">{t.fields.category}<Select required name="category"><SelectTrigger className="future-control"><SelectValue placeholder={t.fields.categoryPh}/></SelectTrigger><SelectContent><SelectItem value="uiux">UI/UX Design Competition</SelectItem><SelectItem value="hackathon">Hackathon 24 hours</SelectItem></SelectContent></Select></label>
            <label className="future-label">{t.fields.leader}<Input required name="leader" placeholder={t.fields.leaderPh} className="future-control" /></label>
            <label className="future-label">{t.fields.institution}<Input required name="institution" placeholder={t.fields.institutionPh} className="future-control" /></label>
            <label className="future-label">{t.fields.members}<Select required name="members"><SelectTrigger className="future-control"><SelectValue placeholder={t.fields.membersPh}/></SelectTrigger><SelectContent><SelectItem value="3">3</SelectItem><SelectItem value="4">4</SelectItem></SelectContent></Select></label>
            <label className="future-label">{t.fields.email}<Input required type="email" name="email" placeholder="name@email.com" className="future-control" /></label>
            <label className="future-label sm:col-span-2">{t.fields.whatsapp}<Input required type="tel" name="whatsapp" placeholder="08xxxxxxxxxx" className="future-control" /></label>
          </div><Button type="submit" size="lg" className="future-cta mt-8 w-full">{t.submit}<ArrowRight /></Button><p className="mt-4 text-center text-xs text-future-muted">{t.disclaimer}</p></form>}
        </div>
      </section>

      <footer className="border-t border-future-line bg-future-bg py-8 text-future-muted"><div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><span className="font-pixel text-xs text-future-cyan">PROG&#123;R&#125;AMMING 9.4</span><span>{t.footer}</span></div></footer>
    </main>
  );
}