import React from "react";
import BaseButton from "../buttons/BaseButton";
import { Star, Upload } from "@phosphor-icons/react/dist/ssr";
import SpecialButton from "../buttons/SpecialButton";
import SearchMusic from "./SearchMusic";

const MusicNavigation = ({ hostname }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
      <div className="justify-self-center md:justify-self-start">
        <div className="ml-auto flex items-center gap-2">
          <SpecialButton
            className="dark:text-stone-50 ease-in duration-300 bg-stone-200  dark:bg-stone-700"
            href="/music/upload"
          >
            <Upload weight="bold" />
            Upload
          </SpecialButton>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <SearchMusic hostname={hostname} />
      </div>
      <div></div>
    </div>
  );
};

export default MusicNavigation;
