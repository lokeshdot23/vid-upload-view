// import { Video } from "@/types/video";
import { Video } from "@/app/types/video";

const STORAGE_KEY = "videos";

export function getVideos(): Video[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveVideo(video: Video) {
  const existing = getVideos();
  existing.push(video);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}
