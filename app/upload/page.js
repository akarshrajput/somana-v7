import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "../_lib/auth";
import Warning from "../_components/main/Warning";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return <Warning heading="Login to upload" />;
  }
  return (
    <div className="flex justify-center mt-2">
      <div className="max-w-[600px] w-full text-center space-y-8">
        <h1 className="text-xl font-bold mb-8">Upload here</h1>
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-start text-sm mb-2">
              <p className="font-medium">
                Unveil a story that the world has yet to hear.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="px-2">
                <Link href="/story/write">Write Story</Link>
              </Button>
            </div>
          </div>
          <div>
            <div className="text-start text-sm mb-2">
              <p className="font-medium">
                Transform emotions into melodies and rhythms.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="px-2">
                <Link href="/music/upload">Upload music</Link>
              </Button>
            </div>
          </div>
          <div>
            <div className="text-start text-sm mb-2">
              <p className="font-medium">Spark conversations that matter.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="px-2">
                <Link href="/podcast/upload">Upload Podcast</Link>
              </Button>
            </div>
          </div>
          {/* <div>
            <div className="text-start text-sm mb-2">
              <p>Bring your cinematic dreams to the screen.</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-neutral-400">4.</p>
              <BaseLink href="/story/write">Write Story</BaseLink>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
