import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { playerState } from "../recoil/atoms";

export default function useVideoData() {
  const player = useRecoilValue(playerState);
  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${player.videoId}&format=json`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    if (player.videoId) fetchData();
  }, [player.videoId]);

  return { videoData };
}
