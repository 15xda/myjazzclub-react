import { useState, useEffect } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    // Artificially stretching time to 3 seconds to show our cool loader :), else doing nothing.

    const handleLoad = () => {
      const now = Date.now();
      const diff = now - startTime;
      const remaining = Math.max(0, 3000 - diff);

      setTimeout(() => {
        setLoading(false);
      }, remaining);
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      window.addEventListener("DOMContentLoaded", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("DOMContentLoaded", handleLoad);
    };
  }, []);

  return { loading };
}
