"use client";
import AudioPlayer from "@/app/_components/player/AudioPlayer";
import { SealCheck } from "@phosphor-icons/react";
import { Podcast } from "lucide-react";
import { useEffect, useState } from "react";
import PodcastList from "./PodcastList";
import Loading from "@/app/loading";

const PodcastPage = ({ params }) => {
  const [podcast, setPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [audio] = useState(new Audio());

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await fetch(`/api/v1/podcasts/${params.podcastID}`);
        const result = await response.json();

        if (result.status === "success") {
          setPodcast(result.data);
        } else {
          console.error("Failed to fetch podcast:", result.message);
        }
      } catch (error) {
        console.error("Error fetching podcast:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcast();
  }, [params.podcastID]);

  const handlePlay = () => {
    if (podcast) {
      audio.src = podcast.audioLink;
      audio.play();
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loading />
          </div>
        ) : podcast ? (
          <div>
            <div className="relative h-96 w-full overflow-hidden">
              <img
                src={podcast.featuredImage}
                alt={podcast.podcastName}
                className="w-full h-96 object-cover"
              />
              {/* Overlay for title */}
              <div className="absolute  w-full inset-0 bg-gradient-to-t dark:from-black/70 to-transparent from-white/70 flex items-end">
                <div className="flex items-center w-full">
                  <div className="flex px-2 flex-col gap-2 py-2">
                    <img
                      src={podcast.featuredImage}
                      alt={podcast.podcastName}
                      className="size-32 object-cover"
                    />

                    <h1 className="text-xl font-medium dark:text-white text-black">
                      {podcast.podcastName}
                    </h1>
                  </div>
                  <div className="ml-auto mr-2">
                    <Podcast
                      strokeWidth="3px"
                      className="size-20 animate-pulse text-black dark:text-stone-50"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <AudioPlayer podcast={podcast} />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <img
                    src={podcast.author.photo}
                    alt={podcast.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <h2 className="font-medium text-stone-800 dark:text-stone-200">
                    {podcast.author.name}
                  </h2>
                  {podcast.author.verified ? (
                    <SealCheck weight="fill" className="text-sky-400" />
                  ) : (
                    ""
                  )}
                </div>
                <p className="mb-4 mt-4 text-gray-700 dark:text-gray-300">
                  {podcast.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">No podcast found.</div>
        )}
      </div>
      <p className="px-2">More from {podcast?.author?.name}</p>
      <div className="">
        <PodcastList
          api={`/api/v1/podcasts?authorID=${podcast?.author?._id}`}
        />
      </div>
    </>
  );
};

export default PodcastPage;
