"use client";
import { useState, useEffect } from "react";
import { ArrowElbowRightDown } from "@phosphor-icons/react/dist/ssr";
import MusicInfoList from "./MusicInfoList";
import LoaderSmall from "../main/LoaderSmall";
import { useMusicPlayer } from "@/app/_context/MusicPlayerContext";

const CategoryMusicComponent = ({ params }) => {
  const [tracks, setTracks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setTracksQueue } = useMusicPlayer();

  const fetchMusicData = async (currentPage) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/v1/music?limit=10&page=${currentPage}&musicType=${params.musicType}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (data.data.tracks.length === 0) {
        setHasMore(false);
      } else {
        setTracks((prevTracks) => {
          const allTracks = [...prevTracks, ...data.data.tracks];
          setTracksQueue(allTracks); // Set the queue in context
          return allTracks;
        });
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusicData(page);
  }, [page]);

  const loadMoreTracks = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col pb-20 pt-4 items-center">
      <div className="w-5/6">
        <div className="my-2">
          <div className="flex items-center gap-2">
            {params.musicType} songs
            <ArrowElbowRightDown weight="bold" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {tracks.map((track) => (
            <MusicInfoList key={track._id} track={track} />
          ))}
        </div>
        {hasMore && (
          <div className="my-4">
            <button
              onClick={loadMoreTracks}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? <LoaderSmall /> : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMusicComponent;
