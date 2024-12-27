"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MusicNote, Spinner } from "@phosphor-icons/react/dist/ssr";
import LoadingSmall from "../main/LoadingSmall";
import { useQuery } from "@tanstack/react-query";
import MusicInfo from "./MusicInfo";

const fetchMusic = async () => {
  const res = await axios.get(`/api/v1/music?limit=20`);
  return res?.data?.data;
};

const MusicList = () => {
  const { data, loading, isSuccess } = useQuery({
    queryKey: ["tracks1"],
    queryFn: fetchMusic,
  });

  return (
    <div>
      <>
        {isSuccess ? (
          <div className="px-2 py-1 bg-neutral-100 rounded-md mb-2 w-fit font-medium border text-xs flex items-center gap-1">
            More Music <MusicNote weight="bold" />
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 gap-2">
          {data?.tracks.map((track) => (
            <MusicInfo key={track._id} track={track} />
          ))}
        </div>
        {/* {isSuccess ? (
          <div className="flex ml-2">
            <button className="bg-neutral-200 py-1 px-2 rounded-md w-fit text-xs mt-2">
              Explore More ...
            </button>
          </div>
        ) : (
          ""
        )} */}
      </>
    </div>
  );
};

export default MusicList;
