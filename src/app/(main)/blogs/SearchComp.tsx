"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

interface SearchCompProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchComp({ query, setQuery }: SearchCompProps) {
  const [localValue, setLocalValue] = useState(query);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(localValue); // update parent state after delay
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler); // clear on re-type
    };
  }, [localValue, setQuery]);

  const handleSearch = () => {
    setQuery(localValue); // force search immediately on click/enter
    console.log("Searching for:", localValue);
  };

  return (
    <div className="w-full ml-4 md:w-1/3 relative backdrop-blur-sm">
      <Input
        placeholder="search here . . ."
        className="pr-10"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="absolute top-1.5 right-2 cursor-pointer"
      >
        <Search />
      </button>
    </div>
  );
}
