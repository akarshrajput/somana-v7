"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

// Fetch channels function
const fetchChannels = async () => {
  const res = await axios.get(`/api/v1/channels?limit=6`);
  return res?.data?.data; // Assuming the API returns channels inside `data`
};

const ChannelList = () => {
  // Using React Query to fetch channels
  const { data, isLoading, isError } = useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });

  return (
    <div className="dark:bg-black dark:text-stone-50 mx-auto">
      <p className="font-medium text-sm ml-1 mb-2 text-gray-700 dark:text-gray-300">
        Featured Channels
      </p>
      {isLoading && <ChannelSkeleton />} {/* Skeleton UI */}
      {isError && (
        <p className="text-red-500 text-center">
          Error fetching channels. Please try again later.
        </p>
      )}
      {!isLoading && !isError && data?.channels?.length === 0 && (
        <p className="text-gray-500 text-center">No channels found.</p>
      )}
      {!isLoading && !isError && data?.channels?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {data.channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
};

// 🎨 Professional Skeleton Loader
const ChannelSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-neutral-900 rounded-lg border overflow-hidden animate-pulse"
        >
          <div className="h-28 w-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 🎯 Channel Card Component
const ChannelCard = ({ channel }) => {
  return (
    <Link
      href={`/channel/${channel.id}`}
      className="bg-white dark:bg-neutral-900 hover:shadow-md rounded-lg border overflow-hidden transition duration-300"
    >
      <div className="relative h-28 w-full overflow-hidden">
        <img
          src={channel.labelImage}
          className="w-full h-full object-cover"
          alt={`${channel.channelName} Cover`}
        />
      </div>
      <div className="p-3">
        <p className="font-semibold text-sm dark:text-gray-100 truncate">
          {channel.channelName}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {channel.bio}
        </p>
      </div>
    </Link>
  );
};

export default ChannelList;
