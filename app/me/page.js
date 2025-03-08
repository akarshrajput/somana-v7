import Warning from "../_components/main/Warning";
import { CurrentProfileTabSwitcher } from "../_components/userComponents/CurrentProfileTabSwitcher";
import { auth } from "../_lib/auth";

const Page = async () => {
  const session = await auth();
  if (!session?.user) {
    return <Warning heading="Login to Access Your Profile" />;
  }
  return (
    <div className="flex flex-col items-center mt-2">
      <div className="w-full">
        <CurrentProfileTabSwitcher session={session} />
      </div>
    </div>
  );
};

export default Page;
