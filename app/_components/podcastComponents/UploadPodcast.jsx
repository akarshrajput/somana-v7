"use client";
import supabase from "@/app/_lib/supabase";
import React, { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Spinner, Upload } from "@phosphor-icons/react/dist/ssr";
// import { UploadIcon } from "lucide-react";
// import { ReloadIcon } from "@radix-ui/react-icons";

const UploadPodcast = ({ supabaseURL, session, hostname }) => {
  const [podcastName, setPodcastName] = useState("");
  const [podcastCategory, setPodcastCategory] = useState("Education");
  const [releaseDate, setReleaseDate] = useState("");
  const [audioLink, setAudioLink] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  const [language, setLanguage] = useState("English");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const podcastCategories = [
    "Education",
    "Technology",
    "Health",
    "Lifestyle",
    "Business",
    "Comedy",
    "News",
    "Music",
    "Sports",
    "Politics",
    "Science",
    "History",
    "Fiction",
    "Interviews",
  ];
  const podcastLanguages = ["English", "Hindi", "Spanish", "French", "German"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!podcastName || !podcastCategory || !audioLink || !featuredImage) {
      toast({
        title: "Field Error",
        description: "Please fill all input fields",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });

      return;
    }

    if (!audioLink || audioLink.type.split("/")[0] !== "audio") {
      toast({
        title: "Type Error",
        description: "Only Audio file is allowed",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    if (!featuredImage || featuredImage.type.split("/")[0] !== "image") {
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
      const imagePath = `${supabaseURL}/storage/v1/object/public/podcasts-images/${imageName}`;
      const audioName = `${Math.random()}-${Date.now()}-${audioLink?.name}`;
      const audioPath = `${supabaseURL}/storage/v1/object/public/podcasts/${audioName}`;

      const podcastData = {
        podcastName: podcastName,
        podcastCategory: podcastCategory,
        audioLink: audioPath,
        featuredImage: imagePath,
        language: language,
        description: description,
        author: session.user.userId,
      };

      toast({
        title: "Uploading Progress",
        description: "Uploading Podcast Image",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      const podcastImage = featuredImage;
      await supabase.storage
        .from("podcasts-images")
        .upload(imageName, podcastImage);

      toast({
        title: "Uploading Progress",
        description: "Uploading Podcast Audio",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      const podcastAudio = audioLink;
      await supabase.storage.from("podcasts").upload(audioName, podcastAudio);

      toast({
        title: "Uploading Progress",
        description: "Uploading Podcast Data",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      const response = await axios.post(`/api/v1/podcasts`, podcastData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(podcastData);

      toast({
        title: "Uploaded Successfully",
        description: "Podcast data uploaded successfully",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      setPodcastName("");
      setPodcastCategory("");
      setAudioLink("");
      setFeaturedImage("");
      setReleaseDate("");

      setLanguage("");
      setDescription("");
    } catch (error) {
      toast({
        title: "Error Uploading!",
        description: "Podcast data not uploaded!",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      console.log("Error", error);
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
        <div className="flex  gap-4">
          <input
            className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-fit"
            value={podcastName}
            onChange={(e) => setPodcastName(e.target.value)}
            placeholder="Podcast Name"
          />
          <div className="flex flex-col gap-1">
            <select
              value={podcastCategory}
              onChange={(e) => setPodcastCategory(e.target.value)}
              className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
            >
              <option value="" disabled>
                Select a category
              </option>
              {podcastCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
              >
                <option value="" disabled>
                  Select a language
                </option>
                {podcastLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-start gap-1">
            <input
              onChange={(e) => setAudioLink(e.target.files[0])}
              type="file"
              id="podcast-audio"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <input
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              type="file"
              id="podcasts-image"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-[590px]">
          <div className="flex flex-col w-full gap-1">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Description"
              className="border border-stone-200  dark:placeholder:text-stone-200  bg-stone-50 placeholder-stone-600 py-2 px-2 outline-none rounded-md w-full"
            />
          </div>
        </div>

        {/* {isLoading ? (
          <Alert className="w-96" variant="destructive">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Warning !</AlertTitle>
            <AlertDescription>
              Please do not close window during uploading.
            </AlertDescription>
          </Alert>
        ) : null} */}

        <button
          disabled={isLoading}
          className="bg-emerald-600 w-fit text-stone-50 flex items-center gap-1 py-1 px-2 rounded-md"
        >
          {isLoading ? (
            <div className="flex items-center gap-1">
              <p>Uploading</p>
              <Spinner className="size-4 animate-spin" weight="bold" />
            </div>
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

export default UploadPodcast;
