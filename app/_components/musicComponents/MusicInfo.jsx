"use client";

import { MusicNote } from "@phosphor-icons/react";
import { Play } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

const MusicInfo = ({ track }) => {
  return (
    <Link
      href={`/music/${track?._id}?${track.musicName}`}
      className="group block rounded-md p-0.5"
    >
      <div className="relative rounded-sm overflow-hidden">
        <div className="flex justify-center w-full overflow-hidden h-20 rounded-sm relative group">
          {/* The image */}
          <img
            src={track?.featuredImage}
            className="w-full h-full object-cover duration-300"
            alt="Featured Image"
          />
          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
          {/* Centered Text */}
          <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play weight="fill" className="size-10" />
          </div>
        </div>
        {/* Music Note Icon */}
        <MusicNote
          weight="bold"
          className="absolute size-4 bottom-2 left-2 text-black bg-gray-200 p-0.5 rounded-sm"
        />
      </div>
      <p className="text-xs truncate font-semibold text-gray-900 dark:text-gray-100 mt-1 transition-colors">
        {track.musicName}
      </p>
      {/* <p className="text-xs text-gray-500 dark:text-gray-400">
        {track.author.name}
      </p> */}
    </Link>
  );
};

export default MusicInfo;
