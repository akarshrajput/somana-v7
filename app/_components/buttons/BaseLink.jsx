import Link from "next/link";

const BaseLink = ({ href = "#", target = "", className, children }) => {
  return (
    <Link
      href={href}
      target={target}
      className={`${className} w-fit dark:bg-neutral-900 bg-neutral-100 flex items-center gap-1 border text-sm z-auto hover:scale-105 duration-300  font-medium py-1.5 px-3 rounded-sm`}
    >
      {children}
    </Link>
  );
};

export default BaseLink;
