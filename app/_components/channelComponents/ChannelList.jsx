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
      {isSuccess && <p className="font-medium text-sm ml-2 mb-2">Channels</p>}
      {isLoading && <SpinnerMain />}
      {isError && <p>Error fetching channels. Please try again later.</p>}{" "}
      {/* Error message */}
      {!isLoading && !isError && data?.channels?.length === 0 && (
        <p>No channels found.</p> /* No channels message */
      )}
      {!isLoading && !isError && data?.channels?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
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
      className="hover:bg-neutral-100 rounded-md  p-2 duration-300 dark:bg-neutral-900"
    >
      <p className="font-medium text-xs mb-1 truncate">{channel.channelName}</p>
      <p className="text-xs my-0.5 line-clamp-2">{channel?.bio}</p>
      <div className="flex justify-center w-full overflow-hidden h-24 md:h-24 rounded-sm">
        <img
          src={channel?.labelImage}
          className="w-full h-full object-cover rounded-md hover:rounded-sm duration-500"
          alt={`${channel.channelName} Cover`}
        />
      </div>
    </Link>
  );
};

export default ChannelList;
