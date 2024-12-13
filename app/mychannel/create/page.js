import CreateChannel from "@/app/_components/channelComponents/CreateChannel";
import { auth } from "@/app/_lib/auth";

const Page = async () => {
  const session = await auth();
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return (
    <div className="px-2 py-2 flex justify-center mt-20">
      <div className="w-[1200px]">
        <CreateChannel session={session} supabaseURL={supabaseURL} />
      </div>
    </div>
  );
};

export default Page;
