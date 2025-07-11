import "../app/globals.css";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Table from "@/components/CustomTable";
import { Column } from "@/lib/types";
import CustomModal from "@/components/CustomModal";
import { getPokemonList, getPokemonDetail } from "@/lib/api";
import type { PokemonDetail, NamedAPIResource, PagedResult } from "@/lib/types";

interface Props {
  listData: PagedResult<NamedAPIResource>;
  initialPage: number;
  initialFilter: string;
  modalData: PokemonDetail | null;
}

export default function HomePage({
  listData,
  initialPage,
  initialFilter,
  modalData,
}: Props) {
  const router = useRouter();
  const [page, setPage] = useState(initialPage);
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    setFilter(initialFilter);
    setPage(initialPage);
  }, [initialFilter, initialPage]);

  const columns: Column<NamedAPIResource>[] = [
    { header: "Name", accessor: "name" },
  ];

  const handleRowClick = (name: string) => {
    router.push(
      {
        pathname: "/",
        query: { page, filter, modal: name },
      },
      undefined
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push({ pathname: "/", query: { page: newPage, filter } });
  };

  const closeModal = () => {
    const { modal, ...keep } = router.query;
    router.push({ pathname: "/", query: keep });
  };

  return (
    <div className="p-8 space-y-6">
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => {
          const v = e.target.value;
          setFilter(v);
          setPage(0);
          router.push({ pathname: "/", query: { page: 0, filter: v } });
        }}
        className="border p-2 rounded w-full mb-4"
      />

      <Table
        columns={columns}
        data={listData.results}
        pageIndex={page}
        totalCount={listData.count}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
      />

      {modalData && <CustomModal pokemon={modalData} onClose={closeModal} />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const page = parseInt((query.page as string) || "0", 10);
  const filter = (query.filter as string) || "";
  const modal = query.modal as string | undefined;

  // 1) list or exact‐match filter
  let listData: PagedResult<NamedAPIResource>;
  if (filter) {
    try {
      const detail = await getPokemonDetail(filter.toLowerCase());
      listData = {
        count: 1,
        results: [{ name: detail.name, url: detail.species.url }],
      };
    } catch {
      listData = { count: 0, results: [] };
    }
  } else {
    listData = await getPokemonList(page);
  }

  // 2) modal detail
  let modalData: PokemonDetail | null = null;
  if (modal) {
    try {
      modalData = await getPokemonDetail(modal.toLowerCase());
    } catch {
      modalData = null;
    }
  }

  return {
    props: {
      listData,
      initialPage: page,
      initialFilter: filter,
      modalData,
    },
  };
};
