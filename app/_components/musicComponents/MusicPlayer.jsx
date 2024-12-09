"use client";
import React, { useEffect, useState } from "react";
import AudioPlayer from "../player/AudioPlayer";
import axios from "axios";

const MusicPlayer = ({ musicId }) => {
  const [audio, setAudio] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await axios.get(`/api/v1/music/${musicId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setAudio(response.data.data);
      } catch (err) {
        console.error("Error fetching music data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMusicData();
  }, [musicId]);

  if (loading) {
    return <div className="text-center p-4 text-gray-500">Loading...</div>;
  }

  return (
    <div className="mt-8 dark:bg-stone-900 text-stone-700 dark:text-stone-200 w-full mx-auto my-6 p-4 rounded-lg">
      {/* Featured Image */}
      <div className="relative w-full h-72 overflow-hidden rounded-lg mb-4">
        <img
          src={audio.featuredImage}
          alt={audio.musicName}
          className="object-cover w-full h-full"
        />
        {/* Overlay for title */}
        <div className="absolute  w-full inset-0 bg-gradient-to-t from-black/70 flex items-end">
          <div className="flex items-center w-full">
            <div className="flex px-2 flex-col gap-2 py-2">
              <img
                src={audio.featuredImage}
                alt={audio.musicName}
                className="size-32 object-cover  rounded-lg"
              />
              {/* <h1 className="text-xl font-medium dark:text-white text-black">
                      {podcast.podcastName}
                    </h1> */}
            </div>
            {/* <div className="ml-auto mr-2">
                    <Podcast
                      strokeWidth="3px"
                      className="size-20 animate-pulse text-black dark:text-stone-50"
                    />
                  </div> */}
          </div>
        </div>
      </div>

      {/* Song Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{audio.musicName}</h2>
        <p className="text-sm text-stone-500">by {audio.author?.name}</p>
        <p className="text-xs text-stone-400">
          Album: {audio.album} · {audio.songLang} · {audio.musicType}
        </p>
      </div>

      {/* Credits */}
      {audio.credits && (
        <p className="text-sm text-stone-400 italic mb-2">
          Credits: {audio.credits}
        </p>
      )}

      {/* Audio Player */}
      <div className="mt-4">
        <AudioPlayer audioFile={audio.audioLink} />
      </div>
    </div>
  );
};

export default MusicPlayer;
