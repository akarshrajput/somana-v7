"use client";
import supabase from "@/app/_lib/supabase";
import { Info, Upload } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import SpinnerMain from "../main/SpinnerMain";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

const UploadMusic = ({ supabaseURL, session, hostname }) => {
  const [musicName, setMusicName] = useState("");
  const [musicType, setMusicType] = useState("Love");
  const [releaseDate, setReleaseDate] = useState("");
  const [audioLink, setAudioLink] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [credits, setCredits] = useState("");
  const [album, setAlbum] = useState("");
  const [songLang, setSongLang] = useState("Hindi");
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const { toast } = useToast();

  const musicCategories = [
    "Love",
    "Pop",
    "Happy",
    "Break-up",
    "Sad",
    "Funk",
    "Relaxed",
    "Nostalgic",
    "Motivational",
    "Rock",
    "Hip-Hop",
    "Rap",
    "Classical",
    "Jazz",
    "Country",
    "Electronic",
    "Indie",
    "Workout",
    "Study",
    "Sleep",
    "Party",
    "Road Trip",
    "Romance",
    "Nature",
    "Social-Issues",
    "Fantasy",
    "Sci-Fi",
    "Travel",
    "Gaming",
  ];
  const songLanguages = ["Hindi", "English", "Spanish", "Turkish", "Nepali"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !musicName ||
      !musicType ||
      !releaseDate ||
      !audioLink ||
      !featuredImage ||
      !credits ||
      !album
    ) {
      toast({
        title: "Field Error",
        description: "Please fill all input fields",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    if (audioLink.type.split("/")[0] !== "audio") {
      toast({
        title: "Type Error",
        description: "Only Audio file is allowed",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    if (featuredImage.type.split("/")[0] !== "image") {
      toast({
        title: "Type Error",
        description: "Only Image file is allowed",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    try {
      toast({
        title: "Uploading Progress",
        description: "Uploading data in progress",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      setIsLoading(true);
      const imageName = `${Math.random()}-${Date.now()}-${featuredImage?.name}`;
      const imagePath = `${supabaseURL}/storage/v1/object/public/audio-track-images/${imageName}`;
      const audioName = `${Math.random()}-${Date.now()}-${audioLink?.name}`;
      const audioPath = `${supabaseURL}/storage/v1/object/public/audio-tracks/${audioName}`;

      const musicData = {
        musicName: musicName,
        musicType: musicType,
        releaseDate: releaseDate,
        audioLink: audioPath,
        featuredImage: imagePath,
        credits: credits,
        album: album,
        songLang: songLang,
        lyrics: lyrics,
        author: session.user.userId,
      };
      console.log(musicData);

      toast({
        title: "Uploading Progress",
        description: "Uploading Audio Image",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      const avatarImage = featuredImage;
      await supabase.storage
        .from("audio-track-images")
        .upload(imageName, avatarImage);

      toast({
        title: "Uploading Progress",
        description: "Uploading Audio File",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      const avatarAudio = audioLink;
      await supabase.storage
        .from("audio-tracks")
        .upload(audioName, avatarAudio);

      toast({
        title: "Uploading Progress",
        description: "Uploading Audio Data",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      const response = await axios.post(`/api/v1/music`, musicData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        title: "Uploaded Successfully",
        description: "Audio data uploaded successfully",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      // const slug = response?.data?.data?.newBlog?.slug;
      // toast.success("Music Uploaded Success!");
      // router.push(`/music`);
      // console.log(response);

      setMusicName("");
      setMusicType("");
      setAudioLink("");
      setFeaturedImage("");
      setReleaseDate("");
      setLyrics("");
      setCredits("");
      setAlbum("");
    } catch (error) {
      toast({
        title: "Error Uploading!",
        description: "Audio data not uploaded!",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 overflow-hidden"
      >
        {/* <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up ",
              description: "Friday, February 10, 2023 at 5:57 PM",
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
            });
          }}
        >
          Add to calendar
        </Button> */}
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-1">
            {/* <label>Song name </label> */}
            <input
              value={musicName}
              onChange={(e) => setMusicName(e.target.value)}
              placeholder="Song name"
              className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
            />
          </div>
          <div className="flex items-center gap-1">
            {/* Removed the commented-out label */}
            <div>
              <select
                className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
                value={musicType}
                onChange={(e) => setMusicType(e.target.value)}
              >
                {musicCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* <label>Release Date - </label> */}
            <input
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
              type="date"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {/* <label>Credits (artist names) : </label> */}
            <input
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
              placeholder="Credits/Artist names"
            />
          </div>
          <div className="flex items-center gap-1">
            {/* <label>Album :</label> */}
            <input
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
              placeholder="Album name"
            />
          </div>
          <div className="flex items-center gap-1">
            <div>
              <select
                className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
                value={songLang}
                onChange={(e) => setSongLang(e.target.value)}
              >
                {songLanguages.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-start gap-1">
            <label>Music file : </label>
            <input
              onChange={(e) => setAudioLink(e.target.files[0])}
              type="file"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <label>Featured Image : </label>
            <input
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              type="file"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col w-full gap-1">
            <label>Lyrics (optional) : </label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              rows={10}
              className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
            />
          </div>
        </div>
        {isLoading ? (
          <p className="flex text-sm my-2 items-center gap-1 text-yellow-600">
            <Info /> Please do not close window while posting
          </p>
        ) : (
          ""
        )}

        <button
          disabled={isLoading}
          className="bg-emerald-600 w-fit text-stone-50 flex items-center gap-1 py-1 px-2 rounded-md"
        >
          {isLoading ? (
            // <LoaderSmall />
            <SpinnerMain />
          ) : (
            <div className="flex items-center gap-1">
              <p>Upload</p>
              <Upload className="size-4" weight="bold" />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadMusic;
