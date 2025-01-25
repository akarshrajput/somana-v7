import Link from "next/link";

const BaseLink = ({ href = "#", className, children }) => {
  return (
    <Link
      href={href}
      className={`${className} w-fit bg-neutral-200 flex items-center gap-1 text-sm z-auto hover:scale-105 duration-300  font-medium py-1.5 px-2 rounded-md`}
    >
      {children}
    </Link>
  );
};

export default BaseLink;
