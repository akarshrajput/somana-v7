"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Heart } from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LikeButton = ({ blogId, initialLikes, userId }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkUserLiked = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `/api/v1/blogs/slug/${blogId}?userId=${userId}`
        );
        setLiked(response.data.data.userLiked); // Set liked state properly
      } catch (error) {
        console.error("Error checking like status:", error);
      } finally {
        setLoading(false); // Ensure state updates after API call
      }
    };

    checkUserLiked();
  }, [blogId, userId]);

  const handleLike = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `/api/v1/blogs/slug/${blogId}?userId=${userId}&action=like`
      );
      setLikes(response.data.data.likesCount);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  return (
    <div className="flex font-semibold text-sm items-center gap-1">
      <button
        onClick={handleLike}
        disabled={loading} // Disable button while checking like status
        className={`like-button font-semibold text-sm ${liked ? "liked" : ""}`}
      >
        <Heart
          className={`size-5 ease-out duration-300 ${
            liked ? "text-red-600" : "text-black"
          } ${!loading ? "hover:scale-125" : ""}`}
          weight={liked ? "fill" : "bold"}
        />
      </button>
      <div className="ml-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="px-0 font-medium text-sm">{likes} likes</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{likes} people like this story.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default LikeButton;
