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
    <div className="mx-auto p-1">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src={userProfile.photo}
          alt={`${userProfile.name}'s profile`}
          className="w-24 h-24 rounded-md border border-gray-300 dark:border-gray-600"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {userProfile.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{userProfile.userName}
          </p>
          <p className="text-sm  dark:text-gray-300">
            Subscription: {userProfile.subscription ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium dark:text-gray-300">Bio</h3>
          <textarea
            rows={4}
            readOnly
            className="mt-1 w-full outline-none cursor-default resize-none p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-sm  dark:text-gray-400"
          >
            {userProfile.bio || "No bio available"}
          </textarea>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <InfoCard label="Mobile" value={userProfile.mobileNumber} />
          <InfoCard label="Status" value={userProfile.status} />
          <InfoCard label="Gender" value={userProfile.gender} />
          <InfoCard label="City" value={userProfile.city} />
          <InfoCard label="State" value={userProfile.state} />
          <InfoCard label="Country" value={userProfile.country} />
          <InfoCard label="Occupation" value={userProfile.occupation} />
          <InfoCard label="Qualification" value={userProfile.qualification} />
          <InfoCard label="Studied From" value={userProfile.studiedFrom} />
          <InfoCard label="Nickname" value={userProfile.nickname} />
          <InfoCard label="Marital Status" value={userProfile.maritalStatus} />
          <InfoCard label="Company" value={userProfile.company} />
          <InfoCard label="Account Type" value={userProfile.accountType} />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium dark:text-gray-300">
          Date of Birth
        </label>
        <input
          type="date"
          disabled
          value={userProfile.dob}
          className="mt-1 w-full bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm  dark:text-gray-400 border border-gray-300 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => {
  return (
    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md  dark:text-gray-400 text-sm">
      <h4 className="font-medium dark:text-gray-300">{label}</h4>
      <p>{value || "N/A"}</p>
    </div>
  );
};

export default UserProfile;
