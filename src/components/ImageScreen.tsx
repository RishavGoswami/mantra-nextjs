"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ImageScreen = ({ isHorizontal = true }: { isHorizontal?: boolean }) => {
  const router = useRouter();

  const containerClasses = isHorizontal
    ? "w-full h-full overflow-x-auto flex gap-4 px-8 scrollbar-hide snap-x snap-mandatory"
    : "w-full h-full overflow-y-auto flex flex-col gap-4 py-8 scrollbar-hide snap-y snap-mandatory";
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch("/api/images");
      let data = await res.json();
      data = data.sort((a: string, b: string) =>
        a.localeCompare(b, undefined, { numeric: true })
      );
      setImages(data);
    }
    fetchImages();
  }, []);

  return (
    <>
      <div className="z-20 top-0 left-0 w-full mb-4 bg-black shadow-md py-4 px-6 flex justify-center border-b-2">
        <button
          onClick={() => router.back()}
          className="mr-4 absolute top-4 left-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Mantra</h1>
      </div>
      <div className="w-screen h-[calc(100vh-5rem)] flex items-center justify-center bg-black">
        <div className={containerClasses} style={{ scrollBehavior: "smooth" }}>
          {images.map((file, index) => (
            <div
              key={index}
              className={`relative snap-center flex justify-center items-center ${
                isHorizontal
                  ? "min-w-[80vw] h-full px-4"
                  : "w-full min-h-[80vh] py-4"
              }`}
            >
              <Image
                src={`/images/${file}`}
                alt={`Image ${index}`}
                layout="fill"
                objectFit="cover"
                loading="lazy"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { ImageScreen };
