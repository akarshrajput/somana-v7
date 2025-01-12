"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ApplePodcastsLogo, MusicNote } from "@phosphor-icons/react/dist/ssr";
import LoadingSmall from "../main/LoadingSmall";
import { useQuery } from "@tanstack/react-query";
import MusicInfo from "./MusicInfo";

const fetchMusic = async () => {
  const res = await axios.get(`/api/v1/music?limit=6`);
  return res?.data?.data;
};

const MusicGrid = () => {
  const { data, loading, isSuccess } = useQuery({
    queryKey: ["tracks"],
    queryFn: fetchMusic,
  });

  return (
    <div>
      <>
        {/* {isSuccess ? (
          <div className="py-2 font-medium text-sm flex items-center gap-1">
            Music <MusicNote weight="bold" />
          </div>
        ) : (
          ""
        )} */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {data?.tracks.map((track) => (
            <MusicInfo key={track._id} track={track} />
          ))}
        </div>
        {isSuccess ? (
          <div className="flex">
            <button className="bg-neutral-100 border py-1 px-2 rounded-md w-fit text-xs mt-2">
              Explore More Music
            </button>
          </div>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default MusicGrid;
