import BaseLink from "../_components/buttons/BaseLink";

export default function Page() {
  return (
    <div className="px-2 flex justify-center mt-24">
      <div className="w-[800px] text-center space-y-8">
        <h1 className="text-xl font-bold mb-8">Upload here</h1>
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-start text-sm mb-2">
              <p>Unveil a story that the world has yet to hear.</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-neutral-400">1.</p>
              <BaseLink href="/story/write">Write Story</BaseLink>
            </div>
          </div>
          <div>
            <div className="text-start text-sm mb-2">
              <p>Transform emotions into melodies and rhythms.</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-neutral-400">2.</p>
              <BaseLink href="/music/upload">Upload music</BaseLink>
            </div>
          </div>
          <div>
            <div className="text-start text-sm mb-2">
              <p>Spark conversations that matter.</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-neutral-400">3.</p>
              <BaseLink href="/podcast/upload">Upload Podcast</BaseLink>
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
