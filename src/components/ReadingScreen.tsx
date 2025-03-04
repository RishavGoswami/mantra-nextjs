"use client";

import { useParams, useRouter } from "next/navigation";
import { useMantraStore } from "@/store/mantra";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Loader } from "@/src/shared/Loader";
import { useMantra } from "@/src/hooks/useMantra";

export function ReadingScreen() {
  const { id } = useParams();
  const router = useRouter();
  const { mantras, setMantras } = useMantraStore();

  const { data, isLoading } = useMantra();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data?.screens && mantras.length === 0) setMantras(data.screens);
  }, [data, setMantras, mantras.length]);

  const mantra =
    mantras.find((m) => m.id === id) ||
    data?.screens?.find((m: { id: void }) => m.id === id);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="z-20 top-0 left-0 w-full mb-4 bg-black shadow-md py-4 px-6 flex justify-center border-b-2">
        <button
          onClick={() => router.back()}
          className="mr-4 absolute top-4 left-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">{mantra?.title || "..."}</h1>
      </div>

      <div className="flex-1 overflow-auto px-6 pt-4 text-center pb-8">
        <p className="text-lg whitespace-pre-line">{mantra?.content}</p>
      </div>
    </div>
  );
}
