"use client";

import { MusicNote, Play } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const MusicInfo = ({ track }) => {
  return (
    <Link
      href={`/music/${track?._id}?${track.musicName}`}
      className="group block rounded-md overflow-hidden bg-white dark:bg-neutral-900 border hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative w-full h-20 aspect-square overflow-hidden">
        {/* Image Section */}
        <img
          src={track?.featuredImage || "/default-music.jpg"} // Fallback image
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={track?.musicName || "Music Image"}
        />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play
            weight="fill"
            className="text-white w-10 h-10 p-1 bg-black/50 rounded-md"
          />
        </div>
      </div>

      {/* Music Info Section */}
      <div className="p-1.5">
        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
          {track?.musicName || "Unknown Music"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
          {track?.musicType || "Mucis Type"}
        </p>
      </div>

      {/* Music Note Icon */}
      <div className="absolute top-2 left-2">
        <MusicNote
          weight="bold"
          className="text-white w-6 h-6 bg-blue-500 p-1 rounded-full"
        />
      </div>
    </Link>
  );
};

export default MusicInfo;
