"use client"; // If using the app directory in Next.js 13+

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation"; // Use `next/navigation` for client-side navigation in the app directory
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="rounded-full flex items-center bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-700 dark:text-neutral-300 pl-4 px-2 py-1 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="bg-inherit outline-none"
      />
      <button type="submit">
        <MagnifyingGlass
          weight="bold"
          className="bg-neutral-300  p-1.5 size-8 rounded-full"
        />
      </button>
    </form>
  );
}
