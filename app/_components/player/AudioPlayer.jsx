"use client";
import {
  Play,
  Pause,
  SpeakerHigh,
  SpeakerX,
  SkipBack,
  SkipForward,
} from "@phosphor-icons/react/dist/ssr";
import React, { useRef, useState, useEffect, useCallback } from "react";

const AudioPlayer = ({ audioFile }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const darkModeClass = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeClass);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && audioFile) {
      audio.src = audioFile;
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
        if (progressRef.current) {
          progressRef.current.value =
            (audio.currentTime / audio.duration) * 100;
        }
      });

      audio.addEventListener("ended", () => {
        handleNextTrack();
      });

      audio.addEventListener("waiting", () => {
        setLoading(true); // Show loading when buffering
      });

      audio.addEventListener("canplay", () => {
        setLoading(false); // Hide loading once audio can be played
      });

      audio.volume = volume;

      if (playing) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.removeEventListener("loadedmetadata", () => {});
        audio.removeEventListener("timeupdate", () => {});
        audio.removeEventListener("ended", () => {});
        audio.removeEventListener("waiting", () => {});
        audio.removeEventListener("canplay", () => {});
      }
    };
  }, [audioFile, volume, playing]);

  useEffect(() => {
    if (audioFile && !playing) {
      setPlaying(true);
    }
  }, [audioFile]);

  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (playing) {
        audio.pause();
      } else {
        audio.currentTime = currentTime;
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setPlaying(!playing);
    }
  }, [playing, currentTime]);

  const handleMute = useCallback(() => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.volume = volume;
      } else {
        audioRef.current.volume = 0;
      }
      setMuted(!muted);
    }
  }, [muted, volume]);

  const handleProgressClick = useCallback((e) => {
    const progress = progressRef.current;
    if (progress && audioRef.current) {
      const rect = progress.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const handleNextTrack = () => {
    const currentIndex = tracksQueue.findIndex((t) => t._id === track._id);
    const nextTrack = tracksQueue[currentIndex + 1];
    if (nextTrack) {
      setTrack(nextTrack);
    }
  };

  const handlePreviousTrack = () => {
    const currentIndex = tracksQueue.findIndex((t) => t._id === track._id);
    const previousTrack = tracksQueue[currentIndex - 1];
    if (previousTrack) {
      setTrack(previousTrack);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-0 w-full">
        <button
          onClick={handlePreviousTrack}
          aria-label="Previous"
          className="text-stone-600 dark:text-stone-200 p-2"
        >
          <SkipBack size={24} />
        </button>
        <button
          onClick={handlePlayPause}
          aria-label={playing ? "Pause" : "Play"}
          className="text-stone-600 dark:text-stone-200 p-2"
        >
          {playing ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={handleNextTrack}
          aria-label="Next"
          className="text-stone-600 dark:text-stone-200 p-2"
        >
          <SkipForward size={24} />
        </button>
        <div className="relative flex-1">
          <div
            className="w-full h-1 bg-stone-300 dark:bg-stone-700 rounded cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="absolute top-0 left-0 h-1 bg-blue-500 rounded"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <input
            ref={progressRef}
            type="range"
            min="0"
            max="100"
            step="0.1"
            defaultValue="0"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onClick={handleProgressClick}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="text-stone-600 dark:text-stone-200 ml-2"
          >
            {muted || volume === 0 ? (
              <SpeakerX size={24} />
            ) : (
              <SpeakerHigh size={24} />
            )}
          </button>
          <div className="text-stone-600 dark:text-stone-200 text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <audio ref={audioRef} preload="auto" />
      </div>
      <div>
        {loading && (
          <p className="bg-green-400 rounded-md text-xs w-fit p-1 px-2">
            Loading Music, Please Wait
          </p>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
