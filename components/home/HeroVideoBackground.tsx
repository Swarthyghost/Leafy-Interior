"use client";

import { useEffect, useRef } from "react";

export default function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // A touch slower than real time reads as more cinematic and less frantic.
      video.playbackRate = 0.6;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/7292469-uhd_2160_3840_24fps.mp4" type="video/mp4" />
    </video>
  );
}
