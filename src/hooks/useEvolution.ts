import useSWR from "swr";
import { API_BASE_URL, PAGE_SIZE } from "@/lib/constants";
import { fetchJson } from "@/lib/apiClient";

export function useEvolution(pageIndex: number) {
  const offset = pageIndex * PAGE_SIZE;
  const url = `${API_BASE_URL}/evolution-trigger?limit=${PAGE_SIZE}&offset=${offset}`;
  const { data, error, isLoading } = useSWR(url, fetchJson, {
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
