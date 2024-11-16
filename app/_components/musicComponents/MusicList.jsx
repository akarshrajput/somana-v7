"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MusicNote, Spinner } from "@phosphor-icons/react/dist/ssr";
import LoadingSmall from "../main/LoadingSmall";
import { useQuery } from "@tanstack/react-query";

const fetchMusic = async () => {
  const res = await axios.get(`/api/v1/music`);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 gap-4">
          {data?.tracks.map((podcast) => (
            <PodcastInfo key={podcast._id} podcast={podcast} />
          ))}
        </div>
        {isSuccess ? (
          <div className="flex">
            <button className="text-green-700 w-fit text-xs underline mt-2">
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

const PodcastInfo = ({ podcast }) => {
  return (
    <Link
      href={`/music/${podcast._id}?${podcast.musicName}`}
      className="group block bg-white dark:bg-gray-800"
    >
      <div className="relative">
        <div className="flex justify-center w-full overflow-hidden h-20 rounded-sm">
          <img
            src={podcast?.featuredImage}
            className="w-full h-full object-cover rounded-md hover:rounded-sm duration-500"
            alt="Featured Image"
          />
        </div>
        <MusicNote
          weight="bold"
          className="absolute size-6 bottom-2 left-2 text-black bg-gray-200 p-1 rounded-full"
        />
      </div>
      <p className="text-xs truncate font-semibold text-gray-900 dark:text-gray-100 mt-1 transition-colors">
        {podcast.musicName}
      </p>
      {/* <p className="text-xs text-gray-500 dark:text-gray-400">
        {podcast.author.name}
      </p> */}
    </Link>
  );
};

export default MusicList;
