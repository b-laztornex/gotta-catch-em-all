"use client";

import { useState } from "react";
import { useList } from "@/hooks/useList";
import { useEvolution } from "@/hooks/useEvolution";

import CustomTable from "./CustomTable";
import CustomModal from "./CustomModal";

export default function PageClient() {
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const { data, error } = useList(pageIndex, filter);

  const [triggerPage, setTriggerPage] = useState(0);
  const { data: triggerData, error: triggerError } = useEvolution(triggerPage);

  if (error) {
    return <p className="text-red-600">Pokemons data failed.</p>;
  }

  if (!data) {
    return <p className="text-gray-400">Incoming pokemons data...</p>;
  }

  return (
    <div className="p-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPageIndex(0);
          }}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Pokemons List</h2>

          {data.results.length === 0 ? (
            <p className="text-gray-600">
              No Pokémon found matching “{filter}.”
            </p>
          ) : (
            <CustomTable
              data={data.results}
              onRowClick={setSelected}
              pageIndex={pageIndex}
              onPageChange={setPageIndex}
            />
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Evolution Triggers</h2>
          {triggerError ? (
            <p className="text-red-600">Failed to load triggers.</p>
          ) : !triggerData ? (
            <p className="text-gray-400">Loading triggers…</p>
          ) : (
            <CustomTable
              data={triggerData.results}
              pageIndex={triggerPage}
              onPageChange={setTriggerPage}
            />
          )}
        </div>
      </div>
      {selected && (
        <CustomModal name={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
