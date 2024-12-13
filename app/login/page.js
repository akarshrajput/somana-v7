import { GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import { signInAction, signInGithub } from "../_lib/actions";
import {
  BookOpen,
  Facebook,
  Github,
  LogIn,
  Music,
  Sparkle,
} from "lucide-react";
import { LoginCard } from "../_components/main/LoginCard";

const page = () => {
  return (
    <div className="flex justify-center mt-40 gap-10">
      <LoginCard />
      {/* <div className="flex flex-col w-96 gap-4 items-center bg-neutral-50 shadow-sm rounded-md p-10">
        <h1 className="text-4xl font-medium">Login</h1>
        <p className="text-sm flex items-center gap-1 font-medium">
          <LogIn size="10" strokeWidth="3" />
          Login to access Somana
        </p>
        <div className="flex w-full flex-col gap-2">
          <form
            action={signInAction}
            className="flex items-center text-center justify-center w-full"
          >
            <button
              size="lg"
              className="w-full text-neutr font-medium bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200  shadow-sm flex justify-center items-center py-3 rounded-md gap-2"
            >
              <GooglePlayLogo weight="bold" />
              <span className="text-center">Google</span>
            </button>
          </form>
          <form
            action={signInGithub}
            className="flex items-center text-center justify-center w-full"
          >
            <button
              size="lg"
              className="w-full font-medium bg-neutral-900 text-neutral-50 shadow-sm flex justify-center items-center py-3 rounded-md gap-2"
            >
              <Github size="18" />
              <span className="text-center">GitHub</span>
            </button>
          </form>
          <form
            action={signInAction}
            className="flex items-center text-center justify-center w-full"
          >
            <button
              disabled={true}
              size="lg"
              className="w-full font-medium bg-blue-700 text-neutral-50 shadow-sm flex justify-center items-center py-3 rounded-md gap-2"
            >
              <Facebook size="18" />
              <span className="text-center">FaceBook</span>
            </button>
          </form>
        </div>
        <p className="text-sm text-center">
          By logging in you agree to the{" "}
          <span className="text-green-600 font-medium hover:underline cursor-pointer">
            Terms
          </span>{" "}
          and{" "}
          <span className="text-green-600 font-medium hover:underline cursor-pointer">
            Condition
          </span>
        </p>
      </div> */}
      {/* <div className="flex flex-col w-96 gap-4 items-center bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200  shadow-sm rounded-md p-10">
        <h1 className="text-2xl flex items-center gap-2 font-medium">
          Welcome to Somana
          <Sparkle size="20" strokeWidth="3" />
        </h1>
        <div className="font-medium flex flex-col gap-2 items-center">
          <p>Explore</p>
          <p className="text-sm">Stories, Music, Podcasts and more</p>
        </div>
      </div> */}
    </div>
  );
};

export default page;
