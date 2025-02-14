import CreateChannel from "@/app/_components/channelComponents/CreateChannel";
import Warning from "@/app/_components/main/Warning";
import { auth } from "@/app/_lib/auth";

const Page = async () => {
  const session = await auth();
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (session.user.role === "user") {
    return (
      <div className="mt-20">
        <Warning
          heading="No permission!"
          description="You do not have a permission to create channel."
        />
      </div>
    );
  }

  return (
    <div className="px-2 py-2 flex justify-center mt-20">
      <div className="w-[1200px]">
        <CreateChannel session={session} supabaseURL={supabaseURL} />
      </div>
    </div>
  );
};

export default Page;
