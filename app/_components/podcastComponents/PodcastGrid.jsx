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
      className="group block relative rounded-md overflow-hidden bg-white dark:bg-neutral-900 border hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative w-full h-20 aspect-square overflow-hidden">
        {/* Image Section */}
        <img
          src={podcast?.featuredImage || "/default-podcast.jpg"} // Fallback image
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={podcast?.podcastName || "Podcast Image"}
        />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play
            weight="fill"
            className="text-white w-10 h-10 p-1 bg-black/50 rounded-md"
          />
        </div>
      </div>

      {/* Podcast Info Section */}
      <div className="p-1.5">
        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
          {podcast?.podcastName || "Unknown Podcast"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
          {podcast?.author?.name || "Unknown Author"}
        </p>
      </div>

      {/* Apple Podcast Logo */}
      <div className="absolute top-1 left-1">
        <ApplePodcastsLogo
          weight="bold"
          className="text-white w-5 h-5 bg-gradient-to-r from-red-400 to-red-600 p-1 rounded-sm shadow-sm"
        />
      </div>
    </Link>
  );
};

export default PodcastGrid;
