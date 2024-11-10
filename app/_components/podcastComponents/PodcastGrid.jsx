"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ApplePodcastsLogo } from "@phosphor-icons/react/dist/ssr";
import LoadingSmall from "../main/LoadingSmall";

const PodcastGrid = ({ api }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(api, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPodcasts(response.data.data.podcasts);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [api]);

  return (
    <div>
      {/* <p className="mb-2 font-medium flex items-center gap-1">
        <ApplePodcastsLogo weight="bold" />
        Podcasts
        <button className="text-sm p-0.5 px-2 bg-green-300 rounded-md">
          More podcasts
        </button>
      </p> */}
      {loading ? (
        <LoadingSmall />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {podcasts.map((podcast) => (
              <PodcastInfo key={podcast._id} podcast={podcast} />
            ))}
          </div>
          <div className="flex">
            <button className="text-green-700 w-fit text-xs underline mt-2">
              Explore More Podcasts
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const PodcastInfo = ({ podcast }) => {
  return (
    <Link
      href={`/podcast/${podcast._id}?${podcast.podcastName}`}
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
