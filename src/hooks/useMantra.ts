import { fetchMantras } from "@/lib/fetch";
import { useMantraStore } from "@/store/mantra";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useMantra = () => {
  const { mantras } = useMantraStore();
  const [isHydrated, setIsHydrated] = useState(false);

  const results = useQuery({
    queryKey: ["mantras"],
    queryFn: fetchMantras,
    enabled: isHydrated && mantras.length === 0,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return results;
};

export { useMantra };
