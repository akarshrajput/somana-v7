"use client";

import React from "react";
import { useMusicPlayer } from "@/app/_context/MusicPlayerContext";
import { Play } from "@phosphor-icons/react/dist/ssr";

const MusicInfo = ({ track }) => {
  const { setTrack } = useMusicPlayer();

  function handlePlay() {
    setTrack(track);
  }

  return (
    <div
      onClick={handlePlay}
      className="cursor-pointer p-1 transform transition-transform duration-300"
    >
      <div className="relative flex flex-col gap-2 rounded-sm group">
        {/* Music Image */}
        <div className="overflow-hidden rounded-sm relative">
          <img
            className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            src={track.featuredImage}
            alt={track.musicName}
          />
          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play weight="fill" size={40} className=" shadow-lg text-white" />
          </div>
        </div>

        {/* Music Information */}
        <div className="flex flex-col text-center">
          <p className="font-semibold text-gray-800 text-[13px] truncate">
            {track.musicName}
          </p>
          <p className="text-gray-600 text-[12px] truncate">{track.credits}</p>
        </div>
      </div>
    </div>
  );
};

export default MusicInfo;
