"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Trash } from "@phosphor-icons/react";
import { Button, Spinner, useToast } from "@chakra-ui/react";

const DeleteButton = ({ blogId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/v1/blogs/${blogId}`);
      if (response.status === 200) {
        router.push("/story");
        toast({
          title: "Story deleted!",
          description: "Story added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error deleting story!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button colorScheme="red" disabled={isLoading} onClick={handleDelete}>
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <div className="flex items-center gap-1">
          <p>Delete</p>
          <Trash weight="bold" />
        </div>
      )}
    </Button>
  );
};

export default DeleteButton;
