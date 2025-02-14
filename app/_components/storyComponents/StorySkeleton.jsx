export default function StorySkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>

      {/* Metadata Skeleton */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-60 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>

      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex space-x-4 mt-6">
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Comments Section Skeleton */}
      <div className="mt-8 space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}
