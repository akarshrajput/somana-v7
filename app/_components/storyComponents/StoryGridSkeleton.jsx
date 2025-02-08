import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse w-full flex flex-col rounded-lg shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-36 min-w-72 w-full bg-gray-200 dark:bg-neutral-700"></div>

      {/* Content Skeleton */}
      <div className="p-3 w-full">
        <div className="h-5 bg-gray-300 dark:bg-neutral-600 rounded w-full mb-2"></div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gray-300 dark:bg-neutral-600 rounded-md"></div>
          <div className="flex flex-col w-full">
            <div className="h-3.5 bg-gray-300 dark:bg-neutral-600 rounded w-3/4 mb-1"></div>
            <div className="h-2.5 bg-gray-300 dark:bg-neutral-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
      {[...Array(9)].map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </div>
  );
};

export default StoryGridSkeleton;
