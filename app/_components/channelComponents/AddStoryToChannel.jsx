"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const AddStoryToChannel = ({ channelId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const { toast } = useToast();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/v1/blogs?heading=${searchQuery}&limit=10`
      );
      //   console.log(response.data.data.blogs);
      setSearchResults(response.data.data.blogs || []);
    } catch (err) {
      console.error("Error searching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStory = async (blogId) => {
    try {
      //   console.log(channelId, blogId);
      setLoading(true);
      const response = await axios.post("/api/v1/channels/addStory", {
        channelId,
        blogId,
      });

      toast({
        title: "Succcess",
        description: "Story added successfully.",
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
      setSearchQuery("");
      setSearchResults([]);
    } catch (err) {
      console.error("Error adding story to channel:", err);
      toast({
        title: "Error",
        description: `${err.response.data.message}`,
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-4">
      <h2 className="font-semibold mb-4">Add story to channel</h2>

      {/* Search Input */}
      <div className="mb-4 flex flex-col gap-2">
        <Label>Search Stories</Label>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter story title or keyword"
          className="w-96"
        />
        <Button
          onClick={handleSearch}
          disabled={loading || !searchQuery.trim()}
          className="w-fit"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      <ScrollArea className="h-72 w-full rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Result</h4>
          {searchResults.map((blog) => (
            <>
              <div className="flex">
                <div key={blog._id} className="text-sm">
                  <span className="text-sm">{blog.heading}</span>
                </div>
                <Button
                  className="ml-auto"
                  onClick={() => handleAddStory(blog._id)}
                >
                  Add
                </Button>
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>

      {/* No Results
      {searchQuery && !loading && searchResults.length === 0 && (
        <p className="text-sm text-gray-500">No stories found.</p>
      )} */}
    </div>
  );
};

export default AddStoryToChannel;
