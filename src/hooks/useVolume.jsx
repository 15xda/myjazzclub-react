import { useState, useEffect } from "react";

export default function useVolume({ changingVolume }) {
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("playerVolume");
    return savedVolume !== null ? parseInt(savedVolume) : 40;
  });

  useEffect(() => {
    if (typeof changingVolume === "number") {
      setVolume(changingVolume);
      localStorage.setItem("playerVolume", changingVolume);
    }
  }, [changingVolume]);

  return [volume, setVolume];
}
