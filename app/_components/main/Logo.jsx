"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "light") {
    return (
      <Link href="/" className="font-semibold flex items-center gap-1">
        <img src="/somana-logo.png" className="h-10 brightness-125" />
      </Link>
    );
  }
  if (resolvedTheme === "dark") {
    return (
      <Link href="/" className="font-semibold flex items-center gap-1">
        <img src="/somana-logo-dark.png" className="h-10 brightness-125" />
      </Link>
    );
  }
};
export default Logo;
