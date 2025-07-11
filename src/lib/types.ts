export type Column<T> = {
  header: string;
  accessor: keyof T;
};

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: NamedAPIResource[];
}

export interface PokemonDetail {
  name: string;
  id: number;
  order: number;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  location_area_encounters?: string;
  past_types?: { type: { name: string } }[];
  sprites?: {
    front_default?: string;
    other?: {
      [key: string]: unknown;
    };
  };
}

export interface PagedResult<T> {
  count: number;
  results: T[];
}

export interface Trigger {
  name: string;
  url: string;
  details?: string;
}
