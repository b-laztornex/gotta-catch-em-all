import useSWR from "swr";
import { fetchJson, HttpError } from "@/lib/apiClient";
import { API_BASE_URL, PAGE_SIZE } from "@/lib/constants";
import type { UseFetchResult, PagedResult } from "@/lib/types";

const NAME_PATTERN = /^[a-z0-9-]{3,}$/;

export function useList(
  pageIndex: number,
  filter: string
): UseFetchResult<{ name: string; url: string }> {
  const offset = pageIndex * PAGE_SIZE;
  const term = filter.trim().toLowerCase();
  const isFiltering = term.length > 0;
  const isValid = !isFiltering || NAME_PATTERN.test(term);

  const safeTerm = encodeURIComponent(term);
  const listUrl = `${API_BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
  const nameUrl = `${API_BASE_URL}/pokemon/${safeTerm}`;
  const key = isValid ? (isFiltering ? nameUrl : listUrl) : null;

  const { data, error, isLoading } = useSWR(key, fetchJson, {
    revalidateOnFocus: false,
    shouldRetryOnError: (err: unknown) =>
      !(err instanceof HttpError && err.status === 404),
  });

  if (!isValid) {
    return { data: null, error: null, isLoading: false };
  }
  if (!data && !error) {
    return { data: null, error: null, isLoading: true };
  }

  if (isFiltering) {
    const paged: PagedResult<{ name: string; url: string }> =
      data && !(data as any[]).length
        ? {
            count: 1,
            results: [
              { name: (data as any).name, url: (data as any).species.url },
            ],
          }
        : { count: 0, results: [] };
    return { data: paged, error: null, isLoading: false };
  }

  return {
    data: { count: (data as any).count, results: (data as any).results },
    error: null,
    isLoading,
  };
}
