import EditChannel from "@/app/_components/channelComponents/EditChannel";
import { auth } from "@/app/_lib/auth";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const page = async ({ params }) => {
  const session = await auth();
  const channelId = params?.channelId;
  return (
    <div className="px-2 py-2 flex justify-center mt-20">
      <div className="w-[1200px]">
        <div>
          <EditChannel channelId={channelId} session={session} />
        </div>
      </div>
    </div>
  );
};
export default page;
