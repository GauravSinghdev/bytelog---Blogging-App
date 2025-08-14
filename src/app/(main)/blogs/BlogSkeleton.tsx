import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

export function BlogSkeleton() {
  return (
    <div className="border w-full rounded p-2 flex flex-col gap-1 animate-pulse backdrop-blur-sm">
      <div className="flex flex-col items-start divide-y-2 w-full h-full divide-gray-200 dark:divide-gray-800">
        {/* User info */}
        <div className="flex gap-2 w-full py-1 items-center">
          <Avatar className="border-2 bg-gray-300 dark:bg-gray-700 w-10 h-10">
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
        </div>

        {/* Blog content */}
        <div className="ml-12 flex flex-col py-2 gap-2">
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}
