"use client";

import { useState } from "react";
import { useList } from "@/hooks/useList";
import { useEvolution } from "@/hooks/useEvolution";
import { useDebounce } from "@/hooks/useDebounce";
import CustomTable from "./CustomTable";
import CustomModal from "./CustomModal";

export default function PageClient() {
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 400);
  const [pageIndex, setPageIndex] = useState(0);
  const [triggerPage, setTriggerPage] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const {
    data: listData,
    error: listError,
    isLoading: isListLoading,
  } = useList(pageIndex, debouncedFilter);

  const {
    data: triggerData,
    error: triggerError,
    isLoading: isTriggerLoading,
  } = useEvolution(triggerPage);

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
          <h2 className="text-lg font-semibold mb-4">Pokémon List</h2>
          {listData?.results.length === 0 ? (
            <p className="text-gray-600">
              No Pokémon found matching “{filter}.”
            </p>
          ) : (
            <CustomTable
              data={listData?.results ?? []}
              onRowClick={setSelected}
              pageIndex={pageIndex}
              onPageChange={setPageIndex}
              pageSize={20}
              totalCount={listData?.count ?? 0}
              isLoading={isListLoading}
              errorMsg={listError?.message}
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
              pageSize={20}
              totalCount={triggerData.count}
              isLoading={isTriggerLoading}
              errorMsg={triggerError?.message}
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
