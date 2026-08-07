"use client";

import { useEffect } from "react";
import mediumZoom from "medium-zoom";

export function ImageZoomHandler() {
  useEffect(() => {
    const zoom = mediumZoom(".prose-custom img", {
      margin: 24,
      background: "rgba(0, 0, 0, 0.9)",
    });

    return () => {
      zoom.detach();
    };
  }, []);

  return null;
}
