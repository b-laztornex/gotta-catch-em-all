import React from "react";
import Image from "next/image";
import type { PokemonDetail } from "@/lib/types";

interface ModalHeaderProps {
  pokemon: PokemonDetail;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ pokemon }) => (
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
    <div>
      <span className="text-2xl font-bold block">
        {pokemon.name} (ID: {pokemon.id})
      </span>
    </div>
  </div>
);

export default ModalHeader;
