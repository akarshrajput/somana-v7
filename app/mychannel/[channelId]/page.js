import EditChannel from "@/app/_components/channelComponents/EditChannel";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const page = ({ params }) => {
  const channelId = params?.channelId;
  return (
    <div className="px-2 py-2 flex justify-center mt-20">
      <div className="w-[1200px]">
        {/* <Link
          href={`/channel/${channelId}`}
          className="bg-sky-100 w-fit rounded-full py-1 px-4 text-sm font-semibold text-sky-600 flex items-center gap-1"
        >
          See Public view
          <Eye weight="bold" />
        </Link> */}
        <div>
          <EditChannel channelId={channelId} />
        </div>
      </div>
    </div>
  );
};
export default page;
