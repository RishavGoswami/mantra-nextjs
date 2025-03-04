import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Mantra {
  id: string;
  title: string;
  content: string;
  tile_color?: string;
  uri?: string;
}

interface MantraStore {
  mantras: Mantra[];
  setMantras: (data: Mantra[]) => void;
}

export const useMantraStore = create<MantraStore>()(
  persist(
    (set) => ({
      mantras: [],
      setMantras: (data) => set({ mantras: data }),
    }),
    {
      name: "mantra-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
