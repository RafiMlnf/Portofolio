import { NextResponse } from "next/server";

const FALLBACK_DETAILS: Record<string, any> = {
  "15": {
    objective: "Menciptakan editor foto berbasis web & mobile untuk mengubah gambar 2D biasa menjadi video animasi paralaks 3D (Wigglegram/Stereogram) secara otomatis menggunakan AI monocular depth estimation, mereproduksi efek kamera analog Nishika N8000.",
    techStack: [
      { label: "Mobile Client", items: ["Flutter", "Dart", "Riverpod", "FFmpeg Kit"] },
      { label: "Web Client", items: ["Next.js 15", "React 19", "Turborepo", "Tailwind CSS"] },
      { label: "Backend & AI", items: ["FastAPI", "Python", "ONNX Runtime", "Depth Anything V2", "PyTorch"] }
    ],
    highlights: [
      "Implementasi monocular depth estimation berbasis AI (Depth Anything V2) dengan opsi client-side offline ONNX inference.",
      "Monorepo workspace (Turborepo) terintegrasi untuk menyatukan Next.js web client, Python FastAPI backend, dan ML prototyping.",
      "Fitur monetisasi paywall glassmorphic region-aware (localization harga IDR/USD) dan integrasi secure Google OAuth.",
      "Video encoding client-side menggunakan FFmpeg Kit untuk render bounce loop 3D (1-2-3-4-3-2-1) yang mulus."
    ],
    githubUrl: "https://github.com/RafiMlnf/Wiglesco",
    liveUrl: "https://github.com/RafiMlnf/Wiglesco"
  },
  "16": {
    objective: "Menyediakan template boilerplate Next.js terstandarisasi untuk mempercepat pengembangan aplikasi internal di lingkungan PT Menara Terus Makmur (Astra Otoparts Group).",
    techStack: [
      { label: "Framework & Core", items: ["Next.js", "React", "TypeScript"] },
      { label: "Styling & UI", items: ["Tailwind CSS", "CSS Variables (Design Tokens)"] },
      { label: "Components", items: ["Custom Sidebar", "Sticky Header", "Status Badge", "Generic Table", "Card Layout"] }
    ],
    highlights: [
      "Pemisahan tumpukan desain terpusat (design tokens) pada globals.css untuk memudahkan kustomisasi warna, radius, dan border.",
      "Dilengkapi komponen dasar siap pakai yang modular: Sidebar dinamis, topbar header, tabel generik, dan card/panel terstandar.",
      "Integrasi font Google Sans terinstalasi bawaan untuk konsistensi branding aplikasi enterprise internal."
    ],
    githubUrl: "https://github.com/RafiMlnf/MTMStandart",
    liveUrl: "https://github.com/RafiMlnf/MTMStandart"
  },
  "17": {
    objective: "Membantu akademisi dan mahasiswa mendeteksi otomatis kata atau frasa asing/tidak baku yang harus diformat miring (italic) dalam dokumen laporan tugas akhir, proposal, sempro, atau skripsi.",
    techStack: [
      { label: "Frontend", items: ["HTML5", "CSS3", "Vanilla JS", "Tailwind CSS"] },
      { label: "Backend", items: ["Python", "Flask", "Vercel Serverless Functions"] },
      { label: "Dictionary & NLP", items: ["KBBI API", "Custom Dictionary Parser"] }
    ],
    highlights: [
      "Pencocokan teks cerdas menggunakan kamus bahasa asing dan verifikasi KBBI untuk mendeteksi istilah non-baku.",
      "Web interface interaktif dengan visualisasi split-pane (teks input vs hasil deteksi dengan highlight kata yang perlu di-italic).",
      "Deployment serverless pada Vercel untuk performa pemrosesan dokumen yang cepat dan handal."
    ],
    githubUrl: "https://github.com/RafiMlnf/AutoItalic",
    liveUrl: "https://auto-italic.vercel.app/"
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing project id" }, { status: 400 });
  }

  // Check fallback first to avoid unnecessary database connections for static items
  if (FALLBACK_DETAILS[id]) {
    return NextResponse.json(FALLBACK_DETAILS[id]);
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ error: "Redis configuration missing" }, { status: 500 });
  }

  try {
    const res = await fetch(`${url}/get/project:detail:${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from database" }, { status: 502 });
    }

    const data = await res.json();
    if (!data.result) {
      return NextResponse.json({ error: "Project details not found" }, { status: 404 });
    }

    const detail = JSON.parse(data.result);
    return NextResponse.json(detail);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
