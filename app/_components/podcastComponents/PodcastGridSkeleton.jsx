"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ApplePodcastsLogo } from "@phosphor-icons/react/dist/ssr";

const PodcastGridSkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="relative rounded-md overflow-hidden bg-white dark:bg-neutral-900 border hover:shadow-md transition-shadow duration-300"
          >
            {/* Image Skeleton */}
            <Skeleton className="w-full h-20 aspect-square" />

            {/* Podcast Info Skeleton */}
            <div className="p-1.5">
              <Skeleton className="h-4 w-3/4 mb-1" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastGridSkeleton;
