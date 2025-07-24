'use client';

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { saveVideo } from "@/lib/localStorage";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // trigger file input click
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    const videoBase64 = reader.result as string;

    const newVideo = {
      id: uuidv4(),
      name: file.name,
      url: videoBase64, // store base64 instead of blob
      uploadedAt: new Date().toISOString(),
    };

    saveVideo(newVideo);
    alert("Video uploaded!");
    router.push("/queue");
  };

  reader.readAsDataURL(file); // <-- THIS reads file as base64
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Welcome to Vid Upload
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Effortlessly upload and manage your videos. Get started by uploading your first video!

          <p className="text-red-500"> *Alert! upload files less than 5Mb </p>
        </p>

        {/* Hidden file input */}
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Upload Button */}
        <Button onClick={handleButtonClick} className="px-8 py-4 text-lg">
          Upload Video
        </Button>
      </div>
    </main>
  );
}
