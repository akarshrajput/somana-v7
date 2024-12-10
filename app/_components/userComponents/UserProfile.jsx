"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SpinnerMain from "../main/SpinnerMain";

const UserProfile = ({ username }) => {
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/v1/users/userName/${username}`);
        setUserProfile(res.data?.data || {});
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [username]);

  if (isLoading) return <SpinnerMain />;
  console.log(userProfile);

  return (
    <div className="flex flex-col mt-24">
      <div className="customised-input flex flex-col text-sm gap-4 rounded-md w-full">
        <img
          src={userProfile.photo}
          alt={`${userProfile.name}'s profile`}
          className="w-36 h-36 rounded-lg border-4 border-stone-300"
        />

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
              readOnly={true}
              className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 resize-none antialiased px-2 py-1.5 border rounded-md"
            />
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Mobile Number
              </span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.mobileNumber}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Status</span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.status}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Gender</span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.gender}
              </p>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">City</span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.city}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">State</span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.state}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Country</span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.country}
              </p>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Occupation
              </span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.occupation}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Qualification
              </span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.qualification}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Studied From
              </span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.studiedFrom}
              </p>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Nickname</span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 antialiased px-2 py-1 border rounded-md">
                {userProfile.nickname}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Marital Status
              </span>
              <p
                className="bg-stone-100 
                antialiased px-2 py-1 border dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 rounded-md"
              >
                {userProfile.maritalStatus}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">Company</span>
              <p className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700  antialiased px-2 py-1 border rounded-md">
                {userProfile.company}
              </p>
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
                disabled={true}
                value={userProfile.dob}
                className="bg-stone-100 dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700  antialiased px-2 py-1 border rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 dark:text-stone-50">
                Account Type
              </span>
              <p
                className="bg-stone-100 
                antialiased px-2 py-1 border dark:bg-stone-800 dark:text-stone-50 dark:border-stone-700 rounded-md"
              >
                {userProfile.accountType}
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
