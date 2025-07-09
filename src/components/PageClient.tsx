"use client";

import { useState } from "react";
import { useList } from "@/hooks/useList";
import CustomTable from "./CustomTable";
import CustomModal from "./CustomModal";

export default function PageClient() {
  const [filter, setFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const { data, error } = useList(pageIndex, filter);

  if (error) {
    return <p className="text-red-600">Pokemons data failed.</p>;
  }

  if (!data) {
    return <p className="text-gray-400">Incoming pokemons data...</p>;
  }

  return (
    <>
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

      {data.results.length === 0 ? (
        <p className="text-gray-600">No Pokémon found matching “{filter}.”</p>
      ) : (
        <CustomTable
          data={data.results}
          onRowClick={setSelected}
          pageIndex={pageIndex}
          onPageChange={setPageIndex}
        />
      )}
      {selected && (
        <CustomModal name={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
