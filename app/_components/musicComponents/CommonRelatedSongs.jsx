import { MusicNote } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";
import MusicInfo from "./MusicInfo";

const CommonRelatedSongs = async ({ hostname, musicType }) => {
  const res = await fetch(
    `${hostname}/api/v1/music?limit=12&musicType=${musicType}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  const tracks = data.data.tracks;

  return (
    <div>
      <div>
        <p className="text-sm p-2  font-medium flex items-center gap-2">
          <MusicNote weight="bold" className="size-4" /> Related Songs
        </p>
      </div>
      <div className="grid  grid-cols-12 gap-2">
        {tracks.map((track) => (
          <MusicInfo track={track} key={track._id} />
        ))}
      </div>
    </div>
  );
};

const Music = ({ track }) => {
  const name = track.musicName.substring(0, 20);
  return (
    <Link href={`/music/${track._id}`}>
      <div className="border bg-stone-100 dark:border-stone-700 p-0 sm:p-1 dark:bg-stone-800 flex flex-col gap-1 rounded-lg overflow-hidden">
        <div className="overflow-hidden">
          <img
            className="aspect-square rounded-md object-cover"
            src={track.featuredImage}
          />
        </div>
        <div className="px-1 pb-2">
          <p className="font-medium text-nowrap">
            {name} {name.length < track.musicName.length ? "..." : ""}
          </p>

          {/* <div className="flex items-center gap-1"> */}
          <p className="font-medium text-nowrap text-sm text-stone-500">
            {track.credits}
          </p>
          {/* <p className="font-medium text-nowrap text-sm">{track.musicType}</p> */}

          {/* </div> */}
        </div>
      </div>
    </Link>
  );
};

export default CommonRelatedSongs;
