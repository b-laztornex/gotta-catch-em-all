import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import CustomTable from "@/components/CustomTable";
import { Column } from "@/components/CustomTable";

import type { NamedAPIResource, PagedResult, PokemonDetail } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { getEvolutionTriggers } from "@/lib/api";
import { PAGE_SIZE } from "@/lib/constants";

interface Props {
  pokemon: PokemonDetail;
  onClose: () => void;
}

export default function CustomModal({ pokemon, onClose }: Props) {
  const [triggers, setTriggers] = useState<PagedResult<NamedAPIResource>>({
    count: 0,
    results: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchTriggers() {
      setLoading(true);
      setError(null);
      try {
        const offset = page * PAGE_SIZE;
        const data = await getEvolutionTriggers(offset);
        setTriggers(data);
      } catch (err: any) {
        setError(err.message ?? "Error loading triggers");
      } finally {
        setLoading(false);
      }
    }
    fetchTriggers();
  }, [pokemon, page]);

  const cols: Column<NamedAPIResource>[] = [
    { header: "Trigger Name", accessor: "name" },
    { header: "URL", accessor: "url" },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
        <div className="overflow-y-auto px-4 py-2 flex-1">
          <h2 className="text-2xl font-bold mb-4">{pokemon.name}</h2>

          <div className="flex space-x-6 mb-6">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32"
            />
            <div className="flex flex-col justify-center h-32">
              <p>
                <strong>Height:</strong> {pokemon.height}
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Evolution Triggers</h3>
            {/* Inner scrollable table */}
            <div className="overflow-y-auto max-h-64">
              <CustomTable
                columns={cols}
                data={triggers.results}
                pageIndex={page}
                totalCount={triggers.count}
                isLoading={loading}
                errorMsg={error || undefined}
                onPageChange={setPage}
                onRowClick={(name) => console.log("Clicked trigger:", name)}
                renderCell={(row, col) => {
                  const value = row[col.accessor];
                  if (col.accessor === "url" && typeof value === "string") {
                    const truncated =
                      value.length > 30 ? `${value.slice(0, 30)}…` : value;
                    return <span title={value}>{truncated}</span>;
                  }
                  return String(value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-2 bg-gray-50 flex justify-end">
          <DialogClose asChild>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
