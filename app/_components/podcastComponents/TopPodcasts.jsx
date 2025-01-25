"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "@/app/loading";
import { Image } from "@chakra-ui/react";
import { ApplePodcastsLogo } from "@phosphor-icons/react";

const TopPodcasts = ({ api }) => {
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
    <div className="relative">
      <div className="flex items-center gap-2">
        {podcasts.map((podcast, index) => (
          <PodcastInfo podcast={podcast} key={podcast._id} />
        ))}
      </div>
    </div>
  );
};

const PodcastInfo = ({ podcast }) => {
  return (
    <Link
      href={`/podcast/${podcast._id}?${podcast.podcastName}`}
      className="rounded-sm cursor-pointer"
    >
      <div className="relative">
        <Image
          boxSize="140px"
          src={podcast?.featuredImage}
          alt="Featured"
          objectFit="cover"
          className="rounded-sm"
        />
        <ApplePodcastsLogo
          weight="bold"
          className="absolute size-6 bottom-2 right-2 text-white bg-gray-800 p-1 rounded-full"
        />
      </div>
      <p className="font-medium px-1 text-sm">{podcast.podcastName}</p>
      <p className="font-medium px-1 dark:text-stone-400 text-stone-500 text-sm">
        {podcast.author.name}
      </p>
    </Link>
  );
};

export default TopPodcasts;
