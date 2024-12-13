import Link from "next/link";
import MyChannels from "../_components/channelComponents/MyChannels";
import { auth } from "../_lib/auth";

const page = async () => {
  const session = await auth();
  return (
    <div className="px-2 py-2 flex justify-center mt-20">
      <div className="w-[1200px]">
        <Link
          href="/mychannel/create"
          className="bg-black py-2 font-medium px-4 rounded-md text-white"
        >
          Create New
        </Link>
        <div>
          <MyChannels session={session} />
        </div>
      </div>
    </div>
  );
};
export default page;
