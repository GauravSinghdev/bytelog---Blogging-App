"use client";

import { Button } from "@/components/ui/button";
import { IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const authenticator = async () => {
  const response = await fetch("/api/imagekit-auth");
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed with status ${response.status}: ${errorText}`
    );
  }
  return await response.json();
};

export default function ImageKitUpload({
  onUploadSuccess,
  onUploadStart,
  onUploadEnd,
}: {
  onUploadSuccess?: (url: string, fileId: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}) {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [progressBar, setProgressBar] = useState<number>(0);

  return (
    <div className="flex gap-5 items-center">
      <IKUpload
        ref={ikUploadRef}
        folder={`/bytelog-codewithkara`}
        onUploadStart={() => {
          onUploadStart?.();
        }}
        onSuccess={(res) => {
          toast.success("Image uploaded successfully.");
          onUploadSuccess?.(res.url, res.fileId);
          onUploadEnd?.();
        }}
        onError={() => {
          toast.error("Image upload failed.");
          onUploadEnd?.();
        }}
        validateFile={(file) => {
          if (file.size > 1024 * 1024 * 10) {
            toast.error("File size should be less than 10MB");
            return false;
          }
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ];
          if (!allowedTypes.includes(file.type)) {
            toast.error("Only JPG, PNG, WebP, or GIF images are allowed.");
            return false;
          }
          return true;
        }}
        onUploadProgress={(progress) => {
          const progressPercent = Math.round(
            (progress.loaded / progress.total) * 100
          );
          setProgressBar(progressPercent);
          if (progressPercent === 100) {
            setTimeout(() => setProgressBar(0), 1500);
          }
        }}
        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
        publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
        authenticator={authenticator}
        className="hidden"
      />
      <Button
        type="button"
        onClick={() => ikUploadRef.current?.click()}
        variant="outline"
        className="rounded cursor-pointer w-40"
      >
        Upload Image
      </Button>
      <div className="h-2 w-[200px] relative">
        {progressBar > 0 && (
          <>
            <div className="absolute top-0 left-0 bg-gray-300 h-2 w-full rounded-2xl z-[0]" />
            <div
              className="absolute top-0 left-0 bg-green-500 h-2 rounded-2xl z-[1]"
              style={{ width: `${progressBar}%` }}
            />
          </>
        )}
      </div>
      {progressBar > 0 && <>{progressBar}%</>}
    </div>
  );
}
