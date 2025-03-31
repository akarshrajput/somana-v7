"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { MusicNote } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import MusicInfo from "./MusicInfo";

const fetchMusic = async () => {
  const res = await axios.get(`/api/v1/music?limit=24`);
  return res?.data?.data;
};

const MusicListMain = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["tracks2"],
    queryFn: fetchMusic,
  });

  return (
    <div className="">
      {/* {isSuccess && (
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Listen to Music <MusicNote weight="bold" className="text-primary" />
        </h2>
      )} */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2">
        {data?.tracks.map((track) => (
          <MusicInfo key={track._id} track={track} />
        ))}
      </div>
    </div>
  );
};

const PodcastCard = ({ podcast }) => {
  return (
    <Link
      href={`/music/${podcast._id}`}
      className="group block rounded-md overflow-hidden bg-gray-900 hover:bg-gray-800 transition-all duration-300"
    >
      <div className="relative w-full overflow-hidden">
        <img
          src={podcast?.featuredImage}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          alt={podcast.musicName}
        />
        <MusicNote
          className="absolute bottom-3 left-3 text-white bg-black/50 p-1 rounded-full size-7"
          weight="bold"
        />
      </div>
      <div className="p-2">
        <p className="text-sm font-medium truncate text-white">
          {podcast.musicName}
        </p>
        <p className="text-xs text-gray-400">{podcast.author?.name}</p>
      </div>
    </Link>
  );
};

export default MusicListMain;
