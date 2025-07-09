import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

export function useList(pageIndex: number, filter: string) {
  const offset = pageIndex * 20;
  const term = filter.trim().toLowerCase();
  const isFiltering = term.length > 0;

  const url = isFiltering
    ? `https://pokeapi.co/api/v2/pokemon?limit=2000`
    : `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;

  const { data, error } = useSWR(url, fetcher, { revalidateOnFocus: false });

  if (!data || error) {
    return { data: null, error: null };
  }

  if (!isFiltering) {
    return {
      data: {
        count: data.count,
        results: data.results as { name: string; url: string }[],
      },
      error: undefined,
    };
  }

  const all: { name: string; url: string }[] = data.results;
  const filtered = all.filter((p) => p.name.startsWith(term));
  const paged = filtered.slice(offset, offset + 20);

  return {
    data: {
      count: filtered.length,
      results: paged,
    },
    error: undefined,
  };
}
