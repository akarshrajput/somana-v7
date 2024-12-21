"use client";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/channels/${params.channelId}`);
        const data = await response.json();
        if (data.status === "success") {
          setChannel(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch channel details");
        }
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
      <div className="channel-content">
        <h3>Stories</h3>
        {channel.stories.length ? (
          <ul>
            {channel.stories.map((story, index) => (
              <li key={index}>{story}</li>
            ))}
          </ul>
        ) : (
          <p>No stories available.</p>
        )}
        <h3>Tracks</h3>
        {channel.tracks.length ? (
          <ul>
            {channel.tracks.map((track, index) => (
              <li key={index}>{track}</li>
            ))}
          </ul>
        ) : (
          <p>No tracks available.</p>
        )}
        <h3>Podcasts</h3>
        {channel.podcasts.length ? (
          <ul>
            {channel.podcasts.map((podcast, index) => (
              <li key={index}>{podcast}</li>
            ))}
          </ul>
        ) : (
          <p>No podcasts available.</p>
        )}
      </div>
    </div>
  );
};

export default page;
