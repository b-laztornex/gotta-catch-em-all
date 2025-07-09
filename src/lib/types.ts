// lib/types.ts

export interface PagedResult<T> {
  count: number;
  results: T[];
}

export interface UseFetchResult<T> {
  data: PagedResult<T> | null;
  error: Error | null;
  isLoading: boolean;
}

// For Pokémon details in the modal
export interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}
