"use client";
import { Button } from "@/components/ui/button";
import { Fullscreen, FullscreenIcon } from "lucide-react";
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
    <div className="relative w-full">
      {fileLinks.length > 0 && (
        <div className="w-full flex flex-col gap-4 mt-12">
          {modifiedFileLinks
            .split(/(?=<iframe )/) // Split the string at each `<iframe` tag
            .map((file, index) => {
              const isFullscreen = fullscreenIframe === index;
              return (
                <div key={index} className="relative border rounded-md">
                  {!isFullscreen && (
                    <div style={{ zIndex: isFullscreen ? 100 : "auto" }}>
                      <button
                        className="absolute bottom-2 right-2 p-1 bg-stone-100 rounded-md border"
                        variant="outline"
                        onClick={() => handleFullscreenToggle(index)}
                      >
                        <FullscreenIcon />
                      </button>
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
