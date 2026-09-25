import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Atom, Bot, Castle, Code2, Cog, Flag, Gamepad2, Instagram, Mail, Menu, Palette, Rocket, Sparkles, Users, X } from "lucide-react";

import { EventCarousel, FaqSection, HeroCarousel, PlatformGrid, WhatsAppFloat } from "@/components/programming/sections";
import { TimeModeToggle, TimeSky, useSiteLanguage, useTimeMode } from "@/components/programming/site-preferences";
import { Button } from "@/components/ui/button";
import { EVENTS, SITE } from "@/data/programming";

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

type Field =
  | { k: string; label: string; ph: string; type?: string }
  | { k: string; label: string; ph: string; options: string[] };

type Lang = "id" | "en";

const copy = {
  id: {
    menuLabel: "Buka menu",
    nav: ["Tentang", "Kenapa Ikut", "Petualangan", "Galeri", "FAQ"],
    heroBadge: "Petualangan teknologi lintas waktu",
    headline: "Jelajahi Dunia Teknologi, Mulai Petualanganmu!",
    intro: "Petualangan belajar yang membawa anak dan remaja melintasi waktu—dari masa purba hingga masa depan—melalui coding, desain, dan kreativitas.",
    register: "Daftar Sekarang",
    know: "Kenali Prog{r}amming",
    heroTag: "SIAP, PENJELAJAH?",
    aboutEyebrow: "01 / TENTANG MISI",
    aboutTitle: "Teknologi jadi petualangan yang seru.",
    about: "Prog{r}amming merupakan program kerja SISO yang bertujuan mengenalkan dunia teknologi kepada anak-anak dan remaja melalui coding, desain UI/UX, dan berbagai platform teknologi.",
    whyEyebrow: "TINGKATKAN KEMAMPUANMU",
    whyTitle: "Kenapa ikut?",
    whySub: "Bukan sekadar duduk dan mendengar. Setiap peserta ikut mencoba, membuat, dan bertumbuh.",
    benefits: [
      { title: "Belajar Teknologi", text: "Kenalan dengan coding dan desain lewat pengalaman langsung." },
      { title: "Mengembangkan Kreativitas", text: "Ubah ide menjadi karya digital yang bermakna." },
      { title: "Belajar Sambil Bermain", text: "Materi interaktif yang seru, mudah diikuti, dan relevan." },
      { title: "Berkolaborasi", text: "Berbagi ide dan memecahkan tantangan bersama teman." },
    ],
    adventureEyebrow: "PILIH ERAMU",
    adventureTitle: "Petualangan Prog{r}amming 9.0",
    adventureSub: "Empat era. Empat pengalaman. Satu perjalanan menuju masa depan.",
    eras: [
      { title: "Prog{r}amming Goes to School", theme: "Petualangan Masa Purbakala", text: "Workshop teknologi interaktif untuk siswa sekolah dengan Code.org, Scratch, MIT App Inventor, dan Figma.", verb: "JELAJAHI" },
      { title: "Prog{r}amming 9.2", theme: "Petualangan Masa Kerajaan", text: "Kelas interaktif dengan fokus kreativitas dan kolaborasi melalui berbagai platform teknologi.", verb: "BERKARYA" },
      { title: "Prog{r}amming 9.3", theme: "Petualangan Revolusi Industri", text: "Kelas teknologi bernuansa inovasi dan masa depan melalui Code.org, Scratch, MIT App Inventor, dan Figma.", verb: "CIPTAKAN" },
      { title: "Prog{r}amming 9.4", theme: "Masa Kini → Masa Depan", text: "UI/UX Design Competition dan Hackathon 24 jam untuk tim 3–4 orang, berdasarkan real case dari mitra.", verb: "BERINOVASI" },
    ],
    eraCta: "Daftar rangkaian ini",
    mapEyebrow: "PERJALANANMU",
    mapTitle: "Peta Petualangan",
    mapStops: ["MULAI", "9.1", "9.2", "9.3", "9.4", "SELESAI"],
    galleryEyebrow: "ARSIP MOMEN",
    galleryTitle: "Jejak Petualangan",
    gallerySub: "Keseruan dari perjalanan Prog{r}amming. Foto kegiatan akan hadir di sini.",
    gallery: ["Workshop Coding", "Kelas Kreatif", "Tantangan Tim", "Future Makers", "Kunjungan Sekolah", "Demo Day"],
    soon: "SEGERA HADIR",
    faqEyebrow: "BUTUH PETUNJUK?",
    faqTitle: "Pertanyaan yang sering ditanyakan",
    faqBoxTitle: "Masih ada pertanyaan?",
    faqBoxText: "Kontak resmi akan segera diumumkan.",
    faq: [
      ["Siapa yang bisa ikut?", "Program ditujukan untuk peserta jenjang TK, SD, SMP, dan SMA. Detail peserta untuk setiap rangkaian akan segera diumumkan."],
      ["Apakah harus sudah bisa coding?", "Tidak. Kegiatan dirancang agar dapat diikuti pemula dan memperkenalkan teknologi secara bertahap."],
      ["Apa saja yang akan dipelajari?", "Peserta akan mengeksplorasi coding, kreativitas digital, desain UI/UX, dan kolaborasi melalui Code.org, Scratch, MIT App Inventor, atau Figma sesuai program."],
      ["Bagaimana cara mendaftar?", "Pilih rangkaian yang diinginkan pada bagian pendaftaran di bawah, lalu isi formulirnya. Tautan dan jadwal pendaftaran resmi akan segera diumumkan."],
      ["Di mana acaranya?", "Informasi akan segera diumumkan."],
    ],
    formEyebrow: "CHECKPOINT TERAKHIR",
    formTitle: "Siap memulai petualanganmu?",
    formSub: "Setiap rangkaian punya pendaftaran sendiri. Pilih rangkaian yang kamu ikuti, lalu isi formulirnya.",
    pick: "Pilih rangkaian:",
    submit: "Kirim pendaftaran",
    disclaimer: "Formulir ini adalah pencatatan minat. Informasi pendaftaran resmi akan segera diumumkan.",
    successTitle: "Pendaftaran tercatat!",
    successText: "Terima kasih. Data kamu sudah kami catat untuk rangkaian ini. Informasi lanjutan akan segera diumumkan.",
    again: "Isi formulir lagi",
    choose: "Pilih salah satu",
    footerOrg: "STEM Innovation Student Organization",
    footerUni: "Universitas Prasetiya Mulya",
    footerNote: "© 2026 Prog{r}amming 9.0 · Kontak dan media sosial akan segera diumumkan.",
    forms: {
      "9.1": {
        note: "Pendaftaran kolektif untuk sekolah yang ingin dikunjungi.",
        fields: [
          { k: "sekolah", label: "Nama sekolah", ph: "Nama sekolah" },
          { k: "pic", label: "Nama guru penanggung jawab", ph: "Nama guru" },
          { k: "jenjang", label: "Jenjang siswa", ph: "Pilih jenjang", options: ["TK", "SD", "SMP", "SMA"] },
          { k: "jumlah", label: "Perkiraan jumlah siswa", ph: "contoh: 40" },
          { k: "email", label: "Email sekolah", ph: "sekolah@email.com", type: "email" },
          { k: "wa", label: "WhatsApp penanggung jawab", ph: "08xxxxxxxxxx", type: "tel" },
        ] as Field[],
      },
      "9.2": {
        note: "Pendaftaran individu untuk kelas kreatif Masa Kerajaan.",
        fields: [
          { k: "nama", label: "Nama peserta", ph: "Nama lengkap peserta" },
          { k: "sekolah", label: "Asal sekolah", ph: "Nama sekolah" },
          { k: "jenjang", label: "Jenjang pendidikan", ph: "Pilih jenjang", options: ["TK", "SD", "SMP", "SMA"] },
          { k: "wali", label: "Nama orang tua / wali", ph: "Nama orang tua atau wali" },
          { k: "email", label: "Email orang tua / wali", ph: "nama@email.com", type: "email" },
          { k: "wa", label: "WhatsApp orang tua / wali", ph: "08xxxxxxxxxx", type: "tel" },
        ] as Field[],
      },
      "9.3": {
        note: "Pendaftaran individu untuk kelas teknologi Revolusi Industri.",
        fields: [
          { k: "nama", label: "Nama peserta", ph: "Nama lengkap peserta" },
          { k: "sekolah", label: "Asal sekolah", ph: "Nama sekolah" },
          { k: "jenjang", label: "Jenjang pendidikan", ph: "Pilih jenjang", options: ["SD", "SMP", "SMA"] },
          { k: "pengalaman", label: "Pengalaman coding", ph: "Pilih pengalaman", options: ["Belum pernah", "Pemula", "Pernah beberapa kali"] },
          { k: "email", label: "Email", ph: "nama@email.com", type: "email" },
          { k: "wa", label: "WhatsApp", ph: "08xxxxxxxxxx", type: "tel" },
        ] as Field[],
      },
      "9.4": {
        note: "Pendaftaran tim 3–4 orang untuk kompetisi.",
        fields: [
          { k: "tim", label: "Nama tim", ph: "Nama tim" },
          { k: "kategori", label: "Kategori kompetisi", ph: "Pilih kategori", options: ["UI/UX Design Competition", "Hackathon 24 jam"] },
          { k: "ketua", label: "Nama ketua tim", ph: "Nama ketua tim" },
          { k: "sekolah", label: "Asal sekolah / institusi", ph: "Nama sekolah" },
          { k: "anggota", label: "Jumlah anggota tim", ph: "Pilih jumlah", options: ["3 orang", "4 orang"] },
          { k: "email", label: "Email ketua tim", ph: "nama@email.com", type: "email" },
          { k: "wa", label: "WhatsApp ketua tim", ph: "08xxxxxxxxxx", type: "tel" },
        ] as Field[],
      },
    },
  },
  en: {
    menuLabel: "Open menu",
    nav: ["About", "Why Join", "Adventure", "Gallery", "FAQ"],
    heroBadge: "A time-travel technology adventure",
    headline: "Explore the World of Technology. Begin Your Adventure!",
    intro: "A learning adventure that takes children and teens through time—from prehistory to the future—through coding, design, and creativity.",
    register: "Register Now",
    know: "Discover Prog{r}amming",
    heroTag: "READY, EXPLORER?",
    aboutEyebrow: "01 / ABOUT THE MISSION",
    aboutTitle: "Technology becomes an exciting adventure.",
    about: "Prog{r}amming is a SISO program that introduces children and teenagers to technology through coding, UI/UX design, and various technology platforms.",
    whyEyebrow: "LEVEL UP YOUR SKILLS",
    whyTitle: "Why join?",
    whySub: "More than sitting and listening. Every participant gets to experiment, create, and grow.",
    benefits: [
      { title: "Learn Technology", text: "Get to know coding and design through hands-on experience." },
      { title: "Grow Creativity", text: "Turn ideas into meaningful digital work." },
      { title: "Learn Through Play", text: "Interactive material that is fun, easy to follow, and relevant." },
      { title: "Collaborate", text: "Share ideas and solve challenges together with friends." },
    ],
    adventureEyebrow: "CHOOSE YOUR ERA",
    adventureTitle: "The Prog{r}amming 9.0 Adventure",
    adventureSub: "Four eras. Four experiences. One journey to the future.",
    eras: [
      { title: "Prog{r}amming Goes to School", theme: "The Prehistoric Adventure", text: "Interactive technology workshops for school students using Code.org, Scratch, MIT App Inventor, and Figma.", verb: "EXPLORE" },
      { title: "Prog{r}amming 9.2", theme: "The Kingdom Adventure", text: "An interactive class focused on creativity and collaboration across technology platforms.", verb: "CREATE" },
      { title: "Prog{r}amming 9.3", theme: "The Industrial Revolution Adventure", text: "A technology class about innovation and the future through Code.org, Scratch, MIT App Inventor, and Figma.", verb: "INVENT" },
      { title: "Prog{r}amming 9.4", theme: "Present → Future", text: "A UI/UX Design Competition and a 24-hour Hackathon for teams of 3–4, based on real partner cases.", verb: "INNOVATE" },
    ],
    eraCta: "Register for this edition",
    mapEyebrow: "YOUR JOURNEY",
    mapTitle: "Adventure Map",
    mapStops: ["START", "9.1", "9.2", "9.3", "9.4", "FINISH"],
    galleryEyebrow: "MEMORY ARCHIVE",
    galleryTitle: "Adventure Highlights",
    gallerySub: "Moments from the Prog{r}amming journey. Activity photos are coming soon.",
    gallery: ["Coding Workshop", "Creative Class", "Team Challenge", "Future Makers", "School Visit", "Demo Day"],
    soon: "COMING SOON",
    faqEyebrow: "NEED A CLUE?",
    faqTitle: "Frequently asked questions",
    faqBoxTitle: "Still have questions?",
    faqBoxText: "Official contact details will be announced soon.",
    faq: [
      ["Who can join?", "The program is for kindergarten, elementary, junior high, and high school students. Participant details for each edition will be announced soon."],
      ["Do I need coding experience?", "No. The activities are designed for beginners and introduce technology step by step."],
      ["What will I learn?", "Participants explore coding, digital creativity, UI/UX design, and collaboration through Code.org, Scratch, MIT App Inventor, or Figma depending on the program."],
      ["How do I register?", "Choose the edition you want in the registration section below, then fill in its form. Official registration links and dates will be announced soon."],
      ["Where is the event held?", "Information will be announced soon."],
    ],
    formEyebrow: "FINAL CHECKPOINT",
    formTitle: "Ready to begin your adventure?",
    formSub: "Each edition has its own registration. Pick the edition you are joining, then fill in its form.",
    pick: "Choose an edition:",
    submit: "Submit registration",
    disclaimer: "This form records your interest. Official registration information will be announced soon.",
    successTitle: "Registration recorded!",
    successText: "Thank you. We have noted your details for this edition. Further information will be announced soon.",
    again: "Fill the form again",
    choose: "Select one",
    footerOrg: "STEM Innovation Student Organization",
    footerUni: "Universitas Prasetiya Mulya",
    footerNote: "© 2026 Prog{r}amming 9.0 · Contact and social media will be announced soon.",
    forms: {
      "9.1": {
        note: "Group registration for schools that would like a visit.",
        fields: [
          { k: "sekolah", label: "School name", ph: "School name" },
          { k: "pic", label: "Teacher in charge", ph: "Teacher name" },
          { k: "jenjang", label: "Student level", ph: "Select level", options: ["Kindergarten", "Elementary", "Junior High", "High School"] },
          { k: "jumlah", label: "Estimated number of students", ph: "e.g. 40" },
          { k: "email", label: "School email", ph: "school@email.com", type: "email" },
          { k: "wa", label: "WhatsApp of teacher in charge", ph: "08xxxxxxxxxx", type: "tel" },
        ] as Field[],
      },
      "9.2": {
        note: "Individual registration for the Kingdom-era creative class.",
        fields: [
          { k: "nama", label: "Participant name", ph: "Full name" },
          { k: "sekolah", label: "School", ph: "School name" },
          { k: "jenjang", label: "Education level", ph: "Select level", options: ["Kindergarten", "Elementary", "Junior High", "High School"] },
          { k: "wali", label: "Parent / guardian name", ph: "Parent or guardian name" },
          { k: "email", label: "Parent / guardian email", ph: "name@email.com", type: "email" },
          { k: "wa", label: "Parent / guardian WhatsApp", ph: "08xxxxxxxxxx", type: "tel" },
        ] as Field[],
      },
      "9.3": {
        note: "Individual registration for the Industrial Revolution technology class.",
        fields: [
          { k: "nama", label: "Participant name", ph: "Full name" },
          { k: "sekolah", label: "School", ph: "School name" },
          { k: "jenjang", label: "Education level", ph: "Select level", options: ["Elementary", "Junior High", "High School"] },
          { k: "pengalaman", label: "Coding experience", ph: "Select experience", options: ["None yet", "Beginner", "Some experience"] },
          { k: "email", label: "Email", ph: "name@email.com", type: "email" },
          { k: "wa", label: "WhatsApp", ph: "08xxxxxxxxxx", type: "tel" },
        ] as Field[],
      },
      "9.4": {
        note: "Team registration (3–4 members) for the competitions.",
        fields: [
          { k: "tim", label: "Team name", ph: "Team name" },
          { k: "kategori", label: "Competition category", ph: "Select category", options: ["UI/UX Design Competition", "24-hour Hackathon"] },
          { k: "ketua", label: "Team leader name", ph: "Team leader name" },
          { k: "sekolah", label: "School / institution", ph: "School name" },
          { k: "anggota", label: "Number of team members", ph: "Select number", options: ["3 members", "4 members"] },
          { k: "email", label: "Team leader email", ph: "name@email.com", type: "email" },
          { k: "wa", label: "Team leader WhatsApp", ph: "08xxxxxxxxxx", type: "tel" },
        ] as Field[],
      },
    },
  },
};

type EraKey = "9.1" | "9.2" | "9.3" | "9.4";

const eraMeta = [
  { no: "9.1" as EraKey, icon: Atom, era: "PURBA", tone: "era-prehistoric" },
  { no: "9.2" as EraKey, icon: Castle, era: "KINGDOMS", tone: "era-kingdom" },
  { no: "9.3" as EraKey, icon: Cog, era: "INDUSTRIAL", tone: "era-industrial" },
  { no: "9.4" as EraKey, icon: Rocket, era: "THE FUTURE", tone: "era-future" },
];

const benefitIcons = [Code2, Palette, Gamepad2, Users];
const mapIcons = [Flag, Atom, Castle, Cog, Rocket, Sparkles];

function PixelCloud({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pixel-cloud ${className}`}><i /><i /><i /><i /></div>;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  const [lang, setLang] = useSiteLanguage();
  const [dark, toggleTime] = useTimeMode();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [contact, setContact] = useState(false);
  const t = copy[lang];
  const navHref = ["tentang", "kenapa", "petualangan", "galeri", "faq"];

  const goRegister = () => {
    setMenu(false);
    scrollToId("daftar");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary/20 bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button onClick={() => scrollToId("top")} className="min-w-0 cursor-pointer text-left font-pixel text-sm text-primary transition-opacity hover:opacity-80 sm:text-base">PROG<span className="text-foreground">&#123;R&#125;</span>AMMING <span className="text-foreground">9.0</span></button>
          <div className="hidden items-center gap-7 lg:flex">
            {t.nav.map((item, i) => (
              <button key={item} onClick={() => scrollToId(navHref[i]!)} className="cursor-pointer text-sm font-bold text-foreground/75 transition-colors hover:text-primary">{item}</button>
            ))}
            <div className="flex rounded-md border-2 border-foreground bg-card p-0.5 text-xs font-black">
              <button onClick={() => setLang("id")} className={`cursor-pointer rounded-sm px-2 py-1 transition-colors ${lang === "id" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>ID</button>
              <button onClick={() => setLang("en")} className={`cursor-pointer rounded-sm px-2 py-1 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>EN</button>
            </div>
            <TimeModeToggle dark={dark} onToggle={toggleTime} language={lang} />
            <Button size="sm" className="game-button" onClick={() => goRegister()}>{t.register}</Button>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <TimeModeToggle dark={dark} onToggle={toggleTime} language={lang} compact />
            <Button variant="outline" size="icon" onClick={() => setMenu(!menu)} aria-label={t.menuLabel}>{menu ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menu && (
          <div className="border-t bg-background px-4 py-4 lg:hidden">
            {t.nav.map((item, i) => (
              <button key={item} onClick={() => { setMenu(false); scrollToId(navHref[i]!); }} className="block w-full border-b py-3 text-left font-bold">{item}</button>
            ))}
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant={lang === "id" ? "default" : "outline"} onClick={() => setLang("id")}>ID</Button>
              <Button size="sm" variant={lang === "en" ? "default" : "outline"} onClick={() => setLang("en")}>EN</Button>
              <Button size="sm" className="game-button ml-auto" onClick={() => goRegister()}>{t.register}</Button>
            </div>
          </div>
        )}
      </nav>

      <section id="top" className="hero-sky relative flex min-h-[92vh] items-center overflow-hidden pt-20">
        <TimeSky />
        <PixelCloud className="left-[3%] top-28" /><PixelCloud className="right-[8%] top-40 scale-75" />
        <div className="absolute inset-x-0 bottom-0 h-40 pixel-land" aria-hidden="true" />
        <HeroCarousel lang={lang} onRegister={() => goRegister()} onLearn={() => scrollToId("tentang")} />
      </section>

      <section id="tentang" className="section-pad bg-card">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div><p className="eyebrow">{t.aboutEyebrow}</p><h2 className="section-title">{t.aboutTitle}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{t.about}</p></div>
          <PlatformGrid lang={lang} />
        </div>
      </section>

      <section id="kenapa" className="section-pad bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><p className="eyebrow">{t.whyEyebrow}</p><h2 className="section-title">{t.whyTitle}</h2><p className="mt-4 text-lg text-muted-foreground">{t.whySub}</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{t.benefits.map(({title,text},i)=>{const Icon=benefitIcons[i]!;return <article key={title} className="benefit-card"><span className="mb-8 flex size-12 items-center justify-center rounded-md border-2 border-foreground bg-accent text-accent-foreground shadow-pixel"><Icon /></span><span className="font-pixel text-[10px] text-primary">0{i+1}</span><h3 className="mt-2 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>;})}</div>
        </div>
      </section>

      <section id="petualangan" className="section-pad bg-foreground text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center"><p className="eyebrow text-accent">{t.adventureEyebrow}</p><h2 className="section-title text-primary-foreground">{t.adventureTitle}</h2><p className="mx-auto mt-4 max-w-2xl text-primary-foreground/65">{t.adventureSub}</p></div>
          <EventCarousel lang={lang} />
        </div>
      </section>

      <section className="section-pad map-sky">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center"><p className="eyebrow">{t.mapEyebrow}</p><h2 className="section-title">{t.mapTitle}</h2></div>
          <div className="adventure-map mt-12">
            <div className="map-path" />
            {t.mapStops.map((l,idx)=>{
              const Icon = mapIcons[idx]!;
              const key = eraMeta[idx-1]?.no;
              const go = () => {
                if (key === "9.4") return navigate({ to: "/programming-9-4" });
                if (key === "9.2" || key === "9.3") return navigate({ to: "/daftar/$event", params: { event: key.replace(".", "-") } });
                scrollToId(idx === 0 ? "petualangan" : "daftar");
              };
              return (
                <button key={l} type="button" onClick={go} className={`map-stop cursor-pointer ${idx%2 ? "map-stop-low" : ""}`}>
                  <div className="map-icon"><Icon /></div><span>{l}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="galeri" className="section-pad bg-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">{t.galleryEyebrow}</p><h2 className="section-title">{t.galleryTitle}</h2></div><p className="max-w-md text-muted-foreground">{t.gallerySub}</p></div>
          <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4">{t.gallery.map((label,i)=><div key={label} className={`gallery-placeholder ${i===0||i===5?"col-span-2":""}`}><div><Bot className="mx-auto size-8"/><span>{label}</span><small>{t.soon}</small></div></div>)}</div>
        </div>
      </section>

      <FaqSection lang={lang} />

      <section id="daftar" className="section-pad bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-pixel text-xs text-accent">{t.formEyebrow}</p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">{t.formTitle}</h2>
            <p className="mt-5 text-lg text-primary-foreground/80">{t.formSub}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {EVENTS.map((ev) => {
              const status = { id: { open: "DIBUKA", past: "SELESAI", upcoming: "AKAN DATANG" }, en: { open: "OPEN", past: "FINISHED", upcoming: "COMING SOON" } }[lang][ev.status];
              return (
                <article key={ev.key} className="flex flex-col rounded-lg border-2 border-foreground bg-card p-5 text-card-foreground shadow-pixel">
                  <div className="flex items-center justify-between"><span className="font-pixel text-sm text-primary">{ev.key}</span><span className="font-pixel text-[8px] text-muted-foreground">{status}</span></div>
                  <h3 className="mt-4 text-xl font-black">{ev.theme[lang]}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{ev.openTo[lang]}</p>
                  <div className="mt-auto pt-5">
                    {ev.key === "9.1" ? (
                      <p className="rounded-md border-2 border-dashed border-primary p-3 text-xs font-bold">{ev.mechanism[0]![lang]}</p>
                    ) : ev.key === "9.4" ? (
                      <Button asChild className="game-button w-full"><Link to="/programming-9-4">{lang === "id" ? "Daftar 9.4" : "Register 9.4"}<ArrowRight /></Link></Button>
                    ) : (
                      <Button asChild className="game-button w-full"><Link to="/daftar/$event" params={{ event: ev.slug! }}>{lang === "id" ? `Daftar ${ev.key}` : `Register ${ev.key}`}<ArrowRight /></Link></Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-foreground py-10 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-[1fr_auto] sm:px-6 lg:px-8">
          <div><p className="font-pixel text-lg text-accent">PROG&#123;R&#125;AMMING 9.0</p><p className="mt-3 text-sm text-primary-foreground/65">{t.footerOrg}<br/>{SITE.campus}</p></div>
          <div className="flex items-center gap-3">
            <button type="button" className="social-button cursor-pointer" onClick={() => setContact(true)} aria-label="Instagram"><Instagram /></button>
            <button type="button" className="social-button cursor-pointer" onClick={() => setContact(true)} aria-label="Email"><Mail /></button>
            {contact && <span className="text-sm text-primary-foreground/70">{t.faqBoxText}</span>}
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-primary-foreground/15 px-4 pt-6 text-xs text-primary-foreground/45 sm:px-6 lg:px-8">{t.footerNote}</div>
      </footer>
      <WhatsAppFloat lang={lang} />
    </main>
  );
}
