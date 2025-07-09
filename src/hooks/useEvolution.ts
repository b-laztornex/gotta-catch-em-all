import useSWR from "swr";
import { API_BASE_URL, PAGE_SIZE } from "@/lib/constants";
import { fetchJson } from "@/lib/apiClient";
import type { UseFetchResult } from "@/lib/types";

export function useEvolution(
  pageIndex: number
): UseFetchResult<{ name: string; url: string }> {
  const offset = pageIndex * PAGE_SIZE;
  const url = `${API_BASE_URL}/evolution-trigger?limit=${PAGE_SIZE}&offset=${offset}`;

  const { data, error, isLoading } = useSWR(url, fetchJson, {
    revalidateOnFocus: false,
  });

  if (!data && !error) {
    return { data: null, error: null, isLoading: true };
  }
  if (error) {
    return { data: null, error, isLoading: false };
  }

  return {
    data: { count: (data as any).count, results: (data as any).results },
    error: null,
    isLoading,
  };
}
