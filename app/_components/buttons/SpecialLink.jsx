const { default: Link } = require("next/link");

const SpecialLink = ({ href = "#", title = "Title" }) => {
  return (
    <Link className="text-sm hover:underline underline-offset-2" href={href}>
      {title}
    </Link>
  );
};

export default SpecialLink;
