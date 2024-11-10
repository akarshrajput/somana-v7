"use client";
import supabase from "@/app/_lib/supabase";
import { Info, Upload } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
// import LoaderSmall from "../main/LoaderSmall";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const UploadPodcast = ({ supabaseURL, session, hostname }) => {
  const [podcastName, setPodcastName] = useState("");
  const [podcastCategory, setPodcastCategory] = useState("Education");
  const [releaseDate, setReleaseDate] = useState("");
  const [audioLink, setAudioLink] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  const [language, setLanguage] = useState("English");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      //   toast.error("Please fill all fields");
      return;
    }

    if (!audioLink || audioLink.type.split("/")[0] !== "audio") {
      //   toast.error("Only audio files are allowed");
      return;
    }

    if (!featuredImage || featuredImage.type.split("/")[0] !== "image") {
      //   toast.error("Only image files are allowed");
      return;
    }

    try {
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

      const podcastImage = featuredImage;
      await supabase.storage
        .from("podcasts-images")
        .upload(imageName, podcastImage);

      const podcastAudio = audioLink;
      await supabase.storage.from("podcasts").upload(audioName, podcastAudio);

      const response = await axios.post(`/api/v1/podcasts`, podcastData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(podcastData);

      //toast
      setPodcastName("");
      setPodcastCategory("");
      setAudioLink("");
      setFeaturedImage("");
      setReleaseDate("");

      setLanguage("");
      setDescription("");
    } catch (error) {
      //   toast.error("Error uploading podcast, Server Error");
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex flex-col gap-1">
          <Label>Podcast Name</Label>
          <Input
            className="w-72"
            value={podcastName}
            onChange={(e) => setPodcastName(e.target.value)}
            placeholder="Podcast Name"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="podcast-audio">Podcast Audio</Label>
            <Input
              className="w-72"
              onChange={(e) => setAudioLink(e.target.files[0])}
              type="file"
              id="podcast-audio"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="podcasts-image">Podcast Image</Label>
            <Input
              className="w-72"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              type="file"
              id="podcasts-image"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <Label>Podcast Type</Label>

            <Select
              value={podcastCategory}
              onValueChange={(value) => setPodcastCategory(value)}
            >
              <SelectTrigger className="w-72">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {podcastCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-72">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    {podcastLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 w-[590px]">
          <div className="flex flex-col w-full gap-1">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Description"
              className="resize-none"
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

        {isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button>
            Upload
            <UploadIcon />
          </Button>
        )}
      </form>
    </div>
  );
};

export default UploadPodcast;
