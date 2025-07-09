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

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        {error ? (
          <p className="text-red-600">Failed to load Pokémon details.</p>
        ) : !data ? (
          <p className="text-gray-400">Loading Pokémon details...</p>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={data.sprites.front_default}
              alt={data.name}
              className="mb-4"
            />
            <p>
              <strong>Height:</strong> {data.height}
            </p>
            <p>
              <strong>Weight:</strong> {data.weight}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
