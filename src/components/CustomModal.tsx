"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import CustomTable from "@/components/CustomTable";
import type { NamedAPIResource, PokemonDetail, Trigger } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import ModalHeader from "@/components/ui/ModalHeader";
import ModalBody from "@/components/ui/ModalBody";
import ModalFooter from "@/components/ui/ModalFooter";
import Image from "next/image";

export interface Props {
  pokemon: PokemonDetail;
  triggers: Trigger[];
  pageIndex: number;
  onPageChange: (newPage: number) => void;
  isLoading?: boolean;
  errorMsg?: string;
  onClose: () => void;
}

export default function CustomModal({
  pokemon,
  triggers,
  pageIndex,
  onPageChange,
  isLoading = false,
  errorMsg,
  onClose,
}: Props) {
  const cols: ColumnDef<Trigger, unknown>[] = [
    { accessorKey: "name", header: "Trigger Name" },
    { accessorKey: "url", header: "URL" },
    { accessorKey: "details", header: "Details" },
  ];

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-describedby="modal-desc">
        <ModalBody
          description={`Evolution triggers and details for ${pokemon.name}.`}
          triggers={triggers}
          pageIndex={pageIndex}
          onPageChange={onPageChange}
          isLoading={isLoading}
          errorMsg={errorMsg}
          pokemon={pokemon}
        />
        <ModalFooter onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
