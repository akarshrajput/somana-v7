"use client";
import { Button } from "@/components/ui/button";
import { Fullscreen, FullscreenIcon, MoveDownIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const IframeViewer = ({ fileLinks }) => {
  const [fullscreenIframe, setFullscreenIframe] = useState(null);
  const iframeRefs = useRef([]);

  // Function to handle fullscreen toggle
  const handleFullscreenToggle = (index) => {
    if (fullscreenIframe === index) {
      // Exit fullscreen
      setFullscreenIframe(null);
      document.exitFullscreen();
    } else {
      // Enter fullscreen
      setFullscreenIframe(index);
      if (iframeRefs.current[index]) {
        iframeRefs.current[index].requestFullscreen();
      }
    }
  };

  // Effect to listen for 'fullscreenchange' to track fullscreen status
  useEffect(() => {
    const handleFullscreenChange = () => {
      // Check if the document is in fullscreen mode
      if (!document.fullscreenElement) {
        setFullscreenIframe(null); // Exit fullscreen
      }
    };

    // Add fullscreenchange event listener
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Modify iframe height dynamically based on fullscreen status
  const modifiedFileLinks = fileLinks.replace(
    /<iframe /g,
    `<iframe style="width: 100%; height: ${
      fullscreenIframe !== null ? "100vh" : "500px"
    };" `
  );

  return (
    <div className="relative w-full mt-12">
      <div className="text-xs text-yellow-800 dark:text-yellow-400">
        <p>- Adjust document size by yourself</p>
        <p>- Document take some time to load so please wait for some seconds</p>
        <p>- To remove ADS : Go to Fullscreen</p>
      </div>

      {fileLinks.length > 0 && (
        <div className="w-full flex flex-col gap-4 mt-2">
          <div>
            <p className="flex items-center gap-4">
              PDF below <MoveDownIcon size={14} />
            </p>
          </div>
          {modifiedFileLinks
            .split(/(?=<iframe )/) // Split the string at each `<iframe` tag
            .map((file, index) => {
              const isFullscreen = fullscreenIframe === index;
              return (
                <div
                  key={index}
                  className="relative border rounded-md overflow-hidden"
                >
                  {!isFullscreen && (
                    <div style={{ zIndex: isFullscreen ? 100 : "auto" }}>
                      <div className="absolute bottom-0 right-0">
                        <div className="flex items-end">
                          <div className="bg-white w-16 h-6"></div>
                          <button
                            className=" p-0.5 dark:bg-black dark:text-white bg-neutral-200 hover:bg-neutral-300 border"
                            variant="outline"
                            onClick={() => handleFullscreenToggle(index)}
                          >
                            <FullscreenIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={`transition-all duration-300 ${
                      isFullscreen
                        ? "absolute top-0 left-0 bottom-0 right-0 w-full h-full z-50 bg-black bg-opacity-70"
                        : ""
                    }`}
                  >
                    <div
                      ref={(el) => (iframeRefs.current[index] = el)}
                      dangerouslySetInnerHTML={{ __html: file }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default IframeViewer;
