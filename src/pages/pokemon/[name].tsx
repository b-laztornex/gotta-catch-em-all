import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getPokemonDetail, getEvolutionTriggers } from "@/lib/api";
import type { PokemonDetail, NamedAPIResource, PagedResult } from "@/lib/types";
import Table, { Column } from "@/components/CustomTable";
import { PAGE_SIZE } from "@/lib/constants";

interface Props {
  pokemon: PokemonDetail;
  triggers: PagedResult<NamedAPIResource>;
  triggerPage: number;
}

export default function PokemonPage({ pokemon, triggers, triggerPage }: Props) {
  const router = useRouter();
  const cols: Column<NamedAPIResource>[] = [
    { header: "Name", accessor: "name" },
  ];

  const handlePageChange = (newPage: number) => {
    router.push(`/pokemon/${pokemon.name}?triggerPage=${newPage}`);
  };

  return (
    <div className="p-8 space-y-6">
      <Link href="/" className="text-blue-500 underline">
        &larr; Back to list
      </Link>

      <div className="space-y-4">
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

      {/* Optional Evolution Triggers Table */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Evolution Triggers</h2>
        <Table
          columns={cols}
          data={triggers.results}
          pageIndex={triggerPage}
          totalCount={triggers.count}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  query,
}) => {
  const name = (params?.name as string).toLowerCase();
  const triggerPage = parseInt(
    Array.isArray(query.triggerPage)
      ? query.triggerPage[0]
      : query.triggerPage || "0",
    10
  );
  const triggerOffset = triggerPage * PAGE_SIZE;

  try {
    const [pokemon, triggers] = await Promise.all([
      getPokemonDetail(name),
      getEvolutionTriggers(triggerOffset),
    ]);

    return {
      props: { pokemon, triggers, triggerPage },
    };
  } catch {
    return { notFound: true };
  }
};
