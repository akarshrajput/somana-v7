"use client";

import { MusicNote } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const MusicInfo = ({ track }) => {
  return (
    <Link
      href={`/music/${track?._id}?${track.musicName}`}
      className="group block border p-1 rounded-md"
    >
      <div className="relative">
        <div className="flex justify-center w-full overflow-hidden h-20 rounded-sm">
          <img
            src={track?.featuredImage}
            className="w-full h-full hover:scale-105 object-cover duration-300"
            alt="Featured Image"
          />
        </div>
        <MusicNote
          weight="bold"
          className="absolute size-6 bottom-2 left-2 text-black bg-gray-200 p-1 rounded-md"
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
