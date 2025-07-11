"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ModalBody from "@/components/ui/ModalBody";
import ModalFooter from "@/components/ui/ModalFooter";
import type { PokemonDetail, Trigger } from "@/lib/types";

export interface Props {
  pokemon: PokemonDetail;
  triggers: Trigger[];
  pageIndex: number;
  onPageChange: (newPage: number) => void;
  onClose: () => void;
}

export default function CustomModal({
  pokemon,
  triggers,
  pageIndex,
  onPageChange,
  onClose,
}: Props) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent aria-describedby="modal-desc">
        <ModalBody
          description={`Evolution triggers and details for ${pokemon.name}.`}
          triggers={triggers}
          pageIndex={pageIndex}
          onPageChange={onPageChange}
          pokemon={pokemon}
        />
        <ModalFooter onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
