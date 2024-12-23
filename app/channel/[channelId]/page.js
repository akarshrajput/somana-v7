"use client";
import ChannelStories from "@/app/_components/channelComponents/ChannelStories";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/channels/${params.channelId}`
        );
        console.log(response);
        setChannel(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.channelId) {
      fetchChannelData();
    }
  }, [params.channelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!channel) {
    return <div>No channel data available.</div>;
  }

  return (
    <div className="px-2 py-2 flex justify-center mt-16">
      <div className="w-[1200px]">
        {/* {channel.author.id} */}
        <div className="edit-channel">
          <div className="channel-details">
            <div className="flex gap-4">
              <img
                className="h-24 rounded-md"
                src={channel.labelImage}
                alt={`${channel.channelName} label`}
              />
              <div className="flex flex-col gap-1.5">
                <Label>Channel Name - {channel.channelName}</Label>
                <Label>
                  <strong>Author:</strong> {channel.author.name}
                </Label>
                <Label>
                  <strong>Visibility:</strong> {channel.visibility}
                </Label>
                <Label>
                  <strong></strong>
                  {new Date(channel.createdAt).toLocaleString()}
                </Label>
                <Label>
                  <strong>Content Count:</strong> {channel.contentCount}
                </Label>
              </div>
            </div>
            <Label>
              <strong>Bio:</strong> {channel.bio}
            </Label>
          </div>
        </div>
        <ChannelStories channelId={params.channelId} />
      </div>
    </div>
  );
};
export default page;
