import CurrentUserProfile from "../_components/userComponents/CurrentUserProfile";
import { auth } from "../_lib/auth";

const Page = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col items-center">
      <div className="w-[1200px] px-2 mt-4">
        <CurrentUserProfile session={session} />
      </div>
    </div>
  );
};

export default Page;
