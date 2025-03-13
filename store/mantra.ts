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
  clearCache: () => void;
}

export const useMantraStore = create<MantraStore>()(
  persist(
    (set) => ({
      mantras: [],
      setMantras: (data) => set({ mantras: data }),
      clearCache: () => {
        localStorage.removeItem("mantra-storage");
      },
    }),
    {
      name: "mantra-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
