"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SpinnerMain from "../main/SpinnerMain";
import StoryInfo1 from "./StoryInfo1";
import StoryGridSkeleton from "./StoryGridSkeleton";

// Fetch blogs with a simple query
const fetchBlogs = async () => {
  const res = await axios.get(`/api/v1/blogs?limit=9`);
  return res?.data?.data;
};

const StoryGrid = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="dark:bg-black dark:text-white">
      {isLoading ? (
        <StoryGridSkeleton /> // Show Skeleton Loader when loading
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data?.blogs?.map((post) => (
            <StoryInfo1 key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryGrid;
