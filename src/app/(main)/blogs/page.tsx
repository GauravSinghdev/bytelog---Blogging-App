// page.tsx or page.js under /blogs
import React, { Suspense } from "react";
import AllBlogComp from "./AllBlogComp";

export default function AllBlogPage() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-5 min-h-screen">
      <Suspense fallback={<div>Loading blogs...</div>}>
        <AllBlogComp />
      </Suspense>
    </main>
  );
}
