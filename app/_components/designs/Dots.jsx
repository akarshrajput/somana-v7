"use client";

import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export function Dots({ children }) {
  return (
    <div className="flex size-full items-center justify-center overflow-hidden p-20">
      {children}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
}
export default Dots;
