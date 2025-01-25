import {
  ArrowElbowRightDown,
  ArrowRight,
  MusicNote,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";
import MusicInfo from "./MusicInfo";
import DisabledInfoButton from "../buttons/DisabledInfoButton";

const CommonSongs = async ({ hostname, musicType, description = "Songs" }) => {
  const res = await fetch(
    `${hostname}/api/v1/music?limit=10&musicType=${musicType}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  const tracks = data.data.tracks;

  return (
    <div className="container mx-auto">
      <div className="mb-2 ">
        <DisabledInfoButton>
          {description}
          <ArrowElbowRightDown weight="bold" />
        </DisabledInfoButton>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
        {tracks.map((track) => (
          <MusicInfo track={track} key={track._id} />
        ))}
      </div>
    </div>
  );
};

export default CommonSongs;
