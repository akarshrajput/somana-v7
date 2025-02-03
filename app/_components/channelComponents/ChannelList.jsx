"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import SpinnerMain from "../main/SpinnerMain";

// Fetch channels function
const fetchChannels = async () => {
  const res = await axios.get(`/api/v1/channels?limit=6`);
  return res?.data?.data; // Assuming the API returns channels inside `data`
};

const ChannelList = () => {
  // Using React Query to fetch channels
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });

  return (
    <div className="dark:bg-black dark:text-stone-50 mx-auto">
      {/* {isSuccess && (
        <p className="font-semibold text-lg ml-2 mb-4 text-gray-700 dark:text-gray-300">
          Channels
        </p>
      )} */}
      {isLoading && <SpinnerMain />}
      {isError && (
        <p className="text-red-500">
          Error fetching channels. Please try again later.
        </p>
      )}
      {!isLoading && !isError && data?.channels?.length === 0 && (
        <p className="text-gray-500">No channels found.</p>
      )}
      {!isLoading && !isError && data?.channels?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {data.channels.map((channel) => (
            <Channel key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
};

const Channel = ({ channel }) => {
  return (
    <Link
      href={`channel/${channel?.id}`}
      className="bg-white dark:bg-neutral-900 hover:shadow-md rounded-md border overflow-hidden transition duration-300"
    >
      <div className="flex justify-center overflow-hidden h-28 w-full">
        <img
          src={channel?.labelImage}
          className="w-full h-full object-cover"
          alt={`${channel.channelName} Cover`}
        />
      </div>
      <div className="p-2">
        <p className="font-semibold text-xs border-black dark:text-gray-100 truncate">
          {channel.channelName}
        </p>
        <p className="text-xs  dark:text-gray-400 line-clamp-2">
          {channel?.bio}
        </p>
      </div>
    </Link>
  );
};

export default ChannelList;
