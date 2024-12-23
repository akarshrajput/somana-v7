"use client";
import supabase from "@/app/_lib/supabase";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateChannel = ({ session, supabaseURL }) => {
  const { toast } = useToast();
  const [channelName, setChannelName] = useState("");
  const [bio, setBio] = useState("");
  const [visibility, setVisibility] = useState("public"); // Default value
  const [labelImage, setLabelImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);

    // Check for empty fields
    if (!channelName || !bio || !labelImage) {
      toast({
        title: "Error",
        description: "All fields are required to create a channel.",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
      setLoading(false);
      return;
    }

    try {
      // Upload image to Supabase
      const imageName = `${Math.random()}-${Date.now()}-${labelImage.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("channel-labels")
        .upload(imageName, labelImage);

      if (uploadError) {
        throw new Error("Failed to upload label image.");
      }

      const imagePath = `${supabaseURL}/storage/v1/object/public/channel-labels/${imageName}`;

      // Create channel data
      const data = {
        channelName: channelName,
        bio: bio,
        visibility: visibility,
        labelImage: imagePath,
        author: session?.user?.userId,
      };

      // API call to create channel
      const response = await axios.post("/api/v1/channels", data);
      const channelId = response?.data?.data?.newChannel?.id;

      // Navigate to the created channel
      router.push(`/mychannel/${channelId}`);

      // Success toast
      toast({
        title: "Success",
        description: "Channel created successfully!",
        action: <ToastAction altText="View Channel">View</ToastAction>,
      });

      // Reset the form
      setChannelName("");
      setBio("");
      setVisibility("public");
      setLabelImage(null);
    } catch (error) {
      console.error("Error uploading data:", error);
      toast({
        title: "Error",
        description: error.message || "Error creating channel.",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="text-sm w-96 font-medium flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label>Channel Name</label>
        <Input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Enter channel name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Bio</label>
        <Textarea
          rows={8}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="resize-none"
          placeholder="Enter channel bio"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Visibility</label>
        <Select
          value={visibility}
          onValueChange={(value) => setVisibility(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label>Label Image</label>
        <Input type="file" onChange={(e) => setLabelImage(e.target.files[0])} />
      </div>
      <button
        type="submit"
        className="bg-black text-white p-1 px-2 rounded-md w-fit"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default CreateChannel;
