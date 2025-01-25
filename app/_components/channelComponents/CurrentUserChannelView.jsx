import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const CurrentUserChannelView = ({ session }) => {
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
      <div>
        <Link href="/mychannel/create">
          <Button>Create</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Label>Your Channels</Label>
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
    </div>
  );
};

const Channel = ({ channel }) => {
  return (
    <Link href={`mychannel/${channel?.id}`} className="border rounded-md p-2">
      <div className="flex justify-center w-full overflow-hidden h-24 md:h-24 rounded-sm">
        <img
          src={channel?.labelImage}
          className="w-full h-full hover:scale-105 object-cover rounded-md hover:rounded-sm duration-300"
          alt="Featured Image"
        />
      </div>
      <p className="font-medium text-sm mt-2">{channel.channelName}</p>
    </Link>
  );
};

export default CurrentUserChannelView;
