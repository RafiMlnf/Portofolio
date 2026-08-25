export interface TechStackGroup {
  label: string;
  items: string[];
}

export interface ProjectDetail {
  objective: string;
  techStack: TechStackGroup[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Project {
  id: number;
  title: string;
  category: "DEVELOPMENT" | "DESIGN" | string;
  year: string;
  date?: string;
  favorite?: boolean;
  desc: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  images?: string[];
  status?: string;
  deployment?: "intranet";
}

export interface CurrentlyItem {
  role: string;
  place: string;
  location?: string;
}

export interface ProfileData {
  name: string;
  fullName: string;
  location: string;
  photoUrl: string;
  bio: string;
  availability: string;
  currently: CurrentlyItem[];
  passions: string[];
}

export interface PortfolioStore {
  profile: ProfileData;
  projects: Project[];
  projectDetails: Record<string, ProjectDetail>;
}

export const DEFAULT_PROFILE: ProfileData = {
  "name": "Rafi",
  "fullName": "Maulana Firdaus",
  "location": "CIKARANG, INDONESIA",
  "photoUrl": "/assets/img/profile/porto1.png",
  "bio": "Full-stack developer dan software engineer yang terbiasa membangun solusi digital mulai dari aplikasi web, mobile, hingga integrasi sistem IoT. Saya menikmati proses mengubah ide menjadi sistem yang rapi, fungsional, dan efisien, baik saat berkutat dengan codebase modern, optimasi hardware, maupun perancangan antarmuka pengguna. Di luar teknis, saya juga punya minat besar pada estetika visual dan seorang music enthusiast.",
  "availability": "CONSIDERING INTERESTING OFFERS",
  "currently": [
    {
      "role": "Full Stack Web Developer",
      "place": "Magang @ PT Menara Terus Makmur",
      "location": "Cikarang, Jawa Barat"
    },
    {
      "role": "Mahasiswa Semester Akhir",
      "place": "Menunggu Wisuda"
    }
  ],
  "passions": [
    "Design Graphic",
    "Full Stack Dev",
    "Visual Design",
    "Software Engineer"
  ]
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    "id": 1,
    "title": "SOLFEGGIO ANALYZER",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-05-15",
    "desc": "Mesin analisis musik bertenaga AI yang genre-aware. Menganalisis audio dengan client-side DSP, Groq LLM, dan pencarian lirik hybrid tanpa perlu upload.",
    "tags": [
      "Next.js",
      "TypeScript"
    ],
    "liveUrl": "https://solfeggio-analyzer.vercel.app/",
    "status": "AI AUDIO LAB"
  },
  {
    "id": 15,
    "title": "WIGLESCO",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-06-26",
    "favorite": true,
    "desc": "Foto editor efek 3D Wigglegram & Parallax berbasis AI (Depth Anything V2). Ubah satu foto biasa jadi videonimasi kaya kamera analog Nishika N8000.",
    "tags": [
      "Flutter",
      "Next.js",
      "FastAPI",
      "ONNX Runtime",
      "PyTorch",
      "CUDA"
    ],
    "liveUrl": "https://github.com/RafiMlnf/Wiglesco",
    "githubUrl": "https://github.com/RafiMlnf/Wiglesco",
    "status": "3D VISION LAB"
  },
  {
    "id": 12,
    "title": "DELIVERY ORDER VENDOR",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-04-20",
    "desc": "Sistem monitoring performa logistik vendor (KPI & DO Generator) PT Menara Terus Makmur (Astra Otoparts Group) dengan custom SVG charting engine dan pemrosesan data spreadsheet Excel SAP.",
    "tags": [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS"
    ],
    "liveUrl": "https://github.com/RafiMlnf/DOV",
    "githubUrl": "https://github.com/RafiMlnf/DOV",
    "imageUrl": "/assets/img/ssproject/dov-flow.jpeg",
    "status": "ENTERPRISE SYSTEM",
    "deployment": "intranet"
  },
  {
    "id": 18,
    "title": "JIG & FIXTURE MANAGEMENT",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-08-05",
    "desc": "Sistem manajemen jembatan digitalisasi Jig & Fixture PT Menara Terus Makmur (Astra Otoparts Group) dengan pemonitoran stok otomatis (indikator Red/Yellow/Green), sistem approval berjenjang, penanganan abnormalitas, serta integrasi desain visual 2D/3D.",
    "tags": [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker"
    ],
    "liveUrl": "https://github.com/RafiMlnf/JigFixtures",
    "githubUrl": "https://github.com/RafiMlnf/JigFixtures",
    "imageUrl": "/assets/img/ssproject/jig-system.png",
    "status": "ENTERPRISE SYSTEM",
    "deployment": "intranet"
  },
  {
    "id": 13,
    "title": "WEIGHTING TRUCK",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-04-10",
    "desc": "Sistem jembatan timbang (weighbridge) truk logistik PT Menara Terus Makmur (Astra Otoparts Group) untuk pencatatan otomatis berat gross, tare, dan net terintegrasi database PostgreSQL.",
    "tags": [
      "Next.js",
      "PostgreSQL",
      "TypeScript",
      "Tailwind CSS",
      "NextAuth.js"
    ],
    "liveUrl": "https://github.com/RafiMlnf/Truck-Weighting",
    "githubUrl": "https://github.com/RafiMlnf/Truck-Weighting",
    "imageUrl": "/assets/img/ssproject/weighingflow.png",
    "status": "ENTERPRISE SYSTEM",
    "deployment": "intranet"
  },
  {
    "id": 16,
    "title": "MTM STANDART",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-07-02",
    "desc": "Template Next.js terstandarisasi untuk mempercepat pengembangan aplikasi internal PT Menara Terus Makmur (Astra Otoparts Group) dengan komponen desain siap pakai.",
    "tags": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    "liveUrl": "https://github.com/RafiMlnf/MTMStandart",
    "githubUrl": "https://github.com/RafiMlnf/MTMStandart",
    "status": "DEVELOPER TOOL"
  },
  {
    "id": 9,
    "title": "ELINA PKL TRACKER",
    "category": "DEVELOPMENT",
    "year": "2025",
    "date": "2025-08-25",
    "desc": "Sistem monitoring Prakerin (PKL) berbasis web untuk jurusan Elektronika Industri SMKN 2 Garut dengan presensi GPS dan jurnal digital.",
    "tags": [
      "Native PHP",
      "MySQL",
      "Tailwind CSS"
    ],
    "liveUrl": "https://github.com/RafiMlnf/ELINA",
    "githubUrl": "https://github.com/RafiMlnf/ELINA",
    "imageUrl": "/assets/img/ssproject/elina.png",
    "status": "MONITORING SYSTEM"
  },
  {
    "id": 8,
    "title": "TADIKA CIRCLE ARCHIVE",
    "category": "DEVELOPMENT",
    "year": "2025",
    "date": "2025-06-14",
    "desc": "Platform arsip digital privat untuk sirkel pertemanan — menyimpan foto, cerita hangout, dan trip timeline dengan Cloudinary CDN.",
    "tags": [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Cloudinary",
      "Upstash"
    ],
    "liveUrl": "https://github.com/RafiMlnf/Tadika",
    "githubUrl": "https://github.com/RafiMlnf/Tadika",
    "status": "PERSONAL ARCHIVE",
    "images": [
      "/assets/img/tdk/tdk1.png",
      "/assets/img/tdk/tdk2.png",
      "/assets/img/tdk/tdk3.png"
    ]
  },
  {
    "id": 14,
    "title": "CHATMD",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-03-05",
    "desc": "Aplikasi pesan instan privat intranet dengan sistem token discovery tanpa database. Beroperasi sepenuhnya di RAM dengan enkripsi AES untuk keamanan komunikasi lokal.",
    "tags": [
      "Python",
      "Node.js",
      "WebSocket"
    ],
    "liveUrl": "https://github.com/RafiMlnf/ChatMD",
    "githubUrl": "https://github.com/RafiMlnf/ChatMD",
    "status": "INTRANET CHAT",
    "images": [
      "/assets/img/ssproject/CMD1.png",
      "/assets/img/ssproject/CMD2.png"
    ]
  },
  {
    "id": 4,
    "title": "JS VS WASM BENCHMARK",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-02-12",
    "desc": "Eksperimen perbandingan kecepatan eksekusi JavaScript vs WebAssembly langsung di browser menggunakan Emscripten & C source.",
    "tags": [
      "WebAssembly",
      "C",
      "Emscripten",
      "JavaScript"
    ],
    "liveUrl": "https://jsvswasm.vercel.app/",
    "status": "PERFORMANCE LAB"
  },
  {
    "id": 10,
    "title": "MOBILE DEV MODULES",
    "category": "DEVELOPMENT",
    "year": "2024",
    "date": "2024-11-20",
    "desc": "Repositori tugas akademik Pemrograman Mobile 1 — kumpulan modul Android Studio dari Hello World hingga Fragment & Maps integration.",
    "tags": [
      "Java",
      "Android Studio"
    ],
    "liveUrl": "https://github.com/RafiMlnf/AndroidStudio-1",
    "githubUrl": "https://github.com/RafiMlnf/AndroidStudio-1",
    "status": "MOBILE DEV LAB"
  },
  {
    "id": 11,
    "title": "RPL KONSERKU",
    "category": "DEVELOPMENT",
    "year": "2024",
    "date": "2024-05-02",
    "desc": "Sistem informasi pemesanan tiket konser berbasis web dengan simulasi otorisasi multi-role, katalog dinamis, dan kalkulator kuota real-time.",
    "tags": [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Vanilla JS"
    ],
    "liveUrl": "https://rpl-konser-ku.vercel.app",
    "status": "SYSTEM SIMULATION"
  },
  {
    "id": 17,
    "title": "AUTO ITALIC",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-07-06",
    "desc": "Alat pendeteksi kata/istilah asing atau non-baku dalam dokumen laporan akademis (Sempro/Skripsi) yang otomatis memformat teks dengan format miring (italic).",
    "tags": [
      "Python",
      "HTML5",
      "Vanilla JS",
      "CSS"
    ],
    "liveUrl": "https://auto-italic.vercel.app/",
    "githubUrl": "https://github.com/RafiMlnf/AutoItalic",
    "status": "TEXT UTILITY"
  },
  {
    "id": 7,
    "title": "UX RESEARCH TOOLKIT",
    "category": "DEVELOPMENT",
    "year": "2026",
    "date": "2026-01-18",
    "desc": "Toolkit riset UX komprehensif dengan Persona Template, Journey Map, dan Usability Checklist — dikembangkan sebagai tugas Metodologi Penelitian.",
    "tags": [
      "HTML5",
      "CSS",
      "JavaScript"
    ],
    "liveUrl": "https://ux-research-tool.vercel.app/",
    "status": "UTILITY TOOLKIT"
  },
  {
    "id": 100,
    "title": "ARTBOARD STUDY II",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Komposisi brutalist yang mengeksplorasi penskalaan tipografi kontras tinggi dan grid digital yang ketat.",
    "tags": [
      "Layout",
      "Brutalist",
      "Figma"
    ],
    "imageUrl": "/assets/img/test/Artboard 2.png"
  },
  {
    "id": 101,
    "title": "BACKEND GRAPHICS LABS",
    "category": "DESIGN",
    "year": "2026",
    "desc": "Infografis teknis yang memetakan skema database relasional dan alur operasi backend.",
    "tags": [
      "Infographic",
      "Photoshop"
    ],
    "imageUrl": "/assets/img/test/BE.png"
  },
  {
    "id": 102,
    "title": "COVER BUKU EDITORIAL",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Desain cover buku editorial bergaya brutalist menggunakan perataan kolom asimetris.",
    "tags": [
      "Layout",
      "Typography",
      "Figma"
    ],
    "imageUrl": "/assets/img/test/CoverBuku.png"
  },
  {
    "id": 103,
    "title": "SOCIAL MEDIA BUNDLE I",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Template desain modular yang dikurasi untuk estetika pemasaran media sosial kontemporer.",
    "tags": [
      "Social Media",
      "Figma",
      "Marketing"
    ],
    "imageUrl": "/assets/img/test/FEED1.png"
  },
  {
    "id": 104,
    "title": "FPOSTER GEOMETRIC ART",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Poster vektor kontras tinggi dengan memanfaatkan tata letak geometris dan wireframe yang rumit.",
    "tags": [
      "Poster",
      "Vector",
      "Illustrator"
    ],
    "imageUrl": "/assets/img/test/FPOSTER.png"
  },
  {
    "id": 105,
    "title": "FAST UPB CAMPAIGN",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Tata letak promosi acara yang dirancang untuk program kampus fast-track dan kampanye akademik.",
    "tags": [
      "Branding",
      "Banner",
      "Photoshop"
    ],
    "imageUrl": "/assets/img/test/IGA4-FASTUPB.png"
  },
  {
    "id": 106,
    "title": "MAULID NABI DIGITAL ART",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Ilustrasi ucapan hari besar keagamaan digital dengan penekanan pada tulisan vektor yang bersih.",
    "tags": [
      "Vector",
      "Social Media"
    ],
    "imageUrl": "/assets/img/test/IGA4-MAULIDNABI.png"
  },
  {
    "id": 107,
    "title": "S3 LOGO SYMBOL",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Studi tanda merek minimalis yang berpusat pada geometri inti dan palet monokrom.",
    "tags": [
      "Logo",
      "Identity",
      "Illustrator"
    ],
    "imageUrl": "/assets/img/test/IGA4_LOGOS3.png"
  },
  {
    "id": 108,
    "title": "S4 EMBLEM CONCEPTS",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Emblem merek teknis bergaya brutalist yang dirancang untuk infrastruktur digital dan keamanan siber.",
    "tags": [
      "Logo",
      "Branding",
      "Illustrator"
    ],
    "imageUrl": "/assets/img/test/IGA4_LOGOS4.png"
  },
  {
    "id": 109,
    "title": "KEDAI SULTAN BRANDING",
    "category": "DESIGN",
    "year": "2026",
    "desc": "Branding komersial, identitas visual, dan desain kolateral produk promosi.",
    "tags": [
      "Branding",
      "Packaging",
      "Figma"
    ],
    "imageUrl": "/assets/img/test/KEDAISULTAN.png"
  },
  {
    "id": 110,
    "title": "LOGO S7 V2 LOCKUPS",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Desain logo sekunder yang disempurnakan dengan menonjolkan bentuk seimbang dan keserbagunaan tata letak.",
    "tags": [
      "Logo",
      "Identity"
    ],
    "imageUrl": "/assets/img/test/LOGO S7 V2.png"
  },
  {
    "id": 111,
    "title": "WEBHOOK INTEGRATOR MARK",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Tanda digital modern yang memvisualisasikan webhook real-time dan konektivitas API.",
    "tags": [
      "Logo",
      "Tech Style",
      "Illustrator"
    ],
    "imageUrl": "/assets/img/test/LOGO WEBHOOK (2).png"
  },
  {
    "id": 112,
    "title": "MOLE STRUCTURE POSTER",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Poster brutalist komprehensif yang menampilkan grid berdampak tinggi dan outline modular.",
    "tags": [
      "Poster",
      "Brutalist",
      "Figma"
    ],
    "imageUrl": "/assets/img/test/MOLE.png"
  },
  {
    "id": 113,
    "title": "METODOLOGI PENELITIAN POSTER",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Tata letak poster akademik yang menjelaskan metodologi penelitian dan struktur alur kerja.",
    "tags": [
      "Poster",
      "Academic",
      "Layout"
    ],
    "imageUrl": "/assets/img/test/POSTER - S7METOPEN.png"
  },
  {
    "id": 114,
    "title": "TYPOGRAPHY EXHIBIT II",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Poster cetak hitam-putih yang ramping dengan menekankan huruf modular dan hierarki visual.",
    "tags": [
      "Poster",
      "Typography"
    ],
    "imageUrl": "/assets/img/test/POSTER 2.png"
  },
  {
    "id": 115,
    "title": "BACKEND TECH BINDER",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Poster infografis informatif yang menampilkan arsitektur API dan sistem server.",
    "tags": [
      "Poster",
      "Backend",
      "Photoshop"
    ],
    "imageUrl": "/assets/img/test/PosterBE.png"
  },
  {
    "id": 116,
    "title": "MOBILE DB ARCHITECTURE",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Diagram modular terperinci yang menggambarkan database client-server pada perangkat mobile.",
    "tags": [
      "Poster",
      "Infographic"
    ],
    "imageUrl": "/assets/img/test/PosterMBD2.png"
  },
  {
    "id": 117,
    "title": "PENGOLAHAN CITRA CITADEL I",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Desain grafis konseptual yang menampilkan langkah-langkah pemrosesan citra digital tingkat lanjut.",
    "tags": [
      "Poster",
      "Creative",
      "Photoshop"
    ],
    "imageUrl": "/assets/img/test/PosterPCD1.png"
  },
  {
    "id": 118,
    "title": "SPATIAL IMAGE FILTERING II",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Tata letak poster edukatif yang menganalisis filter domain spasial dan kernel matriks.",
    "tags": [
      "Poster",
      "Grid",
      "Academic"
    ],
    "imageUrl": "/assets/img/test/PosterPCD2.png"
  },
  {
    "id": 119,
    "title": "SEDOT WC SYSTEM CONTRAST",
    "category": "DESIGN",
    "year": "2026",
    "desc": "Tata letak eksperimental yang mengontraskan iklan layanan masyarakat dengan grid minimalis modern.",
    "tags": [
      "Brutalist",
      "Creative"
    ],
    "imageUrl": "/assets/img/test/PosterSedotWC.png"
  },
  {
    "id": 120,
    "title": "REKAP PERJALANAN BOGOR 2024",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Jurnal kolase visual yang merekap pengalaman perjalanan regional dan fotografi lanskap.",
    "tags": [
      "Layout",
      "Y2K Style"
    ],
    "imageUrl": "/assets/img/test/RekapBogor2024.png"
  },
  {
    "id": 121,
    "title": "BLUE GRADIENT TECH POSTER",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Poster acara AI & Teknologi yang dirancang dengan gradien neon biru yang halus.",
    "tags": [
      "Poster",
      "Gradient",
      "Photoshop"
    ],
    "imageUrl": "/assets/img/test/Salinan dari Blue Gradient Technology Poster (1).png"
  },
  {
    "id": 122,
    "title": "PANGANDARAN EVENT BANNER",
    "category": "DESIGN",
    "year": "2023",
    "desc": "Tata letak spanduk luar ruangan format lebar untuk merayakan acara gathering musim panas.",
    "tags": [
      "Banner",
      "Event",
      "Illustrator"
    ],
    "imageUrl": "/assets/img/test/Spanduk_Pangandaran23.png"
  },
  {
    "id": 123,
    "title": "TO BE A ROCK EXPERIMENT",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Karya cetak tipografi artistik yang mengeksplorasi kontras, skala visual, dan gaya retro.",
    "tags": [
      "Poster",
      "Art",
      "Brutalist"
    ],
    "imageUrl": "/assets/img/test/ToBeARockAndNotToRoll.png"
  },
  {
    "id": 124,
    "title": "EDITORIAL GRID CONCEPT II",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Tata letak template mockup website kepadatan tinggi yang menekankan partisi konten terstruktur.",
    "tags": [
      "Web",
      "Layout",
      "Figma"
    ],
    "imageUrl": "/assets/img/test/WEB2.png"
  },
  {
    "id": 125,
    "title": "SOCIAL HIGHLIGHT SYSTEM I",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Koleksi sampul sorotan Instagram yang dikurasi dengan menggunakan ikon geometris khusus.",
    "tags": [
      "Icons",
      "Social Media"
    ],
    "imageUrl": "/assets/img/test/highlight1.png"
  },
  {
    "id": 126,
    "title": "JERSEY FULL BG BLACK",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Desain cetak jersey olahraga bertema gelap dengan fitur aksen neon biru digital.",
    "tags": [
      "Jersey",
      "Merchandise",
      "Illustrator"
    ],
    "imageUrl": "/assets/img/test/jerseyfullBG.png"
  },
  {
    "id": 127,
    "title": "JERSEY FULL WG NEON",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Desain cetak jersey olahraga bertema terang dengan memanfaatkan garis-garis neon hijau cerah.",
    "tags": [
      "Jersey",
      "Merchandise",
      "Illustrator"
    ],
    "imageUrl": "/assets/img/test/jerseyfullWG.png"
  },
  {
    "id": 128,
    "title": "CORE STRUCTURAL POSTER",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Poster tipografi konseptual modern yang menampilkan batas tepi (borders) berdampak tinggi.",
    "tags": [
      "Poster",
      "Layout"
    ],
    "imageUrl": "/assets/img/test/poster.png"
  },
  {
    "id": 129,
    "title": "BOGOR RETROSCAP II",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Tata letak grid foto Y2K nostalgia yang mengabadikan momen-momen seru makrab mahasiswa.",
    "tags": [
      "Poster",
      "Y2K Style",
      "Layout"
    ],
    "imageUrl": "/assets/img/test/posterbogor2.png"
  },
  {
    "id": 130,
    "title": "AVATAR CUSTOM LABS II",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Grafis avatar profil minimalis yang berfokus pada pengembang untuk digunakan di berbagai platform.",
    "tags": [
      "Vector",
      "Icon"
    ],
    "imageUrl": "/assets/img/test/ppgithub2.png"
  },
  {
    "id": 131,
    "title": "PCD TUTORIAL THUMBNAIL",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Template thumbnail digital kontras tinggi untuk mengoptimalkan rasio klik video tutorial.",
    "tags": [
      "Thumbnail",
      "Layout",
      "Photoshop"
    ],
    "imageUrl": "/assets/img/test/tmbPCD.png"
  },
  {
    "id": 132,
    "title": "UKM BOLA MARKETING FEED",
    "category": "DESIGN",
    "year": "2024",
    "desc": "Desain grafis dan tata letak media sosial dinamis untuk mempromosikan klub olahraga bola.",
    "tags": [
      "Social Media",
      "Branding",
      "Illustrator"
    ],
    "imageUrl": "/assets/img/test/ukmbolav1.png"
  },
  {
    "id": 133,
    "title": "TADIKA COLLAGE WALLPAPER",
    "category": "DESIGN",
    "year": "2025",
    "desc": "Kolase visual resolusi tinggi untuk wallpaper desktop lebar yang menampilkan kenangan perjalanan.",
    "tags": [
      "Collage",
      "Wallpaper",
      "Figma"
    ],
    "imageUrl": "/assets/img/test/wptadika2v2.png"
  }
];

export const DEFAULT_PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "1": {
    "objective": "Membangun instrumen analisis musik modern berkemampuan DSP dan AI tanpa bergantung pada backend upload audio, menjaga privasi file pengguna dan memberikan visualisasi frekuensi real-time.",
    "techStack": [
      {
        "label": "Frontend & Web Audio",
        "items": [
          "Next.js",
          "TypeScript",
          "Web Audio API",
          "Canvas API",
          "Tailwind CSS"
        ]
      },
      {
        "label": "AI & Processing",
        "items": [
          "Groq LLM",
          "Client-side FFT",
          "Hybrid Lyrics Parser"
        ]
      }
    ],
    "highlights": [
      "Pemrosesan DSP 100% di browser tanpa upload data suara.",
      "Integrasi Groq LLM untuk identifikasi aransemen & struktur progresi akor.",
      "Visualizer gelombang spektrum audio responsif berbasis HTML5 Canvas 60 FPS."
    ],
    "liveUrl": "https://solfeggio-analyzer.vercel.app/"
  },
  "8": {
    "objective": "Arsip interaktif privat timeline perjalanan dan momen pertemanan dengan integrasi cloud storage.",
    "techStack": [
      {
        "label": "Framework",
        "items": [
          "Next.js",
          "TypeScript",
          "Tailwind CSS"
        ]
      },
      {
        "label": "Storage & CDN",
        "items": [
          "Cloudinary CDN"
        ]
      }
    ],
    "highlights": [
      "Timeline perjalanan interaktif dengan galeri multi-foto.",
      "Optimasi gambar otomatis via Cloudinary CDN.",
      "Koleksi memori dinamis dengan tagging lokasi dan waktu."
    ],
    "githubUrl": "https://github.com/RafiMlnf/Tadika",
    "liveUrl": "https://github.com/RafiMlnf/Tadika"
  },
  "9": {
    "objective": "Platform pengelolaan kegiatan Praktik Kerja Lapangan (PKL) siswa dengan validasi lokasi presensi berbasis Geolocation GPS dan jurnal harian terverifikasi pembimbing.",
    "techStack": [
      {
        "label": "Backend & Core",
        "items": [
          "Native PHP",
          "MySQL"
        ]
      },
      {
        "label": "Frontend",
        "items": [
          "Tailwind CSS",
          "Leaflet JS (OpenStreetMap)",
          "Vanilla JS"
        ]
      }
    ],
    "highlights": [
      "Presensi radius Geolocation GPS anti-fake GPS.",
      "Jurnal kerja harian dengan upload foto bukti kegiatan.",
      "Portal monitoring nilai dan evaluasi guru pembimbing."
    ],
    "githubUrl": "https://github.com/RafiMlnf/ELINA",
    "liveUrl": "https://github.com/RafiMlnf/ELINA"
  },
  "12": {
    "objective": "Menyediakan sistem otomasi pemantauan performa vendor dan generator dokumen Delivery Order (DO) untuk tim logistik PT Menara Terus Makmur.",
    "techStack": [
      {
        "label": "Framework & Core",
        "items": [
          "Next.js",
          "React 19",
          "TypeScript"
        ]
      },
      {
        "label": "Data & UI",
        "items": [
          "Excel SheetJS",
          "SVG Chart Engine",
          "Tailwind CSS"
        ]
      }
    ],
    "highlights": [
      "Parsing dan ekstraksi data spreadsheet SAP dalam hitungan detik.",
      "Visualisasi grafik performa ketepatan waktu vendor custom SVG.",
      "Generator PDF DO otomatis terstandar Astra Otoparts."
    ],
    "githubUrl": "https://github.com/RafiMlnf/DOV",
    "liveUrl": "https://github.com/RafiMlnf/DOV"
  },
  "13": {
    "objective": "Digitalisasi pencatatan timbangan kendaraan logistik (gross, tare, net weight) dengan validasi otomatis dan pelaporan terintegrasi database.",
    "techStack": [
      {
        "label": "Fullstack",
        "items": [
          "Next.js",
          "TypeScript",
          "Tailwind CSS"
        ]
      },
      {
        "label": "Database & Auth",
        "items": [
          "PostgreSQL",
          "NextAuth.js"
        ]
      }
    ],
    "highlights": [
      "Pencatatan real-time berat truk dan muatan dengan kalkulasi selisih otomatis.",
      "Audit trail logistik dan cetak slip timbangan digital.",
      "Manajemen multi-role operator dan supervisor timbangan."
    ],
    "githubUrl": "https://github.com/RafiMlnf/Truck-Weighting",
    "liveUrl": "https://github.com/RafiMlnf/Truck-Weighting"
  },
  "15": {
    "objective": "Menciptakan editor foto berbasis web & mobile untuk mengubah gambar 2D biasa menjadi video animasi paralaks 3D (Wigglegram/Stereogram) secara otomatis menggunakan AI monocular depth estimation, mereproduksi efek kamera analog Nishika N8000.",
    "techStack": [
      {
        "label": "Mobile Client",
        "items": [
          "Flutter",
          "Dart",
          "Riverpod",
          "FFmpeg Kit"
        ]
      },
      {
        "label": "Web Client",
        "items": [
          "Next.js 15",
          "React 19",
          "Turborepo",
          "Tailwind CSS"
        ]
      },
      {
        "label": "Backend & AI",
        "items": [
          "FastAPI",
          "Python",
          "ONNX Runtime",
          "Depth Anything V2",
          "PyTorch"
        ]
      }
    ],
    "highlights": [
      "Implementasi monocular depth estimation berbasis AI (Depth Anything V2) dengan opsi client-side offline ONNX inference.",
      "Monorepo workspace (Turborepo) terintegrasi untuk menyatukan Next.js web client, Python FastAPI backend, dan ML prototyping.",
      "Fitur monetisasi paywall glassmorphic region-aware (localization harga IDR/USD) dan integrasi secure Google OAuth.",
      "Video encoding client-side menggunakan FFmpeg Kit untuk render bounce loop 3D (1-2-3-4-3-2-1) yang mulus."
    ],
    "githubUrl": "https://github.com/RafiMlnf/Wiglesco",
    "liveUrl": "https://github.com/RafiMlnf/Wiglesco"
  },
  "16": {
    "objective": "Menyediakan template boilerplate Next.js terstandarisasi untuk mempercepat pengembangan aplikasi internal di lingkungan PT Menara Terus Makmur (Astra Otoparts Group).",
    "techStack": [
      {
        "label": "Framework & Core",
        "items": [
          "Next.js",
          "React",
          "TypeScript"
        ]
      },
      {
        "label": "Styling & UI",
        "items": [
          "Tailwind CSS",
          "CSS Variables (Design Tokens)"
        ]
      },
      {
        "label": "Components",
        "items": [
          "Custom Sidebar",
          "Sticky Header",
          "Status Badge",
          "Generic Table",
          "Card Layout"
        ]
      }
    ],
    "highlights": [
      "Pemisahan tumpukan desain terpusat (design tokens) pada globals.css untuk memudahkan kustomisasi warna, radius, dan border.",
      "Dilengkapi komponen dasar siap pakai yang modular: Sidebar dinamis, topbar header, tabel generik, dan card/panel terstandar.",
      "Integrasi font Google Sans terinstalasi bawaan untuk konsistensi branding aplikasi enterprise internal."
    ],
    "githubUrl": "https://github.com/RafiMlnf/MTMStandart",
    "liveUrl": "https://github.com/RafiMlnf/MTMStandart"
  },
  "17": {
    "objective": "Membantu akademisi dan mahasiswa mendeteksi otomatis kata atau frasa asing/tidak baku yang harus diformat miring (italic) dalam dokumen laporan tugas akhir, proposal, sempro, atau skripsi.",
    "techStack": [
      {
        "label": "Frontend",
        "items": [
          "HTML5",
          "CSS3",
          "Vanilla JS",
          "Tailwind CSS"
        ]
      },
      {
        "label": "Backend",
        "items": [
          "Python",
          "Flask",
          "Vercel Serverless Functions"
        ]
      },
      {
        "label": "Dictionary & NLP",
        "items": [
          "KBBI API",
          "Custom Dictionary Parser"
        ]
      }
    ],
    "highlights": [
      "Pencocokan teks cerdas menggunakan kamus bahasa asing dan verifikasi KBBI untuk mendeteksi istilah non-baku.",
      "Web interface interaktif dengan visualisasi split-pane (teks input vs hasil deteksi dengan highlight kata yang perlu di-italic).",
      "Deployment serverless pada Vercel untuk performa pemrosesan dokumen yang cepat dan handal."
    ],
    "githubUrl": "https://github.com/RafiMlnf/AutoItalic",
    "liveUrl": "https://auto-italic.vercel.app/"
  },
  "18": {
    "objective": "Mendigitalisasi manajemen Jig & Fixture di PT Menara Terus Makmur (Astra Otoparts Group) guna meminimalkan downtime produksi akibat stockout atau keterlambatan revisi desain.",
    "techStack": [
      {
        "label": "Backend",
        "items": [
          "NestJS",
          "TypeScript",
          "PostgreSQL",
          "Docker"
        ]
      },
      {
        "label": "Frontend",
        "items": [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Axios"
        ]
      }
    ],
    "highlights": [
      "Sistem monitoring inventory stock dengan indikator warna dinamis (Red = kosong, Yellow = di bawah batas minimum, Green = aman).",
      "Alur persetujuan berjenjang (approval flow) untuk pembaruan inventaris dan revisi desain oleh PIC Jig Fixture, Section Head, dan Dept Head.",
      "Modul tracking abnormality untuk mencatat dan memantau penanganan masalah jig di lini produksi secara real-time.",
      "Manajemen file CAD terintegrasi untuk visualisasi desain model 2D/3D langsung di aplikasi."
    ],
    "githubUrl": "https://github.com/RafiMlnf/JigFixtures",
    "liveUrl": "https://github.com/RafiMlnf/JigFixtures"
  }
};

const STORAGE_KEY = "portfolio_studio_data_v2";
export const PORTFOLIO_UPDATED_EVENT = "portfolio-data-updated";

export function getInitialPortfolioStore(): PortfolioStore {
  return {
    profile: DEFAULT_PROFILE,
    projects: DEFAULT_PROJECTS,
    projectDetails: DEFAULT_PROJECT_DETAILS,
  };
}

export function getStoredPortfolioData(): PortfolioStore {
  if (typeof window === "undefined") {
    return getInitialPortfolioStore();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialPortfolioStore();
    const parsed = JSON.parse(raw);
    return {
      profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_PROJECTS,
      projectDetails: parsed.projectDetails || DEFAULT_PROJECT_DETAILS,
    };
  } catch (err) {
    console.error("Failed to read portfolio data from localStorage:", err);
    return getInitialPortfolioStore();
  }
}

export function saveStoredPortfolioData(data: PortfolioStore): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(PORTFOLIO_UPDATED_EVENT, { detail: data }));
    return true;
  } catch (err) {
    console.error("Failed to save portfolio data to localStorage:", err);
    return false;
  }
}

export function resetStoredPortfolioData(): PortfolioStore {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
      const defaults = getInitialPortfolioStore();
      window.dispatchEvent(new CustomEvent(PORTFOLIO_UPDATED_EVENT, { detail: defaults }));
    } catch (e) {
      console.error(e);
    }
  }
  return getInitialPortfolioStore();
}

export function downloadPortfolioJSON(data: PortfolioStore) {
  if (typeof window === "undefined") return;
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
