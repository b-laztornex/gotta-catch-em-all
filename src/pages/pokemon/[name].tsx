import { GetServerSideProps } from "next";
import Link from "next/link";
import { getPokemonDetail } from "@/lib/api";
import type { PokemonDetail } from "@/lib/types";

interface Props {
  pokemon: PokemonDetail;
}

export default function PokemonPage({ pokemon }: Props) {
  return (
    <div className="p-8 space-y-4">
      <Link href="/" className="text-blue-500 underline">
        &larr; Back to list
      </Link>
      <h1 className="text-2xl font-bold">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32"
      />
      <p>
        <strong>Height:</strong> {pokemon.height}
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight}
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const name = (params?.name as string).toLowerCase();

  try {
    const pokemon = await getPokemonDetail(name);
    return { props: { pokemon } };
  } catch {
    return { notFound: true };
  }
};
