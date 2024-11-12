"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query"; // Updated import
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

  if (isLoading) return <p>Loading</p>;

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
    <div className="flex flex-col mt-24">
      <form
        onSubmit={handleSubmit}
        className="customised-input flex flex-col text-sm gap-4 rounded-md w-full"
      >
        <img
          src={userProfile.photo}
          alt={`${userProfile.name}'s profile`}
          className="w-36 h-36 rounded-lg border-4 border-stone-300"
        />
        {/* <UpdateUsername userId={userId} userName={userProfile.userName} /> */}

        <div className="flex items-center gap-2">
          <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-4 py-1 border rounded-md">
            {userProfile.name}
          </p>
          <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-4 py-1 border rounded-md ">
            {userProfile.email}
          </p>
          <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-4 py-1 border rounded-md ">
            Subscription : {userProfile.subscription ? "Yes" : "No"}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-gray-700  dark:text-stone-50  ">Bio</span>
            <textarea
              name="bio"
              rows={4}
              value={userProfile.bio}
              onChange={handleInputChange}
              className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 resize-none antialiased px-2 py-1.5 border rounded-md"
            />
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Mobile Number
              </span>
              <input
                type="text"
                name="mobileNumber"
                value={userProfile.mobileNumber}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Status</span>
              <input
                type="text"
                name="status"
                value={userProfile.status}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Gender</span>
              <select
                name="gender"
                value={userProfile.gender}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">City</span>
              <input
                type="text"
                name="city"
                value={userProfile.city}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">State</span>
              <input
                type="text"
                name="state"
                value={userProfile.state}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Country</span>
              <input
                type="text"
                name="country"
                value={userProfile.country}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Occupation
              </span>
              <input
                type="text"
                name="occupation"
                value={userProfile.occupation}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Qualification
              </span>
              <input
                type="text"
                name="qualification"
                value={userProfile.qualification}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Studied From
              </span>
              <input
                type="text"
                name="studiedFrom"
                value={userProfile.studiedFrom}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Nickname</span>
              <input
                type="text"
                name="nickname"
                value={userProfile.nickname}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Marital Status
              </span>
              <select
                type="text"
                name="maritalStatus"
                value={userProfile.maritalStatus}
                onChange={handleInputChange}
                className="bg-stone-100 
                antialiased px-2 py-1 border dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 rounded-md"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="relationship">Relationship</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Company</span>
              <input
                type="text"
                name="company"
                value={userProfile.company}
                onChange={handleInputChange}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700  antialiased px-2 py-1 border rounded-md"
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
              <span className="text-gray-700 dark:text-stone-50">
                Account Type
              </span>
              <select
                type="text"
                name="accountType"
                value={userProfile.accountType}
                onChange={handleInputChange}
                className="bg-stone-100 
                antialiased px-2 py-1 border dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 rounded-md"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Personal">Personal</option>
                <option value="Organization">Organization</option>
              </select>
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white font-medium w-fit py-2 px-4 rounded-md mt-4"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default CurrentUserProfile;
