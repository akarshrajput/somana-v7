"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const MyChannels = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/channels?authorID=${session?.user?.userId}`
        );
        setChannels(response?.data?.data?.channels); // Assuming API returns channel data
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.userId) {
      fetchChannels();
    }
  }, [session]);

  return (
    <div>
      <h1 className="mt-6 font-medium text-sm ml-1 mb-2">Your Channels</h1>
      {loading && <p>Loading channels...</p>}
      {!loading && channels.length === 0 && <p>No channels found.</p>}
      {!loading && channels.length > 0 && (
        <div className="grid grid-cols-6 gap-4">
          {channels.map((channel) => (
            <Channel channel={channel} key={channel.id} />
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
      className="bg-neutral-100 rounded-md p-2"
    >
      <div className="flex justify-center w-full overflow-hidden h-24 md:h-24 rounded-sm">
        <img
          src={channel?.labelImage}
          className="w-full h-full object-cover rounded-md hover:rounded-sm duration-500"
          alt="Featured Image"
        />
      </div>
      <p className="font-medium text-sm mt-2">{channel.channelName}</p>
    </Link>
  );
};

export default MyChannels;
