"use client";
import React, { useState } from "react";
import axios from "axios";
// import { useToast } from "@chakra-ui/react";

const AddComment = ({ session, hostname, blogId, authorId }) => {
  // const toast = useToast();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axios.post(
        `/api/v1/comments`,
        {
          content,
          blogId: blogId,
          author: authorId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);

      // toast({
      //   title: "Comment added",
      //   description: "Comment added successfully",
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      // });
    } catch (err) {
      // toast({
      //   title: "Error",
      //   description: "Comment not added",
      //   status: "error",
      //   duration: 2000,
      //   isClosable: true,
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-comment w-full max-w-3xl mx-auto p-4 bg-white  rounded-md">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <img className="size-10 rounded-full" src={`${session.user.photo}`} />
        <div className="w-full flex flex-col gap-2 border rounded-md p-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add your comment here..."
            className="font-medium p-1 outline-none resize-none rounded-md text-sm"
            rows="3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-sm w-fit ml-auto p-2 rounded-md text-white transition-all duration-300 hover:bg-green-700 disabled:bg-blue-300`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
