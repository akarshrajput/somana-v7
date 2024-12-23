import { useEffect, useState } from "react";
import ChannelStories from "./ChannelStories";
import axios from "axios";
import { Label } from "@/components/ui/label";

const ChannelDetails = ({ channelId }) => {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/channels/${channelId}`);
        console.log(response);
        setChannel(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message); // Improved error handling
      } finally {
        setLoading(false);
      }
    };

    if (channelId) {
      fetchChannelData();
    }
  }, [channelId]);

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
    <div className="edit-channel">
      <div className="channel-details">
        <div className="my-2">
          <Label>Edit channel - {channel.channelName}</Label>
        </div>
        <div className="flex gap-4">
          <img
            className="max-h-32 max-w-64 rounded-md border"
            src={channel.labelImage}
            alt={`${channel.channelName} label`}
          />
          <div className="flex flex-col gap-1.5">
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
        <div className="mt-2">
          <Label>
            <strong>Bio:</strong> {channel.bio || "No bio available."}{" "}
          </Label>
        </div>
      </div>
      <ChannelStories channelId={channelId} />
    </div>
  );
};

export default ChannelDetails;
