"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "@phosphor-icons/react";
import BlogDate from "./BlogDate";
// import { Spinner } from "@chakra-ui/react";

const BlogComments = ({ hostname, blogId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogComments = async () => {
    try {
      const res = await axios.get(`/api/v1/comments?blogId=${blogId}&limit=5`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      setComments(res.data.data.comments);
      setLoading(false);
    } catch (err) {
      setError(err.message || "An error occurred while fetching comments.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogComments();
  }, [blogId]);

  if (loading)
    return (
      <div>
        {/* <Spinner size="md" /> */}
        <p>Loading</p>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-2 bg-white rounded-md">
      {/* <h2 className="flex items-center gap-2 font-medium mb-4 text-md text-stone-700 dark:text-stone-200">
        Comments <ArrowRight />
      </h2> */}
      <div className="flex flex-col gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))
        ) : (
          <p className="text-stone-600">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-4 p-2 font-medium  rounded-md">
      <div className="h-10 w-10 flex-shrink-0">
        <img
          src={comment.author.photo}
          className="h-full w-full rounded-full object-cover"
          alt={`${comment.author.name}'s profile`}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-stone-800 ">
            {comment.author.name}
          </p>
          <div className="text-sm text-stone-500">
            <BlogDate blogDate={comment.createdAt}></BlogDate>
          </div>
        </div>
        <p className="text-sm text-stone-600  mt-1">{comment.content}</p>
      </div>
    </div>
  );
};

export default BlogComments;