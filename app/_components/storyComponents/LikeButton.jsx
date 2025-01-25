"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, ThumbsDown, ThumbsUp } from "@phosphor-icons/react/dist/ssr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const LikeButton = ({ blogId, initialLikes, userId }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (userId) {
      setLiked(initialLikes.includes(userId));
    }
  }, [initialLikes, userId]);

  const handleLike = async () => {
    try {
      const response = await axios.get(
        `/api/v1/blogs/slug/${blogId}?userId=${userId}&action=like`
      );
      setLikes(response.data.data.likes);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  return (
    <div className="flex font-semibold text-sm items-center gap-1">
      <button
        onClick={handleLike}
        className={`like-button font-semibold text-sm  ${liked ? "liked" : ""}`}
      >
        {liked ? (
          <Heart
            className="size-5 ease-out duration-300  text-red-600"
            weight="fill"
          />
        ) : (
          <Heart
            className="size-5 hover:scale-125 ease-out duration-300 text-black"
            weight="bold"
          />
        )}{" "}
      </button>
      <div className="ml-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="px-0 font-medium text-sm">{likes?.length} likes</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{likes?.length} people like this story.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default LikeButton;
