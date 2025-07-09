import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw res;
  return res.json();
};

export function useList(pageIndex: number, filter: string) {
  const offset = pageIndex * 20;
  const term = filter.trim().toLowerCase();
  const isFiltering = term.length > 0;

  const url = isFiltering
    ? `https://pokeapi.co/api/v2/pokemon/${term}`
    : `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;

  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: (err: any) => err.status !== 404,
  });

  if (!data && !error) {
    return { data: null, error: null };
  }

  if (isFiltering && data && !Array.isArray(data)) {
    return {
      data: {
        count: 1,
        results: [
          { name: data.name as string, url: data.species.url as string },
        ],
      },
      error: undefined,
    };
  }

  if (isFiltering && error) {
    return {
      data: { count: 0, results: [] },
      error: undefined,
    };
  }

  return {
    data: {
      count: data.count as number,
      results: data.results as { name: string; url: string }[],
    },
    error: undefined,
  };
}
