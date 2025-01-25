"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SpinnerMain from "../main/SpinnerMain";
import { Label } from "@/components/ui/label";

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
    <div className="flex flex-col">
      <div className="customised-input flex flex-col text-sm gap-4 rounded-md w-full">
        <img
          src={userProfile.photo}
          alt={`${userProfile.name}'s profile`}
          className="w-36 h-36 rounded-lg border border-stone-300"
        />

        <div className="flex items-center gap-4">
          <Label>{userProfile.name}</Label>
          <Label>@{userProfile.userName}</Label>
          <Label>
            Subscription : {userProfile.subscription ? "Yes" : "No"}
          </Label>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <Label>Bio</Label>
            <textarea
              name="bio"
              rows={4}
              value={userProfile.bio}
              readOnly={true}
              className="p-2 px-3 border rounded-md resize-none outline-none"
            />
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>Mobile Number</Label>
              <p className="p-2 px-3 border rounded-md">
                {userProfile.mobileNumber}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <Label>Status</Label>
              <p className="p-2 px-3 border rounded-md">{userProfile.status}</p>
            </label>
            <label className="flex flex-col gap-1">
              <Label>Gender</Label>
              <p className="p-2 px-3 border rounded-md">{userProfile.gender}</p>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>City</Label>
              <p className="p-2 px-3 border rounded-md">{userProfile.city}</p>
            </label>
            <label className="flex flex-col gap-1">
              <Label>State</Label>
              <p className="p-2 px-3 border rounded-md">{userProfile.state}</p>
            </label>
            <label className="flex flex-col gap-1">
              <Label>Country</Label>
              <p className="p-2 px-3 border rounded-md">
                {userProfile.country}
              </p>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>Occupation</Label>
              <p className="p-2 px-3 border rounded-md">
                {userProfile.occupation}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <Label>Qualification</Label>
              <p className="p-2 px-3 border rounded-md">
                {userProfile.qualification}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <Label>Studied From</Label>
              <p className="p-2 px-3 border rounded-md">
                {userProfile.studiedFrom}
              </p>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>Nickname</Label>
              <p className="p-2 px-3 border rounded-md">
                {userProfile.nickname}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <Label>Marital Status</Label>
              <p className="p-2 px-3 border rounded-md">
                {userProfile.maritalStatus}
              </p>
            </label>
            <label className="flex flex-col gap-1">
              <Label className="text-gray-700 dark:text-stone-50">
                Company
              </Label>
              <p className="p-2 px-3 border rounded-md">
                {userProfile.company}
              </p>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="flex flex-col gap-1">
              <Label>Date of Birth</Label>
              <input
                type="date"
                name="dob"
                disabled={true}
                value={userProfile.dob}
                className="p-2 px-3 border bg-white rounded-md"
              />
            </label>
            <label className="flex flex-col gap-1">
              <Label>Account Type</Label>
              <p className="p-2 px-3 border rounded-md">
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
