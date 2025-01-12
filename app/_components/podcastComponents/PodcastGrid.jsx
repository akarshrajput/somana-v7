"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  ApplePodcastsLogo,
  Play,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import LoadingSmall from "../main/LoadingSmall";
import { useQuery } from "@tanstack/react-query";

const fetchPodcasts = async () => {
  const res = await axios.get(`/api/v1/podcasts?limit=6`);
  return res?.data?.data;
};

const PodcastGrid = () => {
  const { data, loading, isSuccess } = useQuery({
    queryKey: ["podcasts"],
    queryFn: fetchPodcasts,
  });
  return (
    <div>
      <>
        {/* {isSuccess ? (
          <div className="py-2 font-medium text-sm flex items-center gap-1">
            Podcasts <ApplePodcastsLogo weight="bold" />
          </div>
        ) : (
          ""
        )} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {data?.podcasts.map((podcast) => (
            <PodcastInfo key={podcast._id} podcast={podcast} />
          ))}
        </div>
        {isSuccess ? (
          <div className="flex">
            <button className="bg-neutral-100 border py-1 px-2 rounded-md w-fit text-xs mt-2">
              Explore More Podcasts
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
      href={`/podcast/${podcast._id}?${podcast.podcastName}`}
      className="group block rounded-md p-0.5"
    >
      <div className="relative rounded-sm overflow-hidden">
        <div className="flex justify-center w-full overflow-hidden h-20 rounded-sm relative group">
          <img
            src={podcast?.featuredImage}
            className="w-full h-full object-cover duration-300"
            alt="Featured Image"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play weight="fill" className="size-10" />
          </div>
        </div>

        <ApplePodcastsLogo
          weight="bold"
          className="absolute size-4 bottom-2 left-2 text-black bg-gray-200 p-0.5 rounded-sm"
        />
      </div>
      <p className="text-xs truncate font-semibold text-gray-900 dark:text-gray-100 mt-1 transition-colors">
        {podcast.podcastName}
      </p>
      <p className="text-xs truncate text-gray-500 dark:text-gray-400">
        {podcast.author.name}
      </p>
    </Link>
  );
};

export default PodcastGrid;
