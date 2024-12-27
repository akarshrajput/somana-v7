"use client";
import React, { useState } from "react";
import supabase from "@/app/_lib/supabase";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Info,
  PaperPlaneRight,
  Pen,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Share } from "@phosphor-icons/react";
// import LoadingMain from "../main/Loading";
// import { Spinner, useToast } from "@chakra-ui/react";
// import AlertBox from "../main/AlertBox";
import QuillEditor from "../editor/QuillEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Blog",
  "Automotive",
  "Beauty",
  "Books",
  "Business",
  "Career",
  "Cryptocurrency",
  "Culture",
  "Crafts",
  "Design",
  "Education",
  "Entertainment",
  "Environmental",
  "Fashion",
  "Finance",
  "Fitness",
  "Food",
  "Gaming",
  "Gardening",
  "Health",
  "History",
  "Home",
  "Humor",
  "Interests",
  "Investing",
  "Legal",
  "Lifestyle",
  "Luxury",
  "Marketing",
  "Movies",
  "Music",
  "News",
  "Nonprofit",
  "Parenting",
  "Pets",
  "Photography",
  "Politics",
  "Estate",
  "Relationships",
  "Science",
  "Shopping",
  "Social",
  "Space",
  "Spirituality",
  "Sports",
  "Startups",
  "Story",
  "Technology",
  "Tips",
  "Travel",
  "Volunteer",
  "Writing",
];

const WriteBlog = ({ supabaseURL, session, hostname }) => {
  // const toast = useToast();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [collectedImages, setCollectedImages] = useState([]);
  const [tags, setTags] = useState("");
  const [fileInputs, setFileInputs] = useState([0]);
  const [genre, setGenre] = useState("Blog");
  const [featuredImage, setFeaturedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [question, setQuestion] = useState("");
  const [aiLoading, setAiLoading] = useState("");

  const handleUseAI = () => {
    setUseAI(true);
  };

  const handleNotUseAI = () => {
    setUseAI(false);
    setContent("");
  };

  const handleAISubmit = async (e) => {
    e.preventDefault();
    setAiLoading(true);

    try {
      const response = await fetch("/api/v1/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const aiResponseData = await response.json();
      console.log(aiResponseData);
      setContent(aiResponseData.answer);
    } catch (err) {
      console.log("AI Error");
    } finally {
      setAiLoading(false);
      // setQuestion(""); // Clear the input field after submission
    }
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !heading ||
      !content ||
      !description ||
      !featuredImage ||
      !tags ||
      !genre
    ) {
      // toast({
      //   description: "Please fill all fields",
      //   status: "error",
      //   duration: 2000,
      //   isClosable: true,
      // });
      return;
    }

    if (featuredImage.type.split("/")[0] !== "image") {
      // toast({
      //   description: "Only image files are allowed",
      //   status: "error",
      //   duration: 2000,
      //   isClosable: true,
      // });
      return;
    }

    try {
      setIsLoading(true);

      // Upload featured image
      const imageName = `${Math.random()}-${Date.now()}-${featuredImage?.name}`;
      const imagePath = `${supabaseURL}/storage/v1/object/public/blog-featured-images/${imageName}`;
      await supabase.storage
        .from("blog-featured-images")
        .upload(imageName, featuredImage);

      // Upload each collected image and store URLs
      const collectedImageUrls = [];
      for (const image of collectedImages) {
        const collectedImageName = `${Math.random()}-${Date.now()}-${
          image?.name
        }`;
        const collectedImagePath = `${supabaseURL}/storage/v1/object/public/blog-collected-images/${collectedImageName}`;

        await supabase.storage
          .from("blog-collected-images")
          .upload(collectedImageName, image);
        collectedImageUrls.push(collectedImagePath);
      }

      // Prepare blog data for MongoDB
      const blogData = {
        heading,
        description,
        content,
        tags,
        genre,
        usedAI: useAI,
        author: session.user.userId,
        featuredImage: imagePath,
        collectedImages: collectedImageUrls, // Store the collected image URLs array
      };

      // Send blog data to MongoDB via your API
      const response = await axios.post(`/api/v1/blogs`, blogData, {
        headers: { "Content-Type": "application/json" },
      });

      const slug = response?.data?.data?.newBlog?.slug;
      // toast({
      //   title: "Success",
      //   description: "Story posted Successfully!",
      //   status: "success",
      //   duration: 9000,
      //   isClosable: true,
      // });
      router.push(`/story/${slug}`);

      // Reset form fields
      setHeading("");
      setDescription("");
      setContent("");
      setFeaturedImage("");
      setCollectedImages([]); // Clear collected images
      setTags("");
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Error posting story!",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      // });
      console.error("Error posting Blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeadingChange = (e) => {
    if (e.target.value.length <= 100) {
      setHeading(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 300) {
      setDescription(e.target.value);
    }
  };

  const handleContentChange = (value) => {
    if (value.length <= 200000) {
      setContent(value);
    }
  };
  const handleTagsChange = (e) => {
    if (e.target.value.length <= 15) {
      setTags(e.target.value);
    }
  };

  const handleImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    setCollectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = files[0];
      return updatedImages;
    });
  };

  const addFileInput = () => {
    setFileInputs((prevInputs) => [...prevInputs, prevInputs.length]);
  };

  const handleGenreChange = (e) => {
    if (e.target.value.length <= 15) {
      setGenre(e.target.value);
    }
  };

  return (
    <div>
      <div className="px-4 flex items-center gap-2">
        {!useAI ? (
          <Button onClick={handleUseAI}>
            Use AI
            <Sparkle weight="bold" />
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleNotUseAI}>
              Write without AI
              <Pen weight="bold" />
            </Button>
            <p className="text-sm text-red-600 bg-red-50  w-fit  rounded-md py-2 px-4 flex items-center gap-1">
              <Info weight="bold" />
              Others will know that you have used AI <Sparkle weight="fill" />{" "}
              for writing article.
            </p>
          </div>
        )}
      </div>
      <form
        className="rounded-md p-4 overflow-hidden flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2  py-1">
          <Label>Heading</Label>
          <Input
            value={heading}
            onChange={handleHeadingChange}
            placeholder="Write heading"
          />
        </div>
        <div className="flex flex-col gap-2  py-1">
          <Label>Description</Label>
          <Input
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Write description"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 py-1">
          <div className="flex flex-col gap-2">
            <Label>Description photo</Label>
            <Input
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              type="file"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Tags</Label>
            <Input
              value={tags}
              onChange={handleTagsChange}
              placeholder="Write Tags"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Genre</Label>
            <Select value={genre} onValueChange={(value) => setGenre(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
                {(session.user.role === "admin" ||
                  session.user.role === "guide") && (
                  <SelectItem value="top-10">Top 10</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col rounded-md   gap-4">
          <Label>Add additional Images (optional)*</Label>
          {fileInputs.map((input, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="file"
                className="w-fit"
                onChange={(e) => handleImageChange(e, index)}
              />
              {collectedImages[index] && (
                <span>{collectedImages[index].name}</span>
              )}
            </div>
          ))}
          <Button type="button" className="w-fit" onClick={addFileInput}>
            Add more
          </Button>
        </div>
        {useAI ? (
          <div className="flex flex-col gap-2  py-1">
            <p className="text-sm text-red-600  w-fit bg-red-50 rounded-md py-1 px-4 flex items-center gap-1">
              <Info weight="bold" />
              You are using Somana AI <Sparkle weight="fill" />
            </p>

            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              placeholder="Write prompt"
              className="resize-none"
            />

            <Button
              onClick={handleAISubmit}
              className="ml-auto  text-sm cursor-pointer w-fit text-stone-100 bg-stone-800 rounded-md py-1 px-2 flex items-center gap-1"
            >
              {aiLoading ? (
                <p className="ml-auto text-sm cursor-pointer w-fit text-stone-100 bg-stone-800 rounded-md py-1 px-2 flex items-center gap-1">
                  Generating... Wait.
                </p>
              ) : (
                <p className="ml-auto  text-sm cursor-pointer w-fit text-stone-100 bg-stone-800 rounded-md py-1 px-2 flex items-center gap-1">
                  Generate <PaperPlaneRight weight="fill" />
                </p>
              )}
            </Button>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col gap-2">
          <Label>Write content</Label>
          <div className="">
            <QuillEditor value={content} onChange={handleContentChange} />
          </div>
        </div>

        <div className="py-1">
          {isLoading ? <Label>Please do not close this window</Label> : ""}

          <Button disabled={isLoading}>
            {isLoading ? (
              // <Spinner size="sm" />
              <p>Loading</p>
            ) : (
              <div className="flex items-center gap-1">
                <p>Post</p>
                <PaperPlaneRight className="size-4" weight="bold" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
