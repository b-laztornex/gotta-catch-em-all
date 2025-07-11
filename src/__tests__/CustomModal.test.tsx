import React from "react";

jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  DialogContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  DialogClose: ({ children }: any) => <>{children}</>,
}));
jest.mock("@/components/CustomTable", () => ({
  __esModule: true,
  default: ({ columns, data }: any) => (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((col: any) => (
              <th key={col.header}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i}>
              {columns.map((col: any) => (
                <td key={col.header}>{row[col.accessorKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button role="button" name="Previous" disabled>
          Previous
        </button>
        <span>Page 1 of 1</span>
        <button role="button" name="Next" disabled>
          Next
        </button>
      </div>
    </div>
  ),
}));
jest.mock("@/components/ui/ModalHeader", () => ({
  __esModule: true,
  default: ({ pokemon }: { pokemon: any }) => (
    <div data-testid="modal-header">Header: {pokemon.name}</div>
  ),
}));
jest.mock("@/components/ui/ModalBody", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="modal-body">
      Body: {props.pokemon.name}
      {props.triggers && props.triggers.length > 0 && (
        <div>{props.triggers[0].name}</div>
      )}
    </div>
  ),
}));
jest.mock("@/components/ui/ModalFooter", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="modal-footer">
      Footer
      <button onClick={props.onClose}>Close</button>
    </div>
  ),
}));

import { render, screen } from "@testing-library/react";
import CustomModal from "@/components/CustomModal";
import { getEvolutionTriggers } from "@/lib/api";
import type { NamedAPIResource, PokemonDetail } from "@/lib/types";

jest.mock("@/lib/api");
const mockGet = getEvolutionTriggers as jest.MockedFunction<
  typeof getEvolutionTriggers
>;

const dummyPokemon: PokemonDetail = {
  id: 25,
  name: "pikachu",
  order: 1,
  base_experience: 112,
  is_default: true,
  height: 4,
  weight: 60,
  sprites: { front_default: "pikachu.png" },
  species: { url: "" },
} as PokemonDetail;

const sampleTriggers: NamedAPIResource[] = [
  { name: "level-up", url: "https://pokeapi.co/api/v2/evolution-trigger/1/" },
];

describe("CustomModal component", () => {
  beforeEach(() => {
    mockGet.mockClear();
  });

  it("renders the modal body with the Pokémon name", () => {
    render(
      <CustomModal
        pokemon={dummyPokemon}
        triggers={sampleTriggers}
        pageIndex={0}
        onPageChange={() => {}}
        onClose={() => {}}
      />
    );
    expect(screen.getByTestId("modal-body")).toHaveTextContent("pikachu");
  });

  it("renders the modal footer and Close button", async () => {
    render(
      <CustomModal
        pokemon={dummyPokemon}
        triggers={sampleTriggers}
        pageIndex={0}
        onPageChange={() => {}}
        onClose={() => {}}
      />
    );
    expect(screen.getByTestId("modal-footer")).toBeInTheDocument();
    const btn = await screen.findByRole("button", { name: /Close/i });
    expect(btn).toBeInTheDocument();
  });

  it("renders the table with trigger name", () => {
    render(
      <CustomModal
        pokemon={dummyPokemon}
        triggers={sampleTriggers}
        pageIndex={0}
        onPageChange={() => {}}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("level-up")).toBeInTheDocument();
  });
});
