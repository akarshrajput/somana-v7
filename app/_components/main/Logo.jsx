"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "light") {
    return (
      <Link
        href="/"
        className="font-semibold border rounded-md shadow-sm p-1.5 flex items-center gap-1"
      >
        <img src="/somana-logo.png" className="h-6 brightness-125" />
      </Link>
    );
  }
  if (resolvedTheme === "dark") {
    return (
      <Link
        href="/"
        className="font-semibold border rounded-md shadow-sm p-1.5 flex items-center gap-1"
      >
        <img src="/somana-logo.png" className="h-6 invert brightness-125" />
      </Link>
    );
  }
};
export default Logo;
