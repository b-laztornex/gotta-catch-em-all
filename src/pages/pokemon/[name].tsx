import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import CustomTable from "@/components/CustomTable";
import CustomModal from "@/components/CustomModal";
import type { PokemonDetail, NamedAPIResource, PagedResult } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { getPokemonDetail, getEvolutionTriggers } from "@/lib/api";
import { PAGE_SIZE } from "@/lib/constants";

interface Props {
  pokemon: PokemonDetail;
  triggers: PagedResult<NamedAPIResource>;
  triggerPage: number;
}

export default function PokemonPage({ pokemon, triggers, triggerPage }: Props) {
  const router = useRouter();
  const { modal } = router.query;

  const [selectedTrigger, setSelectedTrigger] =
    useState<NamedAPIResource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // The Synchronize modal open state with URL `modal` query needs to be updated in this step
  useEffect(() => {
    if (typeof modal === "string") {
      const found = triggers.results.find((t) => t.name === modal);
      if (found) {
        setSelectedTrigger(found);
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(false);
      setSelectedTrigger(null);
    }
  }, [modal, triggers.results]);

  const cols: ColumnDef<NamedAPIResource, any>[] = [
    { accessorKey: "name", header: "Trigger Name" },
    { accessorKey: "url", header: "URL" },
  ];

  // It is good to use an object form for router.push, becasue using inline we can generate a temaplte bug
  const goToPage = (newPage: number) => {
    router.push({
      pathname: `/pokemon/${pokemon.name}`,
      query: { triggerPage: newPage },
    });
  };

  const handleRowClick = (trigger: NamedAPIResource) => {
    router.push({
      pathname: `/pokemon/${pokemon.name}`,
      query: { triggerPage, modal: trigger.name },
    });
  };

  const handleModalClose = () => {
    router.push({
      pathname: `/pokemon/${pokemon.name}`,
      query: { triggerPage },
    });
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

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Evolution Triggers</h2>
        <CustomTable
          columns={cols}
          data={triggers.results}
          pageIndex={triggerPage}
          totalCount={triggers.count}
          onPageChange={goToPage}
          onRowClick={handleRowClick}
        />
      </div>

      {selectedTrigger && isModalOpen && (
        <CustomModal
          pokemon={pokemon}
          triggers={triggers}
          pageIndex={triggerPage}
          onPageChange={goToPage}
          onClose={handleModalClose}
        />
      )}
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
    return { props: { pokemon, triggers, triggerPage } };
  } catch {
    return { notFound: true };
  }
};
