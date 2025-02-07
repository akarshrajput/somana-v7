import { CurrentProfileTabSwitcher } from "../_components/userComponents/CurrentProfileTabSwitcher";
import { auth } from "../_lib/auth";

const Page = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col items-center mt-16">
      <div className="max-w-[1200px] py-2">
        <CurrentProfileTabSwitcher session={session} />
      </div>
    </div>
  );
};

export default Page;
