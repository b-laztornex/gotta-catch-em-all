import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

import pokemonDetails from "@/data/pokemonDetails.json";
const details: Record<string, PokemonDetail> = pokemonDetails;

type CustomModalProps = {
  name: string;
  onClose: () => void;
};

export default function CustomModal({ name, onClose }: CustomModalProps) {
  const data = details[name.toLowerCase()];

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

        {!data ? (
          <p className="text-red-500">No local data found for “{name}”.</p>
        ) : (
          <div className="space-y-2">
            <img src={data.sprites.front_default} alt={name} />
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
