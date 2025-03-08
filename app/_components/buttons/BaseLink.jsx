import Link from "next/link";

const BaseLink = ({ href = "#", className, children }) => {
  return (
    <Link
      href={href}
      className={`${className} w-fit bg-neutral-100 flex items-center gap-1 border text-sm z-auto hover:scale-105 duration-300  font-medium py-1.5 px-3 rounded-sm`}
    >
      {children}
    </Link>
  );
};

export default BaseLink;
