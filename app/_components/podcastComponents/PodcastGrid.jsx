"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ApplePodcastsLogo, TrendUp } from "@phosphor-icons/react/dist/ssr";
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
        {isSuccess ? (
          <div className="py-2 font-medium text-sm flex items-center gap-1">
            Podcasts <ApplePodcastsLogo weight="bold" />
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.podcasts.map((podcast) => (
            <PodcastInfo key={podcast._id} podcast={podcast} />
          ))}
        </div>
        {isSuccess ? (
          <div className="flex">
            <button className="text-green-700 w-fit text-xs underline mt-2">
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
      className="group block"
    >
      <div className="relative">
        <div className="flex justify-center w-full overflow-hidden h-20 rounded-md">
          <img
            src={podcast?.featuredImage}
            className="w-full h-full object-cover hover:scale-105 duration-300"
            alt="Featured Image"
          />
        </div>
        <ApplePodcastsLogo
          weight="bold"
          className="absolute size-6 bottom-2 left-2 text-black bg-gray-200 p-1 rounded-full"
        />
      </div>
      <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 mt-1 transition-colors">
        {podcast.podcastName}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {podcast.author.name}
      </p>
    </Link>
  );
};

export default PodcastGrid;
