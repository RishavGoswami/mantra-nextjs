"use client";

import { useEffect } from "react";
import { useMantraStore } from "@/store/mantra";
import Link from "next/link";
import { Loader } from "@/src/shared/Loader";
import { useMantra } from "@/src/hooks/useMantra";
import { Images } from "lucide-react";

export function HomePage() {
  const { data, isLoading } = useMantra();
  const { mantras, setMantras } = useMantraStore();

  useEffect(() => {
    if (data?.screens) {
      setMantras(data.screens);
    }
  }, [data, setMantras]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="z-20 top-0 left-0 w-full mb-4 bg-black shadow-md py-4 px-6 flex justify-center border-b-2">
        <Link className="mr-4 absolute top-4 left-4" href="/image">
          <Images size={20} />
        </Link>
        <h1 className="text-lg font-bold">Mantra</h1>
      </div>
      <div className="p-4 grid grid-cols-2 gap-2 sm:max-w-[50vw] sm:m-auto">
        {mantras.map((mantra) => (
          <Link key={mantra.id} href={`/mantra/${mantra.id}`}>
            <div
              className="p-4 text-center rounded-lg shadow-lg relative flex h-full justify-center items-center border-1 aspect-square"
              style={{
                backgroundColor: mantra.tile_color,
              }}
            >
              <h2 className="relative  text-white font-bold">{mantra.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
