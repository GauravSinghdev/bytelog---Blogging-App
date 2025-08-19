import Link from "next/link";
import React from "react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About"
}

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto flex flex-col gap-5 min-h-screen items-center mt-20">
      <div className="flex flex-col gap-2 items-center text-2xl">
        Visit my portfolio here{" "}
        <span>
          <Link
            href={"https://codewithkara.com/"}
            target="_blank"
            className="underline text-primary duration-300"
          >
            codewithkara
          </Link>
        </span>
      </div>
    </main>
  );
}
