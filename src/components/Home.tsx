"use client";

import { useEffect } from "react";
import { useMantraStore } from "@/store/mantra";
import Link from "next/link";
import { Loader } from "@/src/shared/Loader";
import { useMantra } from "@/src/hooks/useMantra";

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
      <div className="flex-1 sticky top-0 bg-black z-10 p-4 text-center">
        <h1 className="text-xl font-bold">Mantra</h1>
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
