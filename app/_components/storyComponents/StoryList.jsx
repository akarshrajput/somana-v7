"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { BookOpen, Sparkle, SealCheck } from "@phosphor-icons/react";
import { Rubik } from "next/font/google";
import SpinnerMain from "../main/SpinnerMain";
import StoryInfo1 from "./StoryInfo1";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const StoryList = ({ session, apiLimit = 10 }) => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/api/v1/blogs?authorID=${session.user.userId}&limit=${apiLimit}`
        );
        setBlogs(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <SpinnerMain />;
  }

  if (error) {
    return <div className="text-red-500">Login and write some Stories</div>;
  }

  return (
    <div className="dark:bg-black dark:text-stone-50 mx-auto">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
        {blogs?.blogs?.map((post) => (
          <StoryInfo1 post={post} />
        ))}
      </div>
    </div>
  );
};

export default StoryList;
