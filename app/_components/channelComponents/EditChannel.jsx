"use client";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import AddStoryToChannel from "./AddStoryToChannel";
import Link from "next/link";
import { Eye } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const EditChannel = ({ channelId }) => {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/channels/${channelId}`);
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
        <div>
          <Link href={`/channel/${channelId}`}>
            <Button variant="outline">
              Public view <Eye weight="bold" />
            </Button>
          </Link>
        </div>
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
        {/* <Label>
          <strong>Bio:</strong> {channel.bio}
        </Label> */}
      </div>
      <div className="channel-content">
        {/* <h3>Stories</h3>
        {channel.stories.length ? (
          <ul>
            {channel.stories.map((story, index) => (
              <li key={index}>{story}</li>
            ))}
          </ul>
        ) : (
          <p>No stories available.</p>
        )} */}
        <div>
          <AddStoryToChannel channelId={channelId} />
        </div>
      </div>
    </div>
  );
};

export default EditChannel;
