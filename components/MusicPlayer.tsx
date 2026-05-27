"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string; // relative path, e.g. "/music/track1.mp3"
  duration: string; // human-readable fallback e.g. "3:24"
}

const PLAYLIST: Track[] = [
  { id: 1, title: "Arteri",       artist: ".Feast",         src: "/assets/audio/arteri.mp3",      duration: "4:12" },
  { id: 2, title: "Untuk Hati Yang Terluka", artist: "Hindia", src: "/assets/audio/hindia.mp3",  duration: "3:47" },
  { id: 3, title: "Ruang",        artist: "Hindia",          src: "/assets/audio/ruang.mp3",       duration: "4:01" },
  { id: 4, title: "Sebuah Tragedi", artist: ".Feast",        src: "/assets/audio/tragedi.mp3",     duration: "3:55" },
];

// Musical note icon
const NoteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z"/>
  </svg>
);

// Play icon
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

// Pause icon
const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

// Skip next icon
const SkipNextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
  </svg>
);

// Skip prev icon
const SkipPrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

function formatTime(sec: number): string {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({ isDarkMode }: { isDarkMode: boolean }) {
  const [open, setOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);      // 0–1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const track = PLAYLIST[currentIdx];

  // Listen to global toggle event
  useEffect(() => {
    const handleToggle = () => {
      setOpen(o => {
        const nextOpen = !o;
        if (nextOpen) {
          setIsPlaying(true);
        }
        return nextOpen;
      });
    };
    window.addEventListener("toggle-music-player", handleToggle);
    return () => window.removeEventListener("toggle-music-player", handleToggle);
  }, []);

  // Update progress bar via RAF
  const tick = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
      rafRef.current = requestAnimationFrame(tick);
    } else {
      audio.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying, tick]);

  // Track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = PLAYLIST[currentIdx].src;
    audio.load();
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentIdx(i => (i + 1) % PLAYLIST.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio);
  };

  const skipNext = () => setCurrentIdx(i => (i + 1) % PLAYLIST.length);
  const skipPrev = () => setCurrentIdx(i => (i - 1 + PLAYLIST.length) % PLAYLIST.length);
  const togglePlay = () => setIsPlaying(p => !p);

  // Theme colours
  const bg  = isDarkMode ? "bg-black border-white/15" : "bg-[#f4f4f0] border-black/15";
  const txt = isDarkMode ? "text-white" : "text-black";
  const sub = isDarkMode ? "text-white/40" : "text-black/40";
  const row = isDarkMode ? "hover:bg-white/5" : "hover:bg-black/5";
  const activeRow = isDarkMode ? "bg-white/10" : "bg-black/8";
  const trackFill = "bg-brand-blue";
  const trackBg  = isDarkMode ? "bg-white/15" : "bg-black/15";

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="none"
      />

      {/* Mini player panel */}
      {open && (
        <div
          className={`fixed bottom-6 right-6 z-[99] border shadow-2xl ${bg} ${txt}`}
          style={{
            width: "272px",
            fontFamily: "inherit",
            boxShadow: isDarkMode
              ? "0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)"
              : "0 8px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)"
          }}
        >
          {/* Header */}
          <div className={`flex items-center justify-between px-4 py-3 border-b ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
            <span className="font-display text-[9px] tracking-widest uppercase font-bold opacity-50">Now Playing</span>
            <button
              onClick={() => setOpen(false)}
              className={`${sub} hover:opacity-100 transition-opacity`}
              aria-label="Close player"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Current track info */}
          <div className="px-4 pt-4 pb-3">
            <p className="font-display font-bold text-[13px] leading-tight truncate">{track.title}</p>
            <p className={`font-display text-[10px] tracking-widest uppercase mt-0.5 ${sub}`}>{track.artist}</p>

            {/* Progress bar */}
            <div
              className={`mt-3 h-1 w-full ${trackBg} cursor-pointer relative`}
              onClick={handleSeek}
            >
              <div
                className={`absolute left-0 top-0 h-full ${trackFill} transition-none`}
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* Times */}
            <div className={`flex justify-between mt-1 font-display text-[9px] ${sub}`}>
              <span>{formatTime(currentTime)}</span>
              <span>{duration ? formatTime(duration) : track.duration}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-5 mt-3">
              <button
                onClick={skipPrev}
                className={`${sub} hover:${txt} transition-colors`}
                aria-label="Previous"
              >
                <SkipPrevIcon />
              </button>

              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-9 h-9 flex items-center justify-center bg-brand-blue text-white hover:opacity-90 transition-opacity"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button
                onClick={skipNext}
                className={`${sub} hover:${txt} transition-colors`}
                aria-label="Next"
              >
                <SkipNextIcon />
              </button>
            </div>
          </div>

          {/* Playlist */}
          <div className={`border-t ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
            <p className={`font-display text-[8px] tracking-widest uppercase px-4 py-2 ${sub}`}>Playlist</p>
            {PLAYLIST.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setCurrentIdx(i); setIsPlaying(true); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === currentIdx ? activeRow : row}`}
              >
                {/* Playing indicator */}
                <div className="w-3 flex-shrink-0 flex items-center justify-center">
                  {i === currentIdx && isPlaying ? (
                    <span className="flex gap-[2px] items-end h-3">
                      <span className="w-[2px] bg-brand-blue animate-bounce" style={{ height: "60%", animationDelay: "0ms" }} />
                      <span className="w-[2px] bg-brand-blue animate-bounce" style={{ height: "100%", animationDelay: "150ms" }} />
                      <span className="w-[2px] bg-brand-blue animate-bounce" style={{ height: "40%", animationDelay: "300ms" }} />
                    </span>
                  ) : (
                    <span className={`text-[9px] font-display ${i === currentIdx ? "text-brand-blue" : sub}`}>
                      {i + 1}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-display text-[11px] font-bold truncate ${i === currentIdx ? "text-brand-blue" : txt}`}>
                    {t.title}
                  </p>
                  <p className={`font-display text-[9px] tracking-wide truncate ${sub}`}>{t.artist}</p>
                </div>

                <span className={`font-display text-[9px] flex-shrink-0 ${sub}`}>{t.duration}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
