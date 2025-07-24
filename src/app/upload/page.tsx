'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { saveVideo } from '@/lib/localStorage';

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const router = useRouter();

  const handleUpload = () => {
    if (!videoFile) return;

    const videoUrl = URL.createObjectURL(videoFile); // temp browser blob URL
    const newVideo = {
      id: uuidv4(),
      name: videoFile.name,
      url: videoUrl,
      uploadedAt: new Date().toISOString(),
    };

    saveVideo(newVideo);
    alert("Video uploaded!");
    router.push('/queue');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center">Upload Video</h2>

        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setVideoFile(file);
          }}
          className="block w-full text-sm text-gray-700"
        />

        <button
          onClick={handleUpload}
          disabled={!videoFile}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Upload
        </button>
      </div>
    </main>
  );
}
