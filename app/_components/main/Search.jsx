"use client";

import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Retrieves the value of "q"

  return <div>Query: {query}</div>;
}
