'use client';

import { getVideos } from "@/lib/localStorage";
import { useEffect, useState } from "react";
// import { Video } from "@/types/video";

export default function QueuePage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const storedVideos = getVideos();
    setVideos(storedVideos);
  }, []);

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Uploaded Videos</h1>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-100 p-4 rounded shadow">
              <video
                controls
                src={video.url}
                className="w-full h-auto mb-2 rounded"
              />
              <p className="text-sm font-medium">{video.name}</p>
              <p className="text-xs text-gray-500">
                Uploaded: {new Date(video.uploadedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
