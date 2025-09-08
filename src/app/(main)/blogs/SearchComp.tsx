"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
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
    }, 500);

    return () => {
      clearTimeout(handler);
  };
  }, [localValue, setQuery]);

  const handleSearch = () => {
    setQuery(localValue);
    console.log("Searching for:", localValue);
  };

  const handleClear = () => {
    setLocalValue("");
    setQuery("");
  };

  return (
    <div className="w-full lg:w-2/5 ml-4 md:ml-0 relative backdrop-blur-sm">
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
        onClick={localValue ? handleClear : handleSearch}
        className="absolute top-1.5 right-2 cursor-pointer"
      >
        {localValue ? <X /> : <Search />}
      </button>
    </div>
  );
}
