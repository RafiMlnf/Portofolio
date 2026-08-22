"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Project,
  ProjectDetail,
  ProfileData,
  downloadPortfolioJSON,
} from "@/lib/portfolioData";
import { usePortfolioData } from "@/lib/usePortfolioData";

export default function PortfolioEditor() {
  const { store, setEntireStore, resetStore, isLoaded } = usePortfolioData();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<"projects" | "designs" | "profile" | "export">("projects");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");

  // Edit Project Modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingDetail, setEditingDetail] = useState<ProjectDetail>({
    objective: "",
    techStack: [{ label: "Core", items: [] }],
    highlights: [""],
  });
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [newCarouselImg, setNewCarouselImg] = useState("");

  // Profile Form state
  const [profileForm, setProfileForm] = useState<ProfileData>(store.profile);
  const [newPassion, setNewPassion] = useState("");

  useEffect(() => {
    if (isLoaded) {
      setProfileForm(store.profile);
    }
  }, [isLoaded, store.profile]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") setIsDarkMode(false);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("Ukuran gambar melebihi 4MB. Mohon gunakan gambar yang lebih kecil atau URL eksternal.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        callback(result);
        showToast("Gambar berhasil dimuat!");
      }
    };
    reader.readAsDataURL(file);
  };

  const startCreateProject = (category: "DEVELOPMENT" | "DESIGN" = "DEVELOPMENT") => {
    const nextId = Math.max(0, ...store.projects.map((p) => p.id)) + 1;
    const newP: Project = {
      id: nextId,
      title: "",
      category,
      year: String(new Date().getFullYear()),
      date: new Date().toISOString().slice(0, 10),
      desc: "",
      tags: [],
      liveUrl: "",
      githubUrl: "",
      imageUrl: "",
      images: [],
      status: category === "DEVELOPMENT" ? "FEATURED LAB" : undefined,
    };
    setEditingProject(newP);
    setEditingDetail({
      objective: "",
      techStack: [{ label: "Technologies", items: [] }],
      highlights: [""],
    });
    setIsCreatingNew(true);
  };

  const startEditProject = (p: Project) => {
    setEditingProject({ ...p });
    const existingDetail = store.projectDetails[String(p.id)] || {
      objective: "",
      techStack: [{ label: "Stack", items: [...p.tags] }],
      highlights: [""],
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
    };
    setEditingDetail({
      ...existingDetail,
      techStack: existingDetail.techStack?.length
        ? existingDetail.techStack
        : [{ label: "Stack", items: [...p.tags] }],
      highlights: existingDetail.highlights?.length ? existingDetail.highlights : [""],
    });
    setIsCreatingNew(false);
  };

  const saveProject = () => {
    if (!editingProject || !editingProject.title.trim()) {
      alert("Judul proyek tidak boleh kosong!");
      return;
    }

    const updatedProjects = isCreatingNew
      ? [editingProject, ...store.projects]
      : store.projects.map((p) => (p.id === editingProject.id ? editingProject : p));

    const updatedDetails = {
      ...store.projectDetails,
      [String(editingProject.id)]: {
        ...editingDetail,
        githubUrl: editingProject.githubUrl,
        liveUrl: editingProject.liveUrl,
      },
    };

    setEntireStore({
      ...store,
      projects: updatedProjects,
      projectDetails: updatedDetails,
    });

    setEditingProject(null);
    showToast(`Projek "${editingProject.title}" berhasil disimpan!`);
  };

  const deleteProject = (id: number, title: string) => {
    if (confirm(`Yakin ingin menghapus projek "${title}"?`)) {
      const updatedProjects = store.projects.filter((p) => p.id !== id);
      const updatedDetails = { ...store.projectDetails };
      delete updatedDetails[String(id)];

      setEntireStore({
        ...store,
        projects: updatedProjects,
        projectDetails: updatedDetails,
      });
      showToast(`Projek "${title}" telah dihapus.`);
    }
  };

  const saveProfile = () => {
    setEntireStore({
      ...store,
      profile: profileForm,
    });
    showToast("Profil & Deskripsi berhasil diperbarui!");
  };

  const copyTypeScriptCode = () => {
    const tsCode = `// ── PASTE IN: lib/portfolioData.ts ──\nexport const DEFAULT_PROFILE = ${JSON.stringify(
      store.profile,
      null,
      2
    )};\n\nexport const DEFAULT_PROJECTS = ${JSON.stringify(
      store.projects,
      null,
      2
    )};\n\nexport const DEFAULT_PROJECT_DETAILS = ${JSON.stringify(
      store.projectDetails,
      null,
      2
    )};\n`;

    navigator.clipboard.writeText(tsCode).then(() => {
      showToast("Kode TypeScript berhasil disalin ke clipboard!");
    });
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && Array.isArray(parsed.projects)) {
          setEntireStore(parsed);
          showToast("Data berhasil diimpor & disimpan!");
        } else {
          alert("Format file JSON tidak sesuai dengan skema Portofolio.");
        }
      } catch (err) {
        alert("Gagal membaca file JSON: format file tidak valid.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Reset semua data kembali ke default bawaan awal? Perubahan saat ini akan hilang.")) {
      resetStore();
      showToast("Data telah di-reset ke nilai default.");
    }
  };

  const border = isDarkMode ? "border-white/15" : "border-black/15";
  const bgCard = isDarkMode ? "bg-[#0f0f0f]" : "bg-white";
  const fg = isDarkMode ? "text-white" : "text-black";
  const fgMuted = isDarkMode ? "text-white/50" : "text-black/50";

  const devProjects = store.projects.filter(
    (p) =>
      p.category === "DEVELOPMENT" &&
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const designProjects = store.projects.filter(
    (p) =>
      p.category === "DESIGN" &&
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className={`min-h-screen font-sans select-none ${isDarkMode ? "bg-[#050505] text-white" : "bg-[#f4f4f0] text-black"}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-blue text-white font-sans text-xs font-bold px-5 py-3 shadow-[4px_4px_0px_#000] flex items-center gap-3 border border-white/20 animate-slideUp">
          <span>⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className={`sticky top-0 z-40 border-b ${border} ${isDarkMode ? "bg-black/90" : "bg-[#f4f4f0]/90"} backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="bg-brand-blue text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-brand-blue">
              STUDIO
            </span>
            <span className="font-extrabold text-sm sm:text-base tracking-wider group-hover:text-brand-blue transition-colors">
              PORTFOLIO CMS
            </span>
          </Link>
          <span className="hidden md:inline-block text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            NO-DB • LOCAL STORAGE
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className={`font-sans text-[10px] sm:text-xs font-bold px-3 py-1.5 border transition-all flex items-center gap-1.5 ${
              isDarkMode
                ? "border-white/20 hover:border-white hover:bg-white hover:text-black"
                : "border-black/20 hover:border-black hover:bg-black hover:text-white"
            }`}
          >
            <span>LIHAT WEB</span>
            <span className="text-brand-blue">↗</span>
          </Link>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`font-sans text-[10px] sm:text-xs font-bold px-2.5 py-1.5 border ${
              isDarkMode ? "border-white/20 text-white" : "border-black/20 text-black"
            }`}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className={`px-4 sm:px-8 border-b ${border} flex gap-1 sm:gap-2 overflow-x-auto pt-3`}>
        {[
          { id: "projects", label: "💻 PROYEK CODING", count: store.projects.filter((p) => p.category === "DEVELOPMENT").length },
          { id: "designs", label: "🎨 GALERI DESAIN", count: store.projects.filter((p) => p.category === "DESIGN").length },
          { id: "profile", label: "👤 PROFIL & BIO", count: null },
          { id: "export", label: "💾 BACKUP & VERCEL EXPORT", count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 sm:px-5 py-2.5 font-sans text-[10px] sm:text-xs font-extrabold tracking-wider border-t-2 border-x transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-brand-blue text-white border-brand-blue"
                : isDarkMode
                ? "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                : "border-transparent text-black/60 hover:text-black hover:bg-black/5"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`text-[9px] font-mono px-1.5 py-0.2 border ${activeTab === tab.id ? "bg-white/20 border-white/30 text-white" : "opacity-60 border-current"}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* ═══════════════ TAB 1: CODING PROJECTS ═══════════════ */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 w-full sm:max-w-md relative">
                <input
                  type="text"
                  placeholder="Cari projek (judul, deskripsi, tag)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-3.5 py-2 text-xs font-sans border outline-none ${
                    isDarkMode ? "bg-[#0d0d0d] border-white/20 focus:border-brand-blue" : "bg-white border-black/20 focus:border-brand-blue"
                  }`}
                />
              </div>
              <button
                onClick={() => startCreateProject("DEVELOPMENT")}
                className="w-full sm:w-auto px-5 py-2 bg-brand-blue text-white text-xs font-extrabold tracking-wider border border-brand-blue hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                <span>+</span>
                <span>TAMBAH PROJEK BARU</span>
              </button>
            </div>

            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devProjects.map((p) => (
                <div
                  key={p.id}
                  className={`p-5 border flex flex-col justify-between space-y-4 ${bgCard} ${border} hover:border-brand-blue transition-all`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 border border-brand-blue text-brand-blue font-bold">
                          ID: {p.id}
                        </span>
                        <span className="text-[9px] font-bold text-amber-500 tracking-wider">
                          {p.status || "DEV"}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 font-bold">{p.year}</span>
                    </div>

                    <h3 className="font-extrabold text-base tracking-wide">{p.title}</h3>
                    <p className={`text-xs leading-relaxed line-clamp-2 ${fgMuted}`}>{p.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[8px] font-mono px-2 py-0.5 bg-neutral-500/10 border border-neutral-500/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/20">
                    <div className="flex gap-2">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-brand-blue hover:underline">
                          Live ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-neutral-400 hover:underline">
                          GitHub ↗
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditProject(p)}
                        className={`text-[10px] font-bold px-3 py-1 border ${
                          isDarkMode ? "border-white/20 hover:bg-white hover:text-black" : "border-black/20 hover:bg-black hover:text-white"
                        } transition-colors cursor-pointer`}
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => deleteProject(p.id, p.title)}
                        className="text-[10px] font-bold px-3 py-1 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                      >
                        HAPUS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {devProjects.length === 0 && (
              <div className="text-center py-16 border border-dashed border-neutral-700">
                <p className="text-sm font-bold text-neutral-400">Tidak ada projek yang cocok dengan pencarian.</p>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ TAB 2: DESIGN GALLERY ═══════════════ */}
        {activeTab === "designs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 w-full sm:max-w-md relative">
                <input
                  type="text"
                  placeholder="Cari karya desain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-3.5 py-2 text-xs font-sans border outline-none ${
                    isDarkMode ? "bg-[#0d0d0d] border-white/20 focus:border-brand-blue" : "bg-white border-black/20 focus:border-brand-blue"
                  }`}
                />
              </div>
              <button
                onClick={() => startCreateProject("DESIGN")}
                className="w-full sm:w-auto px-5 py-2 bg-brand-blue text-white text-xs font-extrabold tracking-wider border border-brand-blue hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                <span>+</span>
                <span>UPLOAD KARYA DESAIN</span>
              </button>
            </div>

            {/* Design Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {designProjects.map((p) => (
                <div key={p.id} className={`border ${border} ${bgCard} overflow-hidden group flex flex-col justify-between`}>
                  <div className="aspect-[3/4] relative bg-neutral-900 overflow-hidden">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-500 font-mono">
                        NO IMAGE
                      </div>
                    )}
                  </div>
                  <div className="p-2.5 space-y-1.5">
                    <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400">
                      <span>ID:{p.id}</span>
                      <span>{p.year}</span>
                    </div>
                    <p className="font-bold text-[11px] truncate">{p.title}</p>
                    <div className="flex gap-1 pt-1">
                      <button
                        onClick={() => startEditProject(p)}
                        className="flex-1 text-[8px] font-bold py-1 border border-neutral-700 hover:bg-white hover:text-black transition-colors cursor-pointer"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => deleteProject(p.id, p.title)}
                        className="text-[8px] font-bold px-2 py-1 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ TAB 3: PROFILE & BIO ═══════════════ */}
        {activeTab === "profile" && (
          <div className={`p-6 sm:p-8 border ${border} ${bgCard} max-w-3xl mx-auto space-y-6 shadow-[6px_6px_0px_#000]`}>
            <div className="border-b pb-4 border-neutral-800 flex justify-between items-center">
              <h2 className="font-extrabold text-lg tracking-wide">PENGATURAN PROFIL & DESKRIPSI</h2>
              <button
                onClick={saveProfile}
                className="px-5 py-2 bg-brand-blue text-white font-extrabold text-xs tracking-wider border border-brand-blue hover:bg-blue-700 transition-colors shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                SIMPAN PROFIL
              </button>
            </div>

            {/* Photo Avatar & Upload */}
            <div className="flex flex-col sm:flex-row gap-5 items-center border p-4 border-neutral-800 bg-neutral-900/30">
              <div className="w-24 h-24 sm:w-28 sm:h-28 border border-neutral-700 overflow-hidden bg-neutral-800 relative shrink-0">
                <img
                  src={profileForm.photoUrl || "/assets/img/profile/porto1.png"}
                  alt="Avatar Preview"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
              <div className="space-y-2 flex-1 w-full">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                  Foto Profil (URL / Upload Gambar Baru)
                </label>
                <input
                  type="text"
                  value={profileForm.photoUrl}
                  onChange={(e) => setProfileForm({ ...profileForm, photoUrl: e.target.value })}
                  placeholder="/assets/img/profile/porto1.png atau https://..."
                  className={`w-full px-3 py-2 text-xs border outline-none ${
                    isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                  }`}
                />
                <div className="flex items-center gap-3">
                  <label className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-bold cursor-pointer border border-neutral-700 transition-colors">
                    <span>📁 Upload Foto dari Komputer</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (base64) => setProfileForm({ ...profileForm, photoUrl: base64 }))}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Names & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-1">
                  Nama Depan (Typing)
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className={`w-full px-3 py-2 text-xs border outline-none ${
                    isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                  className={`w-full px-3 py-2 text-xs border outline-none ${
                    isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-1">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className={`w-full px-3 py-2 text-xs border outline-none ${
                    isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                  }`}
                />
              </div>
            </div>

            {/* Bio Description */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-1">
                Bio / Deskripsi Profil
              </label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className={`w-full px-3 py-2 text-xs border outline-none leading-relaxed ${
                  isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                }`}
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-1">
                Status Ketersediaan (Badge)
              </label>
              <input
                type="text"
                value={profileForm.availability}
                onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                className={`w-full px-3 py-2 text-xs border outline-none ${
                  isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                }`}
              />
            </div>

            {/* Currently List */}
            <div className="space-y-3 pt-3 border-t border-neutral-800">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                  Status Saat Ini (CURRENTLY)
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setProfileForm({
                      ...profileForm,
                      currently: [...(profileForm.currently || []), { role: "Posisi Baru", place: "Tempat / Instansi" }],
                    })
                  }
                  className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                >
                  + Tambah Status
                </button>
              </div>

              {profileForm.currently?.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center border p-2.5 border-neutral-800 bg-neutral-900/20">
                  <input
                    type="text"
                    placeholder="Role (e.g. Full Stack Developer)"
                    value={item.role}
                    onChange={(e) => {
                      const updated = [...profileForm.currently];
                      updated[idx].role = e.target.value;
                      setProfileForm({ ...profileForm, currently: updated });
                    }}
                    className={`flex-1 px-2.5 py-1.5 text-xs border outline-none ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Tempat / Keterangan (e.g. Magang @ PT ...)"
                    value={item.place}
                    onChange={(e) => {
                      const updated = [...profileForm.currently];
                      updated[idx].place = e.target.value;
                      setProfileForm({ ...profileForm, currently: updated });
                    }}
                    className={`flex-1 px-2.5 py-1.5 text-xs border outline-none ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = profileForm.currently.filter((_, i) => i !== idx);
                      setProfileForm({ ...profileForm, currently: updated });
                    }}
                    className="text-red-500 font-bold px-2 py-1 text-xs hover:bg-red-500/20 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Passions Tags */}
            <div className="space-y-3 pt-3 border-t border-neutral-800">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                Minat & Passion (Tags)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {profileForm.passions?.map((p, idx) => (
                  <span key={idx} className="text-xs font-mono px-2.5 py-1 bg-brand-blue/10 border border-brand-blue text-brand-blue flex items-center gap-2">
                    <span>{p}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = profileForm.passions.filter((_, i) => i !== idx);
                        setProfileForm({ ...profileForm, passions: updated });
                      }}
                      className="hover:text-red-500 font-bold cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tambah passion (tekan Enter)..."
                  value={newPassion}
                  onChange={(e) => setNewPassion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newPassion.trim()) {
                      e.preventDefault();
                      setProfileForm({
                        ...profileForm,
                        passions: [...(profileForm.passions || []), newPassion.trim()],
                      });
                      setNewPassion("");
                    }
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs border outline-none ${
                    isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newPassion.trim()) {
                      setProfileForm({
                        ...profileForm,
                        passions: [...(profileForm.passions || []), newPassion.trim()],
                      });
                      setNewPassion("");
                    }
                  }}
                  className="px-4 py-1.5 bg-neutral-800 text-white font-bold text-xs hover:bg-neutral-700 cursor-pointer"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ TAB 4: BACKUP & VERCEL EXPORT ═══════════════ */}
        {activeTab === "export" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className={`p-6 sm:p-8 border ${border} ${bgCard} space-y-6 shadow-[6px_6px_0px_#000]`}>
              <div>
                <h2 className="font-extrabold text-lg tracking-wide mb-1">PENGELOLAAN DATA & DEPLOY VERCEL (NO-DB)</h2>
                <p className={`text-xs leading-relaxed ${fgMuted}`}>
                  Sistem ini tidak memerlukan database eksternal. Perubahan otomatis tersimpan di browser Anda via <strong>LocalStorage</strong>. Untuk menjadikannya permanen di Vercel build secara global, Anda dapat mengunduh atau menyalin kode data JSON/TS di bawah ini.
                </p>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => downloadPortfolioJSON(store)}
                  className="p-4 border border-brand-blue bg-brand-blue/10 hover:bg-brand-blue hover:text-white text-brand-blue font-extrabold text-xs text-left transition-colors space-y-1 shadow-[3px_3px_0px_#000] cursor-pointer"
                >
                  <p className="text-sm font-black">📥 DOWNLOAD DATA JSON</p>
                  <p className="text-[10px] font-normal opacity-80">Unduh file backup portfolio-data.json</p>
                </button>

                <button
                  onClick={copyTypeScriptCode}
                  className="p-4 border border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-400 font-extrabold text-xs text-left transition-colors space-y-1 shadow-[3px_3px_0px_#000] cursor-pointer"
                >
                  <p className="text-sm font-black">📋 SALIN KODE TS / SOURCE</p>
                  <p className="text-[10px] font-normal opacity-80">Salin kode data untuk ditempel ke lib/portfolioData.ts</p>
                </button>
              </div>

              {/* Import Section */}
              <div className="p-4 border border-neutral-800 bg-neutral-900/40 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider">📤 Import Data dari File JSON</p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-bold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
                />
              </div>

              {/* Reset Section */}
              <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-red-400">Reset Data ke Default Awal</p>
                  <p className="text-[10px] text-neutral-500">Hapus cache LocalStorage dan kembali ke data bawaan.</p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  RESET DATA
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ═══════════════ MODAL: EDIT / CREATE PROJECT ═══════════════ */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-brand-blue ${bgCard} ${fg} p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_#000]`}>
            <div className="flex justify-between items-start border-b pb-4 border-neutral-800">
              <div>
                <span className="text-[9px] font-mono font-bold text-brand-blue tracking-widest uppercase">
                  {isCreatingNew ? "✦ TAMBAH PROJEK BARU" : "✦ EDIT PROJEK"}
                </span>
                <h3 className="font-extrabold text-xl mt-1">{editingProject.title || "Projek Tanpa Judul"}</h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="text-xs font-bold px-3 py-1 border border-neutral-700 hover:bg-neutral-800 cursor-pointer"
              >
                TUTUP ✕
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              {/* Category, Title, Year, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Kategori</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className={`w-full px-3 py-2 border outline-none font-bold ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  >
                    <option value="DEVELOPMENT">DEVELOPMENT (Coding)</option>
                    <option value="DESIGN">DESIGN (Karya Visual)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Judul Projek *</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="e.g. WIGLESCO"
                    className={`w-full px-3 py-2 border outline-none font-bold ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Tahun</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    placeholder="2026"
                    className={`w-full px-3 py-2 border outline-none ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Deskripsi Singkat (Card)</label>
                <textarea
                  rows={2}
                  value={editingProject.desc}
                  onChange={(e) => setEditingProject({ ...editingProject, desc: e.target.value })}
                  placeholder="Ringkasan singkat tentang proyek ini..."
                  className={`w-full px-3 py-2 border outline-none leading-relaxed ${
                    isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                  }`}
                />
              </div>

              {/* Tags Manager */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                  Tags & Teknologi (Pisahkan dengan Enter atau Koma)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editingProject.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-neutral-800 border border-neutral-700 text-[10px] font-mono flex items-center gap-1.5">
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingProject.tags.filter((_, i) => i !== idx);
                          setEditingProject({ ...editingProject, tags: updated });
                        }}
                        className="hover:text-red-500 font-bold cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Ketik tag lalu tekan Enter (e.g. Next.js, Flutter, Tailwind CSS)..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                      e.preventDefault();
                      if (!editingProject.tags.includes(tagInput.trim())) {
                        setEditingProject({
                          ...editingProject,
                          tags: [...editingProject.tags, tagInput.trim()],
                        });
                      }
                      setTagInput("");
                    }
                  }}
                  className={`w-full px-3 py-2 border outline-none ${
                    isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                  }`}
                />
              </div>

              {/* Links & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Status Badge</label>
                  <input
                    type="text"
                    value={editingProject.status || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    placeholder="e.g. ENTERPRISE SYSTEM"
                    className={`w-full px-3 py-2 border outline-none ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Live URL (Demo)</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className={`w-full px-3 py-2 border outline-none ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className={`w-full px-3 py-2 border outline-none ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                </div>
              </div>

              {/* Image & Multi-Image Carousel */}
              <div className="border p-4 border-neutral-800 space-y-3 bg-neutral-900/30">
                <label className="block text-[10px] font-bold uppercase text-neutral-300">
                  Media & Foto Projek
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="text"
                    value={editingProject.imageUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                    placeholder="URL Gambar Utama (/assets/img/... atau https://...)"
                    className={`flex-1 w-full px-3 py-2 border outline-none ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                  <label className="w-full sm:w-auto px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-[10px] text-center cursor-pointer border border-neutral-700 shrink-0">
                    <span>📁 Upload Gambar</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (base64) => setEditingProject({ ...editingProject, imageUrl: base64 }))}
                    />
                  </label>
                </div>

                {/* Multi-image Carousel */}
                <div className="pt-2">
                  <span className="block text-[9px] font-mono text-neutral-400 mb-1.5">
                    Multi-Image Carousel (Opsional, untuk slideshow di modal):
                  </span>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editingProject.images?.map((img, idx) => (
                      <div key={idx} className="relative group/slide w-20 h-14 border border-neutral-700 bg-black">
                        <img src={img} alt={`slide-${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = editingProject.images?.filter((_, i) => i !== idx);
                            setEditingProject({ ...editingProject, images: updated });
                          }}
                          className="absolute top-0 right-0 bg-red-600 text-white text-[9px] px-1 font-bold opacity-0 group-hover/slide:opacity-100 cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tambah URL slide carousel..."
                      value={newCarouselImg}
                      onChange={(e) => setNewCarouselImg(e.target.value)}
                      className={`flex-1 px-3 py-1.5 text-xs border outline-none ${
                        isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newCarouselImg.trim()) {
                          setEditingProject({
                            ...editingProject,
                            images: [...(editingProject.images || []), newCarouselImg.trim()],
                          });
                          setNewCarouselImg("");
                        }
                      }}
                      className="px-3 py-1.5 bg-neutral-800 text-white font-bold text-xs cursor-pointer"
                    >
                      + Slide
                    </button>
                  </div>
                </div>
              </div>

              {/* ── PROJECT DETAIL (POPUP MODAL DATA) ── */}
              <div className="border-t pt-4 border-neutral-800 space-y-4">
                <span className="block font-extrabold text-sm text-brand-blue tracking-wide">
                  ✦ DETAIL POP-UP MODAL PROJEK
                </span>

                {/* Objective */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">
                    Tujuan Proyek (Objective)
                  </label>
                  <textarea
                    rows={2}
                    value={editingDetail.objective}
                    onChange={(e) => setEditingDetail({ ...editingDetail, objective: e.target.value })}
                    placeholder="Penjelasan detail tujuan dan latar belakang pembuatan proyek..."
                    className={`w-full px-3 py-2 border outline-none leading-relaxed ${
                      isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                    }`}
                  />
                </div>

                {/* Highlights */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold uppercase text-neutral-400">
                      Highlights (Poin-Poin Utama Fitur)
                    </label>
                    <button
                      type="button"
                      onClick={() => setEditingDetail({ ...editingDetail, highlights: [...editingDetail.highlights, ""] })}
                      className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer"
                    >
                      + Tambah Poin Highlight
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editingDetail.highlights.map((h, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="text-brand-blue font-bold">→</span>
                        <input
                          type="text"
                          value={h}
                          onChange={(e) => {
                            const updated = [...editingDetail.highlights];
                            updated[idx] = e.target.value;
                            setEditingDetail({ ...editingDetail, highlights: updated });
                          }}
                          placeholder={`Poin highlight #${idx + 1}...`}
                          className={`flex-1 px-3 py-1.5 border outline-none ${
                            isDarkMode ? "bg-black border-white/20" : "bg-white border-black/20"
                          }`}
                        />
                        {editingDetail.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingDetail.highlights.filter((_, i) => i !== idx);
                              setEditingDetail({ ...editingDetail, highlights: updated });
                            }}
                            className="text-red-500 font-bold px-2 cursor-pointer"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-5 py-2 border border-neutral-700 text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                BATAL
              </button>
              <button
                type="button"
                onClick={saveProject}
                className="px-6 py-2 bg-brand-blue text-white font-extrabold text-xs tracking-wider border border-brand-blue hover:bg-blue-700 transition-colors shadow-[3px_3px_0px_#000] cursor-pointer"
              >
                SIMPAN PROJEK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
