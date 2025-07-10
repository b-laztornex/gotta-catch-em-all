import { API_BASE_URL, PAGE_SIZE } from "./constants";
import type { PokemonListResponse, PokemonDetail } from "./types";

export async function getPokemonList(offset = 0): Promise<PokemonListResponse> {
  const res = await fetch(
    `${API_BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const res = await fetch(`${API_BASE_URL}/pokemon/${name}`);
  if (!res.ok) throw new Error("Pokémon not found");
  return res.json();
}
