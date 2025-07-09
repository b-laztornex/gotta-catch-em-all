import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import useSWR from "swr";

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json() as Promise<PokemonDetail>;
  });

type CustomModalProps = {
  name: string;
  onClose: () => void;
};

export default function CustomModal({ name, onClose }: CustomModalProps) {
  const { data, error } = useSWR<PokemonDetail>(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
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
