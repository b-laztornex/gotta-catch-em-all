"use client";

import { useState } from "react";
import CustomTable from "./CustomTable";
import CustomModal from "./CustomModal";

export default function PageClient({
  data,
}: {
  data: { name: string; url: string }[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleRowClick(name: string) {
    setSelected(name);
  }

  return (
    <>
      <CustomTable data={data} onRowClick={handleRowClick} />
      {selected && (
        <CustomModal name={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
