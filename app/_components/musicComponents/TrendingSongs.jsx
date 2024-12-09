import {
  ArrowElbowRightDown,
  ArrowRight,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";
import MusicInfo from "./MusicInfo";
import DisabledInfoButton from "../buttons/DisabledInfoButton";

const TrendingSongs = async ({ hostname }) => {
  const res = await fetch(`${hostname}/api/v1/music?limit=12`, {
    cache: "no-store",
  });
  const data = await res.json();
  const tracks = data.data.tracks;

  return (
    <div className="container mx-auto">
      <div className="mb-2 mt-2">
        <DisabledInfoButton>
          Trending Songs
          <ArrowElbowRightDown weight="bold" className="text-stone-500" />
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

export default TrendingSongs;
