import React from "react";

jest.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  DialogContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  DialogClose: ({ children }: any) => <>{children}</>,
}));

import { render, screen, waitFor } from "@testing-library/react";
import CustomModal from "@/components/CustomModal";
import { getEvolutionTriggers } from "@/lib/api";
import type { NamedAPIResource, PokemonDetail } from "@/lib/types";

// Mock API
jest.mock("@/lib/api");
const mockGet = getEvolutionTriggers as jest.MockedFunction<
  typeof getEvolutionTriggers
>;

const dummyPokemon: PokemonDetail = {
  name: "pikachu",
  height: 4,
  weight: 60,
  sprites: { front_default: "pikachu.png" },
  species: { url: "" },
} as PokemonDetail;

const sampleTriggers: NamedAPIResource[] = [
  { name: "level-up", url: "https://pokeapi.co/api/v2/evolution-trigger/1/" },
];
const paged = { count: 1, results: sampleTriggers };

describe("CustomModal component", () => {
  beforeEach(() => {
    mockGet.mockClear();
  });

  it("renders title and image", async () => {
    mockGet.mockResolvedValue(paged);
    render(<CustomModal pokemon={dummyPokemon} onClose={() => {}} />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "pikachu"
    );
    expect((screen.getByAltText("pikachu") as HTMLImageElement).src).toContain(
      "pikachu.png"
    );
  });

  it("renders Close button", async () => {
    mockGet.mockResolvedValue(paged);
    render(<CustomModal pokemon={dummyPokemon} onClose={() => {}} />);
    const btn = await screen.findByRole("button", { name: /Close/i });
    expect(btn).toBeInTheDocument();
  });

  it("shows loading indicator then hides it when data loads", async () => {
    let resolver: (data: any) => void;
    const pending = new Promise<any>((res) => {
      resolver = res;
    });
    mockGet.mockReturnValue(pending);

    render(<CustomModal pokemon={dummyPokemon} onClose={() => {}} />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();

    resolver!(paged);
    await waitFor(() =>
      expect(screen.queryByText("Loading…")).not.toBeInTheDocument()
    );
  });

  it("displays error when fetch fails", async () => {
    mockGet.mockRejectedValue(new Error("network error"));
    render(<CustomModal pokemon={dummyPokemon} onClose={() => {}} />);

    await waitFor(() =>
      expect(screen.getByText(/^Error:/)).toBeInTheDocument()
    );
    expect(screen.getByText("Error: network error")).toBeInTheDocument();
  });

  it("renders triggers table and pagination", async () => {
    mockGet.mockResolvedValue(paged);
    render(<CustomModal pokemon={dummyPokemon} onClose={() => {}} />);
    await screen.findByText("level-up");
    expect(screen.getByText("Trigger Name")).toBeInTheDocument();
    expect(screen.getByText("URL")).toBeInTheDocument();
    expect(screen.getByText("level-up")).toBeInTheDocument();
    expect(screen.getByText(sampleTriggers[0].url)).toBeInTheDocument();
    const pages = screen.getAllByText(/Page 1 of 1/);
    expect(pages.length).toBe(2);
    const prevBtns = screen.getAllByRole("button", { name: /Previous/i });
    const nextBtns = screen.getAllByRole("button", { name: /Next/i });
    prevBtns.forEach((btn) => expect(btn).toBeDisabled());
    nextBtns.forEach((btn) => expect(btn).toBeDisabled());
  });
});
