"use client";
import supabase from "@/app/_lib/supabase";
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

    const imageName = `${Math.random()}-${Date.now()}-${labelImage.name}`;
    const imagePath = `${supabaseURL}/storage/v1/object/public/channel-labels/${imageName}`;
    await supabase.storage.from("channel-labels").upload(imageName, labelImage);

    const data = {
      channelName: channelName,
      bio: bio,
      visibility: visibility,
      labelImage: imagePath,
      author: session?.user?.userId,
    };

    try {
      const response = await axios.post("/api/v1/channels", data);
      console.log(response);
      const channelId = response?.data?.data?.newChannel?.id;
      console.log(channelId);
      router.push(`/mychannel/${channelId}`);
      toast({
        title: "Error",
        description: "Error creating channel",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
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
        description: "Error creating channel",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="text-sm font-medium flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label>Channel Name</label>
        <input
          type="text"
          className="bg-neutral-100 border font-normal outline-none rounded-md w-96 p-1.5"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Bio</label>
        <textarea
          rows={8}
          className="bg-neutral-100 border resize-none font-normal outline-none rounded-md w-96 p-1.5"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Visibility</label>
        <select
          className="bg-neutral-100 border resize-none font-normal outline-none rounded-md w-fit p-1.5"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label>Label Image</label>
        <input
          type="file"
          className="bg-neutral-100 border w-fit font-normal outline-none rounded-md p-1.5"
          onChange={(e) => setLabelImage(e.target.files[0])}
        />
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
