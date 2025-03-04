export const fetchMantras = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_MANTRA_URL}`);
  return res.json();
};
