"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query"; // Updated import
import SpinnerMain from "../main/SpinnerMain";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import UpdateUsername from "./UpdateUsername";
// import LoadingMain from "../main/Loading";

const fetchUserData = async (userId) => {
  const response = await axios.get(`/api/v1/users/${userId}`);
  return response.data.data;
};

const CurrentUserProfile = ({ session }) => {
  const userId = session.user.userId;
  // const toast = useToast();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserData(userId),
    enabled: !!userId, // Only run the query if userId is available
    staleTime: 5000, // Optional: keep data fresh for 5 seconds
  });

  const mutation = useMutation({
    mutationFn: (userData) => {
      return axios.patch(`/api/v1/users/${userId}`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      // toast({
      //   title: "Success!",
      //   description: "User data updated.",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      // });
      console.log("Success");
    },
    onError: () => {
      // toast({
      //   title: "Fail!",
      //   description: "User data not updated.",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      // });
      console.log("Error");
    },
  });

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    photo: "",
    mobileNumber: "",
    bio: "",
    status: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    qualification: "",
    studiedFrom: "",
    nickname: "",
    maritalStatus: "",
    company: "",
    subscription: false,
    dob: "",
    accountType: "",
  });

  useEffect(() => {
    if (user) {
      setUserProfile(user);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserProfile((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(userProfile);
  };

  if (isLoading) return <SpinnerMain />;

  if (isError) {
    // toast({
    //   title: "Error",
    //   description: "Facing error!",
    //   status: "error",
    //   duration: 3000,
    //   isClosable: true,
    // });
    return <div>Error fetching user data!</div>;
  }

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="customised-input flex flex-col text-sm gap-4 rounded-md w-full"
      >
        <img
          src={userProfile.photo}
          alt={`${userProfile.name}'s profile`}
          className="w-36 h-36 rounded-lg border border-stone-300"
        />
        {/* <UpdateUsername userId={userId} userName={userProfile.userName} /> */}

        <div className="flex items-center gap-4">
          <Label>{userProfile.name}</Label>
          <Label> @{userProfile.userName}</Label>
          <Label>
            Subscription : {userProfile.subscription ? "Yes" : "No"}
          </Label>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <Label>Bio</Label>
            <Textarea
              name="bio"
              rows={4}
              value={userProfile.bio}
              onChange={handleInputChange}
              className="resize-none"
            />
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>Mobile Number</Label>
              <Input
                type="text"
                name="mobileNumber"
                value={userProfile.mobileNumber}
                onChange={handleInputChange}
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>Status</Label>
              <Input
                type="text"
                name="status"
                value={userProfile.status}
                onChange={handleInputChange}
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>Gender</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "gender", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={userProfile.city}
                onChange={handleInputChange}
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>State</Label>
              <Input
                type="text"
                name="state"
                value={userProfile.state}
                onChange={handleInputChange}
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={userProfile.country}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>Occupation</Label>
              <Input
                type="text"
                name="occupation"
                value={userProfile.occupation}
                onChange={handleInputChange}
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>Qualification</Label>
              <Input
                type="text"
                name="qualification"
                value={userProfile.qualification}
                onChange={handleInputChange}
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>School / College</Label>
              <Input
                type="text"
                name="studiedFrom"
                value={userProfile.studiedFrom}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>Nickname</Label>
              <Input
                type="text"
                name="nickname"
                value={userProfile.nickname}
                onChange={handleInputChange}
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>Martial Status</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "maritalStatus", value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Marital Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="relationship">Relationship</SelectItem>
                </SelectContent>
              </Select>
            </label>
            <label className="flex flex-col gap-1">
              <Label>Company / Work</Label>
              <Input
                type="text"
                name="company"
                value={userProfile.company}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Date of Birth
              </span>
              <input
                type="date"
                name="dob"
                value={userProfile.dob}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700  antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>Account Type</Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "accountType", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </div>
        </div>
        <Button className="w-fit" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default CurrentUserProfile;
