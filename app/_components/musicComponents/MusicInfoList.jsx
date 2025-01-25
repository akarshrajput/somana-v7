"use client";

import React from "react";
import { useMusicPlayer } from "@/app/_context/MusicPlayerContext";
import { Play } from "@phosphor-icons/react/dist/ssr";

const MusicInfoList = ({ track }) => {
  const { setTrack } = useMusicPlayer();

  function handlePlay() {
    setTrack(track);
  }
  const customMusicName = track.musicName.substring(0, 20);
  const customCredits = track.credits.substring(0, 20);

  return (
    <div
      onClick={handlePlay}
      className="cursor-pointer p-2 transform transition-transform duration-300"
    >
      <div className="relative flex items-center gap-4 rounded-sm group">
        {/* Music Image */}
        <div className="w-16 h-16 overflow-hidden rounded-sm relative">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={track.featuredImage}
            alt={track.musicName}
          />
          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play weight="fill" size={30} className="shadow-lg text-white" />
          </div>
        </div>

        {/* Music Information */}
        <div className="md:hidden">
          <div className="flex flex-col justify-center">
            <p className="text-nowrap overflow-hidden font-semibold text-gray-800 text-[14px] truncate">
              {customMusicName}
            </p>
            <p className="text-nowrap overflow-hidden text-gray-600 text-[12px] truncate">
              {customCredits}
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex flex-col justify-center">
            <p className="text-nowrap overflow-hidden font-semibold text-gray-800 text-[14px] truncate">
              {track.musicName}
            </p>
            <p className="text-nowrap overflow-hidden text-gray-600 text-[12px] truncate">
              {track.credits}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicInfoList;
