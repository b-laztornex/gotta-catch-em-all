import useSWR from "swr";
import { fetchJson } from "@/lib/apiClient";
import { API_BASE_URL } from "@/lib/constants";

const NAME_PATTERN = /^[a-z0-9-]{3,}$/;

export function useList(pageIndex: number, filter: string) {
  const offset = pageIndex * 20;
  const term = filter.trim().toLowerCase();
  const isFiltering = term.length > 0;
  const isValid = !isFiltering || NAME_PATTERN.test(term);

  const safeTerm = encodeURIComponent(term);
  const listUrl = `${API_BASE_URL}/pokemon?limit=20&offset=${offset}`;
  const nameUrl = `${API_BASE_URL}/pokemon/${safeTerm}`;

  const key = isValid ? (isFiltering ? nameUrl : listUrl) : null;

  const { data, error, isLoading } = useSWR(key, fetchJson, {
    revalidateOnFocus: false,
    shouldRetryOnError: (err: any) => err.status !== 404,
  });

  if (!isValid) {
    return {
      data: { count: 0, results: [] },
      error: undefined,
    };
  }

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
    isLoading,
  };
}
