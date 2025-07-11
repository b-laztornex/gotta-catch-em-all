import React from "react";
import CustomTable from "@/components/CustomTable";
import type { Trigger } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DialogTitle } from "@/components/ui/dialog";

interface ModalBodyProps {
  description: string;
  triggers: Trigger[];
  pageIndex: number;
  onPageChange: (newPage: number) => void;
  pokemon: {
    name: string;
    id: number;
    order: number;
    base_experience: number;
    height: number;
    weight: number;
    is_default: boolean;
    location_area_encounters?: string;
    past_types?: Array<{ type: { name: string } }>;
    sprites?: {
      front_default?: string;
      other?: {
        [key: string]: unknown;
      };
    };
  };
}

const cols: ColumnDef<Trigger, Trigger>[] = [
  {
    accessorKey: "name",
    header: "Trigger Name",
    cell: (info) => info.row.original.name,
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: (info) => (
      <a
        href={info.row.original.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {info.row.original.url}
      </a>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: (info) => info.row.original.details || "-",
  },
];

const ModalBody: React.FC<ModalBodyProps> = ({
  description,
  triggers,
  pageIndex,
  onPageChange,
  pokemon,
}) => {
  if (!pokemon) {
    return <div className="text-red-600 p-4">No Pokémon data available.</div>;
  }

  const safeTriggers = Array.isArray(triggers) ? triggers : [];

  return (
    <div>
      <DialogTitle>{pokemon.name}</DialogTitle>
      <p id="modal-desc" className="mb-2 text-gray-700">
        {description}
      </p>
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <div className="flex items-center gap-4 mb-2">
          {pokemon.sprites?.front_default && (
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={64}
              height={64}
              className="rounded bg-gray-100 border"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <strong>Name:</strong> {pokemon.name}
          </div>
          <div>
            <strong>ID:</strong> {pokemon.id}
          </div>
          <div>
            <strong>Order:</strong> {pokemon.order}
          </div>
          <div>
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </div>
          <div>
            <strong>Height:</strong> {pokemon.height}
          </div>
          <div>
            <strong>Weight:</strong> {pokemon.weight}
          </div>
          <div>
            <strong>Is Default:</strong> {pokemon.is_default ? "Yes" : "No"}
          </div>
          <div>
            <strong>Location Encounters:</strong>{" "}
            {pokemon.location_area_encounters && (
              <a
                href={pokemon.location_area_encounters}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Encounters
              </a>
            )}
          </div>
          <div className="col-span-2">
            <strong>Past Types:</strong>{" "}
            {pokemon.past_types && pokemon.past_types.length > 0 ? (
              <pre className="bg-gray-200 rounded p-1 text-xs">
                {JSON.stringify(pokemon.past_types, null, 2)}
              </pre>
            ) : (
              "None"
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Evolution Triggers</h3>
        <div className="max-h-64 overflow-y-auto rounded border bg-white">
          {safeTriggers.length === 0 ? (
            <div className="text-gray-500 p-4">No triggers found.</div>
          ) : (
            <CustomTable
              columns={cols}
              data={safeTriggers}
              pageIndex={pageIndex}
              totalCount={safeTriggers.length}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalBody;
