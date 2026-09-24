// Editable site data for Prog{r}amming 9.0.
// Replace placeholders (PLACEHOLDER / 62xxxx / "#") with official data when available.

export type Lang = "id" | "en";
export type L = { id: string; en: string };
export type EventKey = "9.1" | "9.2" | "9.3" | "9.4";
export type EventStatus = "open" | "past" | "upcoming";

export const SITE = {
  whatsappMain: "62xxxxxxxxxx", // TODO: official WhatsApp number (international format, no +)
  bank: { name: "Bank (placeholder)", account: "xxxx-xxxx-xxxx", holder: "a.n. (placeholder)" },
  campus: "Universitas Prasetiya Mulya, BSD City",
};

export const waLink = (number: string, text = "Halo, saya ingin bertanya tentang Prog{r}amming 9.0") =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const CONTACTS: { name: string; role: L; whatsapp: string }[] = [
  { name: "Contact Person 1", role: { id: "Admin Pendaftaran", en: "Registration Admin" }, whatsapp: SITE.whatsappMain },
  { name: "Contact Person 2", role: { id: "Admin Informasi", en: "Information Admin" }, whatsapp: "62xxxxxxxxxx" },
];

// Hero slides: set `image` to a poster URL (e.g. an asset pointer url) to replace the template.
export const SLIDES: { key: string; image?: string; label: L; title: L; text: L }[] = [
  { key: "intro", label: { id: "PROG{R}AMMING 9.0", en: "PROG{R}AMMING 9.0" }, title: { id: "Jelajahi Dunia Teknologi, Mulai Petualanganmu!", en: "Explore the World of Technology. Begin Your Adventure!" }, text: { id: "Petualangan belajar melintasi waktu—dari masa purba hingga masa depan—melalui coding, desain, dan kreativitas.", en: "A learning adventure through time—from prehistory to the future—through coding, design, and creativity." } },
  { key: "registration", label: { id: "OPEN REGISTRATION", en: "OPEN REGISTRATION" }, title: { id: "Pendaftaran Sedang Dibuka", en: "Registration Is Open" }, text: { id: "Poster open registration akan tampil di sini.", en: "The open registration poster will appear here." } },
  { key: "recruitment", label: { id: "OPEN RECRUITMENT", en: "OPEN RECRUITMENT" }, title: { id: "Bergabung Bersama Tim", en: "Join the Team" }, text: { id: "Poster open recruitment akan tampil di sini.", en: "The open recruitment poster will appear here." } },
  { key: "merch", label: { id: "MERCHANDISE", en: "MERCHANDISE" }, title: { id: "Merchandise Prog{r}amming 9.0", en: "Prog{r}amming 9.0 Merchandise" }, text: { id: "Poster merchandise akan tampil di sini.", en: "The merchandise poster will appear here." } },
  { key: "announcement", label: { id: "PENGUMUMAN", en: "ANNOUNCEMENT" }, title: { id: "Info Terbaru", en: "Latest News" }, text: { id: "Poster atau pengumuman lain akan tampil di sini.", en: "Other posters or announcements will appear here." } },
];

const TBA: L = { id: "Informasi akan segera diumumkan.", en: "Information will be announced soon." };

export const EVENTS: {
  key: EventKey; status: EventStatus; tone: string; era: string; poster?: string; driveUrl: string;
  name: L; theme: L; themeText: L; openTo: L; date: L; location: L; description: L; mechanism: L[];
  registerTo?: "/daftar/$event"; slug?: string; fee?: string;
}[] = [
  {
    key: "9.1", status: "past", tone: "era-prehistoric", era: "PURBA", driveUrl: "#",
    name: { id: "Prog{r}amming Goes to School", en: "Prog{r}amming Goes to School" },
    theme: { id: "Masa Purba", en: "Prehistoric Era" },
    themeText: { id: "Peserta menjelajahi masa purba sebagai awal perjalanan time travel teknologi.", en: "Participants explore prehistory as the start of the technology time-travel journey." },
    openTo: { id: "Siswa sekolah yang dikunjungi", en: "Students of visited schools" },
    date: TBA, location: { id: "Sekolah-sekolah sekitar BSD", en: "Schools around BSD" },
    description: { id: "Hadir di sekolah sekitar BSD dengan edukasi teknologi interaktif. Peserta mengeksplorasi tema masa purba melalui 4 platform sesuai usia untuk mengasah kreativitas visual, logika komputasi, dan perancangan aplikasi sederhana.", en: "Visiting schools around BSD with interactive technology education. Participants explore the prehistoric theme through 4 age-appropriate platforms to sharpen visual creativity, computational logic, and simple app design." },
    mechanism: [{ id: "Prog{r}amming 9.1 hanya diperuntukkan bagi siswa dari sekolah yang dikunjungi oleh Prog{r}amming 9.1.", en: "Prog{r}amming 9.1 is only for students from schools visited by Prog{r}amming 9.1." }],
  },
  {
    key: "9.2", status: "open", tone: "era-kingdom", era: "KINGDOMS", driveUrl: "#", slug: "9-2", fee: "Rp25.000",
    name: { id: "Prog{r}amming 9.2", en: "Prog{r}amming 9.2" },
    theme: { id: "Masa Kerajaan", en: "Kingdom Era" },
    themeText: { id: "Nuansa petualangan kerajaan untuk mengembangkan imajinasi dan kolaborasi.", en: "A kingdom adventure atmosphere to grow imagination and collaboration." },
    openTo: { id: "TK – SMA", en: "Kindergarten – High School" },
    date: TBA, location: { id: "Universitas Prasetiya Mulya", en: "Universitas Prasetiya Mulya" },
    description: { id: "Kelas Code.org, Scratch, MIT App Inventor, dan Figma untuk mengembangkan imajinasi, kreativitas, dan kolaborasi dengan nuansa petualangan kerajaan.", en: "Code.org, Scratch, MIT App Inventor, and Figma classes to develop imagination, creativity, and collaboration with a kingdom adventure feel." },
    mechanism: [{ id: "Pendaftaran individu melalui formulir 3 langkah.", en: "Individual registration through a 3-step form." }, { id: "Biaya: Rp25.000.", en: "Fee: Rp25,000." }],
  },
  {
    key: "9.3", status: "upcoming", tone: "era-industrial", era: "INDUSTRIAL", driveUrl: "#", slug: "9-3", fee: "Rp25.000",
    name: { id: "Prog{r}amming 9.3", en: "Prog{r}amming 9.3" },
    theme: { id: "Revolusi Industri", en: "Industrial Revolution" },
    themeText: { id: "Nuansa Revolusi Industri untuk mendorong daya cipta dan inovasi.", en: "An Industrial Revolution atmosphere that drives invention and innovation." },
    openTo: { id: "TK – SMA", en: "Kindergarten – High School" },
    date: TBA, location: { id: "Universitas Prasetiya Mulya", en: "Universitas Prasetiya Mulya" },
    description: { id: "Kelas teknologi untuk mengembangkan daya cipta, inovasi, kreativitas, dan kolaborasi dengan nuansa Revolusi Industri.", en: "Technology classes to develop inventiveness, innovation, creativity, and collaboration with an Industrial Revolution feel." },
    mechanism: [{ id: "Pendaftaran individu melalui formulir 3 langkah.", en: "Individual registration through a 3-step form." }, { id: "Biaya: Rp25.000.", en: "Fee: Rp25,000." }],
  },
  {
    key: "9.4", status: "upcoming", tone: "era-future", era: "THE FUTURE", driveUrl: "#", slug: "9-4", fee: "Rp150.000",
    name: { id: "Prog{r}amming 9.4", en: "Prog{r}amming 9.4" },
    theme: { id: "Masa Depan", en: "The Future" },
    themeText: { id: "Chapter Future: membangun solusi digital untuk tantangan nyata.", en: "The Future chapter: building digital solutions for real challenges." },
    openTo: { id: "SMA & mahasiswa", en: "High school & university students" },
    date: TBA, location: TBA,
    description: { id: "UI/UX Design Competition dan Hackathon berbasis real case dari mitra/perusahaan.", en: "A UI/UX Design Competition and Hackathon based on real cases from partners/companies." },
    mechanism: [
      { id: "UI/UX: real case dari mitra, rancang dan kumpulkan prototype, presentasi di depan juri.", en: "UI/UX: a real partner case, design and submit a prototype, present to the judges." },
      { id: "Hackathon: tim 3–4 orang, tantangan 24 jam, solusi digital dari real case perusahaan, presentasi hari kedua.", en: "Hackathon: teams of 3–4, a 24-hour challenge, a digital solution for a real company case, presentation on day two." },
      { id: "Biaya: Rp150.000/kelompok.", en: "Fee: Rp150,000 per team." },
    ],
  },
];

export const PLATFORMS: { key: string; name: string; url: string; level: L; description: L; functions: L; results: L }[] = [
  { key: "code", name: "Code.org", url: "https://code.org", level: { id: "TK – SD (kelas 1–2)", en: "Kindergarten – Grade 1–2" }, description: { id: "Platform edukasi dasar pemrograman melalui tantangan bertingkat untuk kreativitas, logika, dan pemecahan masalah.", en: "A basic programming education platform with levelled challenges for creativity, logic, and problem solving." }, functions: { id: "Algoritma, computational thinking, looping, conditionals, variables.", en: "Algorithms, computational thinking, loops, conditionals, variables." }, results: { id: "Program web interaktif sederhana, mini game edukasi, pemahaman logika dasar.", en: "Simple interactive web programs, educational mini games, basic logic understanding." } },
  { key: "scratch", name: "Scratch", url: "https://scratch.mit.edu", level: { id: "SD (kelas 3–6)", en: "Elementary (Grade 3–6)" }, description: { id: "Platform pemrograman visual drag-and-drop dari MIT Media Lab untuk animasi, cerita, game, dan simulasi.", en: "A drag-and-drop visual programming platform from MIT Media Lab for animations, stories, games, and simulations." }, functions: { id: "Logika tanpa syntax error, sprites, animasi, suara, event-driven programming.", en: "Logic without syntax errors, sprites, animation, sound, event-driven programming." }, results: { id: "Game 2D, animasi, cerita visual.", en: "2D games, animations, visual stories." } },
  { key: "inventor", name: "MIT App Inventor", url: "https://appinventor.mit.edu", level: { id: "SMP", en: "Junior High" }, description: { id: "Platform web dari MIT untuk membuat aplikasi Android berbasis blok visual.", en: "A web platform from MIT for building Android apps with visual blocks." }, functions: { id: "UI aplikasi, GPS, kamera, sensor, Bluetooth, database, live testing.", en: "App UI, GPS, camera, sensors, Bluetooth, database, live testing." }, results: { id: "Aplikasi Android (.APK/.AAB).", en: "Android apps (.APK/.AAB)." } },
  { key: "figma", name: "Figma", url: "https://figma.com", level: { id: "SMA", en: "High School" }, description: { id: "Platform desain UI/UX berbasis cloud dengan kolaborasi real-time.", en: "A cloud-based UI/UX design platform with real-time collaboration." }, functions: { id: "Wireframe, mockup, prototype interaktif, developer handoff.", en: "Wireframes, mockups, interactive prototypes, developer handoff." }, results: { id: "Clickable prototype, design system, aset visual.", en: "Clickable prototypes, design systems, visual assets." } },
];

// FAQ — answers marked TBA should be replaced with the official answers from the source brief.
export const FAQS: { q: L; a: L }[] = [
  { q: { id: "Apa itu Prog{r}amming?", en: "What is Prog{r}amming?" }, a: { id: "Prog{r}amming merupakan program kerja SISO yang bertujuan mengenalkan dunia teknologi kepada anak-anak dan remaja melalui coding, desain UI/UX, dan berbagai platform teknologi.", en: "Prog{r}amming is a SISO program that introduces children and teenagers to technology through coding, UI/UX design, and various technology platforms." } },
  { q: { id: "Apa saja program kerja Prog{r}amming 9.0?", en: "What are the Prog{r}amming 9.0 programs?" }, a: { id: "Prog{r}amming 9.1 (Goes to School), 9.2, 9.3, dan 9.4 (UI/UX Design Competition & Hackathon).", en: "Prog{r}amming 9.1 (Goes to School), 9.2, 9.3, and 9.4 (UI/UX Design Competition & Hackathon)." } },
  { q: { id: "Platform apa saja yang digunakan?", en: "Which platforms are used?" }, a: { id: "Code.org, Scratch, MIT App Inventor, dan Figma.", en: "Code.org, Scratch, MIT App Inventor, and Figma." } },
  { q: { id: "Siapa target peserta?", en: "Who are the participants?" }, a: { id: "9.1–9.3 untuk jenjang TK hingga SMA; 9.4 untuk siswa SMA dan mahasiswa.", en: "9.1–9.3 are for kindergarten to high school; 9.4 is for high school and university students." } },
  { q: { id: "Kapan dan di mana acaranya?", en: "When and where is it held?" }, a: TBA },
  { q: { id: "Bagaimana cara mendaftar?", en: "How do I register?" }, a: { id: "Pilih rangkaian yang sedang dibuka, lalu isi formulir pendaftaran 3 langkah: data peserta, data orang tua, dan pembayaran.", en: "Choose an open edition, then complete the 3-step form: participant data, parent data, and payment." } },
  { q: { id: "Apakah berbayar?", en: "Is there a fee?" }, a: { id: "9.2 dan 9.3: Rp25.000. 9.4: Rp150.000/kelompok.", en: "9.2 and 9.3: Rp25,000. 9.4: Rp150,000 per team." } },
  { q: { id: "Bagaimana sistem deposit?", en: "How does the deposit work?" }, a: TBA },
  { q: { id: "Apa manfaat bagi peserta?", en: "What do participants gain?" }, a: { id: "Belajar teknologi, mengembangkan kreativitas, belajar sambil bermain, dan berkolaborasi.", en: "Learning technology, growing creativity, learning through play, and collaborating." } },
  { q: { id: "Apakah perlu membawa laptop/perlengkapan?", en: "Do I need a laptop or equipment?" }, a: TBA },
  { q: { id: "Apakah harus punya pengalaman coding?", en: "Do I need coding experience?" }, a: { id: "Tidak. Kegiatan dirancang agar dapat diikuti pemula.", en: "No. Activities are designed for beginners." } },
  { q: { id: "Siapa mentor/pengajarnya?", en: "Who are the mentors?" }, a: TBA },
  { q: { id: "Apa perbedaan Code Explorers, Scratch, Inventor, dan Figma?", en: "What is the difference between Code Explorers, Scratch, Inventor, and Figma?" }, a: { id: "Code.org untuk TK–SD kelas 1–2 (logika dasar), Scratch untuk SD kelas 3–6 (game & animasi), MIT App Inventor untuk SMP (aplikasi Android), dan Figma untuk SMA (desain UI/UX).", en: "Code.org for kindergarten–grade 2 (basic logic), Scratch for grades 3–6 (games & animation), MIT App Inventor for junior high (Android apps), and Figma for high school (UI/UX design)." } },
  { q: { id: "Apakah pendaftaran harus sesuai jenjang?", en: "Must registration match the school level?" }, a: TBA },
  { q: { id: "Apakah ada sertifikat/penghargaan?", en: "Are there certificates or awards?" }, a: TBA },
  { q: { id: "Apakah orang tua/pendamping boleh mendampingi?", en: "May parents or companions attend?" }, a: TBA },
  { q: { id: "Apakah peserta mendapat konsumsi?", en: "Are meals provided?" }, a: TBA },
];

export const pick = (l: L, lang: Lang) => l[lang];
