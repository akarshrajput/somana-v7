"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Trash } from "@phosphor-icons/react";
const DeleteButton = ({ blogId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const toast = useToast();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/v1/blogs/${blogId}`);
      if (response.status === 200) {
        router.push("/");
        // toast({
        //   title: "Story deleted!",
        //   description: "Story added successfully",
        //   status: "success",
        //   duration: 3000,
        //   isClosable: true,
        // });
        console.log("Story");
      }
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Error deleting story!",
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
      console.log("Erroe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button colorScheme="red" disabled={isLoading} onClick={handleDelete}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="flex text-sm font-semibold items-center gap-1 bg-red-600 text-white py-1 rounded-md px-2">
          <p>Delete</p>
          <Trash weight="bold" />
        </div>
      )}
    </button>
  );
};

export default DeleteButton;
