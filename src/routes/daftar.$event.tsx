import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Upload } from "lucide-react";

import { PageShell } from "@/components/programming/page-shell";
import { useSiteLanguage, useTimeMode } from "@/components/programming/site-preferences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EVENTS, SITE } from "@/data/programming";

export const Route = createFileRoute("/daftar/$event")({
  loader: ({ params }) => {
    const ev = EVENTS.find((e) => e.slug === params.event);
    if (!ev) throw notFound();
    return { key: ev.key };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Tidak ditemukan | Prog{r}amming 9.0" }, { name: "robots", content: "noindex" }] };
    const title = `Pendaftaran Prog{r}amming ${loaderData.key}`;
    const desc = `Formulir pendaftaran 3 langkah untuk Prog{r}amming ${loaderData.key}.`;
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] };
  },
  notFoundComponent: () => <div className="p-10 text-center"><p className="text-xl font-black">Event tidak ditemukan / Event not found</p><Link to="/" className="mt-4 inline-block text-primary underline">Beranda / Home</Link></div>,
  component: RegisterPage,
});

type F = { k: string; id: string; en: string; type?: string; options?: { id: string; en: string }[] };
const lv = (a: string, b: string) => ({ id: a, en: b });
const levels = [lv("TK", "Kindergarten"), lv("SD", "Elementary"), lv("SMP", "Junior High"), lv("SMA", "High School")];

function stepsFor(team: boolean): { title: { id: string; en: string }; fields: F[] }[] {
  if (team) {
    return [
      { title: lv("Data tim", "Team data"), fields: [
        { k: "team", ...lv("Nama tim", "Team name") },
        { k: "track", ...lv("Kategori", "Category"), options: [lv("UI/UX Design Competition", "UI/UX Design Competition"), lv("Hackathon", "Hackathon")] },
        { k: "leader", ...lv("Nama ketua tim", "Team leader name") },
        { k: "members", ...lv("Nama anggota lain (pisahkan dengan koma)", "Other members (comma separated)") },
        { k: "inst", ...lv("Asal sekolah / kampus", "School / university") },
      ] },
      { title: lv("Kontak", "Contact"), fields: [
        { k: "email", ...lv("Email ketua", "Leader email"), type: "email" },
        { k: "wa", ...lv("WhatsApp ketua", "Leader WhatsApp"), type: "tel" },
        { k: "count", ...lv("Jumlah anggota", "Team size"), options: [lv("3 orang", "3 members"), lv("4 orang", "4 members")] },
      ] },
    ];
  }
  return [
    { title: lv("Data peserta", "Participant data"), fields: [
      { k: "name", ...lv("Nama lengkap peserta", "Participant full name") },
      { k: "school", ...lv("Asal sekolah", "School") },
      { k: "level", ...lv("Jenjang", "Level"), options: levels },
      { k: "grade", ...lv("Kelas", "Grade") },
    ] },
    { title: lv("Data orang tua / wali", "Parent / guardian data"), fields: [
      { k: "parent", ...lv("Nama orang tua / wali", "Parent / guardian name") },
      { k: "email", ...lv("Email", "Email"), type: "email" },
      { k: "wa", ...lv("WhatsApp", "WhatsApp"), type: "tel" },
    ] },
  ];
}

function RegisterPage() {
  const { key } = Route.useLoaderData();
  const ev = EVENTS.find((e) => e.key === key)!;
  const [lang, setLang] = useSiteLanguage();
  const [dark, toggle] = useTimeMode();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState("");
  const steps = stepsFor(key === "9.4");
  const labels = [...steps.map((s) => s.title[lang]), lang === "id" ? "Pembayaran" : "Payment"];
  const t = lang === "id"
    ? { title: `Pendaftaran ${ev.name.id}`, next: "Lanjut", back: "Kembali", submit: "Kirim pendaftaran", fee: "Biaya", transfer: "Transfer ke", proof: "Unggah bukti pembayaran", pickFile: "Pilih file", choose: "Pilih salah satu", doneT: "Pendaftaran terkirim!", doneX: "Terima kasih. Panitia akan menghubungimu melalui kontak yang kamu isi.", home: "Kembali ke beranda", closed: "Pendaftaran untuk rangkaian ini belum dibuka. Formulir tetap bisa dilihat sebagai gambaran.", note: "Saat ini data belum tersimpan otomatis; konfirmasi hanya tampil di layar." }
    : { title: `${ev.name.en} Registration`, next: "Next", back: "Back", submit: "Submit registration", fee: "Fee", transfer: "Transfer to", proof: "Upload payment proof", pickFile: "Choose file", choose: "Select one", doneT: "Registration sent!", doneX: "Thank you. The committee will contact you through the details you provided.", home: "Back to home", closed: "Registration for this edition is not open yet. You can still preview the form.", note: "Data is not saved automatically yet; confirmation is shown on screen only." };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < steps.length) setStep(step + 1);
    else setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageShell lang={lang} setLang={setLang} dark={dark} toggle={toggle}>
      <section className="hero-sky min-h-[calc(100vh-4rem)] py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="eyebrow">PROG&#123;R&#125;AMMING {ev.key} · {ev.theme[lang]}</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{t.title}</h1>
          {ev.status !== "open" && <p className="mt-4 rounded-md border-2 border-accent bg-card p-3 text-sm font-bold">{t.closed}</p>}

          {done ? (
            <div className="mt-8 rounded-lg border-2 border-foreground bg-card p-8 text-center shadow-pixel-lg">
              <CheckCircle2 className="mx-auto size-12 text-primary" />
              <h2 className="mt-4 text-2xl font-black">{t.doneT}</h2>
              <p className="mt-2 text-muted-foreground">{t.doneX}</p>
              <Button asChild className="game-button mt-6"><Link to="/">{t.home}</Link></Button>
            </div>
          ) : (
            <>
              <ol className="mt-8 grid grid-cols-3 gap-2">
                {labels.map((l, i) => (
                  <li key={l} className={`rounded-md border-2 border-foreground p-2 text-center text-xs font-black ${i === step ? "bg-accent text-accent-foreground" : i < step ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                    <span className="font-pixel text-[9px]">{i + 1}</span><br />{l}
                  </li>
                ))}
              </ol>
              <form key={step} onSubmit={onSubmit} className="mt-6 space-y-5 rounded-lg border-2 border-foreground bg-card p-5 shadow-pixel-lg sm:p-8">
                {step < steps.length ? steps[step]!.fields.map((f) => (
                  <label key={f.k} className="field-label">
                    {f[lang]}
                    {f.options ? (
                      <select required name={f.k} defaultValue="" className="form-control rounded-md px-3">
                        <option value="" disabled>{t.choose}</option>
                        {f.options.map((o) => <option key={o.id} value={o.id}>{o[lang]}</option>)}
                      </select>
                    ) : (
                      <Input required name={f.k} type={f.type ?? "text"} className="form-control" maxLength={200} />
                    )}
                  </label>
                )) : (
                  <div className="space-y-4">
                    <div className="rounded-md border-2 border-dashed border-primary p-4 text-sm">
                      <p><b>{t.fee}:</b> {ev.fee ?? "—"}{key === "9.4" ? (lang === "id" ? " / kelompok" : " / team") : ""}</p>
                      <p className="mt-1"><b>{t.transfer}:</b> {SITE.bank.name} · {SITE.bank.account} · {SITE.bank.holder}</p>
                    </div>
                    <label className="field-label">
                      {t.proof}
                      <span className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-foreground bg-background p-3 text-sm font-bold">
                        <Upload className="size-5 text-primary" />{file || t.pickFile}
                        <input required type="file" accept="image/*,application/pdf" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
                      </span>
                    </label>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  {step > 0 && <Button type="button" variant="outline" className="game-button-secondary" onClick={() => setStep(step - 1)}><ArrowLeft />{t.back}</Button>}
                  <Button type="submit" className="game-button ml-auto">{step < steps.length ? t.next : t.submit}<ArrowRight /></Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">{t.note}</p>
              </form>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
