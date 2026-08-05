"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the real image if present under /public; otherwise falls back to a
 * gray placeholder box printing the expected path, so dropping the file in
 * later swaps it in automatically with no code change.
 */
export function ImagePlaceholder({
  src,
  alt,
  aspectClassName = "aspect-[3/2]",
  className = "",
}: {
  src: string;
  alt: string;
  aspectClassName?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // A local 404 can resolve before hydration attaches onError, so the native
    // error event fires and is lost — catch that already-failed state on mount.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#e6e6e6] text-[#777] text-xs px-4 text-center ${aspectClassName} ${className}`}
      >
        {src}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- arbitrary local files that may 404; needs the plain <img onError> fallback
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`object-cover ${aspectClassName} ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
