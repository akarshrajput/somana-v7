"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label"; // Assuming Label is a component in your UI library
import SpinnerMain from "../main/SpinnerMain";
import Link from "next/link";

const ChannelStories = ({ channelId }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stories from the API
  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/channels/${channelId}/stories`);
      console.log(response);
      setStories(response.data.data.stories); // Assuming the response contains the 'data' object with stories
    } catch (err) {
      setError("Failed to load stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(); // Fetch stories when the component mounts
  }, [channelId]);

  // Loading state
  if (loading) {
    return <SpinnerMain />;
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error}</p>
      </div>
    );
  }

  // No stories found
  if (!stories || stories.length === 0) {
    return (
      <div className="text-center mt-8">
        <p>No stories available for this channel.</p>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {stories.map((story) => (
          <Link
            href={`/story/${story.slug}`}
            key={story._id}
            className="border p-1.5 rounded-md flex flex-col gap-1"
          >
            <h3 className="font-semibold text-sm truncate mb-1 leading-5">
              {story.heading}
            </h3>
            <div className="overflow-hidden rounded-md">
              <img
                src={story.featuredImage}
                alt={story.heading}
                className="w-full h-32 hover:scale-105 duration-300 object-cover rounded-md"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelStories;
