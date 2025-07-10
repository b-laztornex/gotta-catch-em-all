"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import useSWR from "swr";
import { fetchJson } from "@/lib/apiClient";
import { API_BASE_URL } from "@/lib/constants";
import type { PokemonDetail } from "@/lib/types";
import CustomTable from "./CustomTable";
import { useEvolution } from "@/hooks/useEvolution";

type CustomModalProps = {
  name: string;
  onClose: () => void;
};

export default function CustomModal({ name, onClose }: CustomModalProps) {
  const { data, error } = useSWR<PokemonDetail>(
    `${API_BASE_URL}/pokemon/${name.toLowerCase()}`,
    fetchJson,
    { revalidateOnFocus: false }
  );
  const [triggerPage, setTriggerPage] = useState(0);
  const {
    data: triggerData,
    error: triggerError,
    isLoading: isTriggerLoading,
  } = useEvolution(triggerPage);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="flex flex-col max-h-[80vh] w-full sm:w-[600px]">
        <DialogHeader>
          <DialogTitle>{name} Details</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <div className="flex-shrink-0 flex flex-col items-center px-4">
          {error ? (
            <p className="text-red-600">Failed to load Pokémon details.</p>
          ) : !data ? (
            <p className="text-gray-400">Loading Pokémon details...</p>
          ) : (
            <>
              <img
                src={data.sprites.front_default}
                alt={data.name}
                className="mb-4 w-32 h-32 object-contain"
              />
              <p>
                <strong>Height:</strong> {data.height}
              </p>
              <p>
                <strong>Weight:</strong> {data.weight}
              </p>
            </>
          )}
        </div>

        <div className="mt-4 flex-grow overflow-y-auto px-4">
          {triggerError ? (
            <p className="text-red-600">Failed to load evolution triggers.</p>
          ) : !triggerData ? (
            <p className="text-gray-400">Loading evolution triggers…</p>
          ) : (
            <CustomTable
              data={triggerData.results}
              pageIndex={triggerPage}
              onPageChange={setTriggerPage}
              totalCount={triggerData.count}
              isLoading={isTriggerLoading}
              errorMsg={triggerError?.message}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
