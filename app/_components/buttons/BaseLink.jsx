import Link from "next/link";

const BaseLink = ({ href = "#", className, children }) => {
  return (
    <Link
      href={href}
      className={`${className} w-fit bg-black flex items-center gap-1 text-sm z-auto text-white font-medium py-2 px-3 rounded-md`}
    >
      {children}
    </Link>
  );
};

export default BaseLink;
