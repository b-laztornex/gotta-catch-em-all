import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getPokemonList } from "@/lib/api";
import { PAGE_SIZE } from "@/lib/constants";
import type { NamedAPIResource } from "@/lib/types";

interface Props {
  results: NamedAPIResource[];
  count: number;
  pageIndex: number;
}

export default function Home({ results, count, pageIndex }: Props) {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const maxPage = Math.ceil(count / PAGE_SIZE) - 1;

  const applyFilter = () => {
    const name = filter.trim().toLowerCase();
    if (name) router.push(`/pokemon/${name}`);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <input
          type="text"
          placeholder="Exact filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") applyFilter();
          }}
          className="border p-2 rounded w-full"
        />
      </div>

      <table className="w-full border table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          {results.map((p) => (
            <tr key={p.name} className="hover:bg-gray-50">
              <td className="p-2">
                <Link href={`/pokemon/${p.name}`}>{p.name}</Link>
              </td>
            </tr>
          ))}
          {results.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-500">
                No Pokémon found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center">
        <button
          onClick={() => router.push(`/?page=${pageIndex - 1}`)}
          disabled={pageIndex <= 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {maxPage + 1}
        </span>
        <button
          onClick={() => router.push(`/?page=${pageIndex + 1}`)}
          disabled={pageIndex >= maxPage}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const pageIndex = parseInt(
    Array.isArray(query.page) ? query.page[0] : query.page || "0",
    10
  );
  const offset = pageIndex * PAGE_SIZE;

  const { results, count } = await getPokemonList(offset);

  return {
    props: { results, count, pageIndex },
  };
};
