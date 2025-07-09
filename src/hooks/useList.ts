import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

export function useList(pageIndex: number, filter: string) {
  const offset = pageIndex * 20;
  const url = filter
    ? `https://pokeapi.co/api/v2/pokemon/${filter.toLowerCase()}`
    : `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;

  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });
}
