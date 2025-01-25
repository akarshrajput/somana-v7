"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ApplePodcastsLogo, MusicNote } from "@phosphor-icons/react/dist/ssr";
import LoadingSmall from "../main/LoadingSmall";
import { useQuery } from "@tanstack/react-query";

const FetchMusic = ({ q }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/music?musicName=${q}&limit=6`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const tracks = data?.data?.tracks;
        console.log(tracks);

        setTracks(tracks); // Assuming the API returns an array of blogs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [q]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <>
        {!loading ? (
          <div className="py-2 font-medium text-sm flex items-center gap-1">
            Music <MusicNote weight="bold" />
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tracks.map((podcast) => (
            <PodcastInfo key={podcast._id} podcast={podcast} />
          ))}
        </div>
        {/* {!loading ? (
          <div className="flex">
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

const PodcastInfo = ({ podcast }) => {
  return (
    <Link
      href={`/music/${podcast._id}?${podcast.musicName}`}
      className="group block"
    >
      <div className="relative">
        <div className="flex justify-center w-full overflow-hidden h-20 rounded-sm">
          <img
            src={podcast?.featuredImage}
            className="w-full h-full hover:scale-105 object-cover duration-300"
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

export default FetchMusic;
