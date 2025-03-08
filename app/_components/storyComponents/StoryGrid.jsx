"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SpinnerMain from "../main/SpinnerMain";
import StoryInfo1 from "./StoryInfo1";
import StoryGridSkeleton from "./StoryGridSkeleton";

// Fetch blogs with a simple query
const fetchBlogs = async () => {
  const res = await axios.get(`/api/v1/blogs?limit=12`);
  return res?.data?.data;
};

const StoryGrid = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="dark:bg-black w-full dark:text-white">
      {isLoading ? (
        <StoryGridSkeleton /> // Show Skeleton Loader when loading
      ) : (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {data?.blogs?.map((post) => (
            <StoryInfo1 key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryGrid;
