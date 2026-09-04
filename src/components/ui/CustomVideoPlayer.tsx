"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  aspectRatioClass?: string;
  className?: string;
  badge?: string;
  showCenterPlayButton?: boolean;
}

export default function CustomVideoPlayer({
  src,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
  aspectRatioClass = "aspect-[16/9]",
  className = "",
  badge,
  showCenterPlayButton = true,
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("0:00");
  const [durationFormatted, setDurationFormatted] = useState("0:00");
  const [showControls, setShowControls] = useState(!autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile / touch screens on client mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        ("ontouchstart" in window && window.innerWidth < 1024)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper: Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Initialize Autoplay & Muted attributes safely
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoPlay) {
      video.defaultMuted = true;
      video.muted = true;
      setIsMuted(true);
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      video.muted = muted;
      setIsMuted(muted);
    }
  }, [autoPlay, muted]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Controls auto-hide timer
  const scheduleControlsHide = useCallback(() => {
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  }, [isPlaying]);

  const handleMouseMove = () => {
    setIsHovered(true);
    scheduleControlsHide();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isPlaying) {
      setShowControls(false);
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        scheduleControlsHide();
      });
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  // Mute toggle
  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Time updates
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
    setCurrentTimeFormatted(formatTime(video.currentTime));
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDurationFormatted(formatTime(video.duration));
  };

  // Seek on click or drag
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const seekFraction = clickX / rect.width;
    video.currentTime = seekFraction * video.duration;
    setProgress(seekFraction * 100);
  };

  // Fullscreen toggle with iOS webkitEnterFullscreen fallback
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          if (video?.webkitEnterFullscreen) video.webkitEnterFullscreen();
        });
      } else if (video?.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      onClick={isMobile ? undefined : togglePlay}
      className={`relative w-full overflow-hidden bg-black select-none group ${
        isMobile ? "" : "cursor-pointer"
      } ${aspectRatioClass} ${
        className ? className : "rounded-none sm:rounded-3xl border-y sm:border border-[#CFC3CC]/40 sm:shadow-2xl sm:shadow-[#7B5A7E]/10"
      }`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        controls={isMobile}
        loop={loop}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
        }}
        className="w-full h-full object-cover"
      />

      {/* Optional Badge (e.g. "FemHealth Tour" or "Walkthrough") */}
      {badge && !isPlaying && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-semibold flex items-center gap-2 border border-white/10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#D46789] animate-pulse" />
            <span>{badge}</span>
          </div>
        </div>
      )}

      {/* Sound Indicator Pill for Autoplaying Videos (Desktop only) */}
      {!isMobile && autoPlay && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm text-[#D46789]">
            {isMuted ? "volume_off" : "volume_up"}
          </span>
          <span className="text-[11px]">{isMuted ? "Tap for Sound" : "Sound On"}</span>
        </button>
      )}

      {/* Center Big Play Button (Desktop only, when paused) */}
      {!isMobile && showCenterPlayButton && !isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label="Play video"
            className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white/95 text-[#7B5A7E] hover:text-[#D46789] hover:bg-[#F9E4EA] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group/btn border border-white/40"
          >
            <span
              className="material-symbols-outlined text-4xl sm:text-5xl translate-x-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </button>
          <span className="mt-4 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/70 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 shadow-xl">
            Watch Introduction
          </span>
        </div>
      )}

      {/* LUXURY CUSTOM CONTROL BAR (Desktop only - Auto-hiding Glassmorphism) */}
      {!isMobile && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 cursor-default ${
            showControls || !isPlaying || isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
        <div className="bg-black/50 backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex flex-col gap-2">
          {/* Interactive Progress Bar */}
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="relative w-full h-1.5 hover:h-2.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all duration-200 group/bar flex items-center"
          >
            {/* Filled Progress in Brand Rose (#D46789) */}
            <div
              className="h-full bg-gradient-to-r from-[#E898A8] to-[#D46789] rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              {/* Scrubber thumb */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform duration-150" />
            </div>
          </div>

          {/* Controls Bottom Row */}
          <div className="flex items-center justify-between gap-3 text-white text-xs pt-0.5">
            {/* Left Controls: Play/Pause + Time */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors text-white"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>

              <div className="text-[11px] sm:text-xs font-mono text-white/85 tracking-wide select-none">
                <span>{currentTimeFormatted}</span>
                <span className="text-white/40 mx-1">/</span>
                <span className="text-white/60">{durationFormatted}</span>
              </div>
            </div>

            {/* Right Controls: Volume + Fullscreen */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors text-white"
              >
                <span className="material-symbols-outlined text-lg">
                  {isMuted ? "volume_off" : "volume_up"}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors text-white"
              >
                <span className="material-symbols-outlined text-lg">
                  {isFullscreen ? "fullscreen_exit" : "fullscreen"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
