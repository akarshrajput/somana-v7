import React from "react";

const StorySkeleton = () => {
  return (
    <div className="animate-pulse w-full block rounded-md border bg-white dark:bg-neutral-900 p-2 shadow-sm min-h-[120px]">
      {/* Author & Genre Skeleton */}
      <div className="flex items-center gap-1 mb-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 dark:bg-neutral-700 rounded-md"></div>
          <div className="h-3 w-16 bg-gray-300 dark:bg-neutral-700 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 dark:bg-neutral-700 rounded-full"></div>
        </div>
        <div className="h-3 w-5 bg-gray-300 dark:bg-neutral-700 rounded"></div>
        <div className="h-3 w-12 bg-gray-300 dark:bg-neutral-700 rounded"></div>
      </div>

      {/* Title Skeleton */}
      <div className="h-4 w-3/4 bg-gray-400 dark:bg-neutral-600 rounded mb-1"></div>

      {/* Description Skeleton */}
      <div className="h-3 w-full bg-gray-300 dark:bg-neutral-700 rounded mb-1"></div>
      <div className="h-3 w-5/6 bg-gray-300 dark:bg-neutral-700 rounded mb-1"></div>
      <div className="h-3 w-2/3 bg-gray-300 dark:bg-neutral-700 rounded"></div>
    </div>
  );
};

const StoryGridFullSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 w-full">
      {[...Array(20)].map((_, index) => (
        <StorySkeleton key={index} />
      ))}
    </div>
  );
};

export default StoryGridFullSkeleton;
