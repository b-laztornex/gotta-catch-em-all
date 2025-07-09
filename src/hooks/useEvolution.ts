import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

export function useEvolution(pageIndex: number) {
  const offset = pageIndex * 20;
  const url = `https://pokeapi.co/api/v2/evolution-trigger?limit=20&offset=${offset}`;
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  if (!data || error) {
    return { data: null, error: null };
  }

  return {
    data: {
      count: data.count,
      results: data.results as { name: string; url: string }[],
    },
    error: undefined,
    isLoading,
  };
}
