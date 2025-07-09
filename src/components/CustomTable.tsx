import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

type Pokemon = { name: string; url: string };

export default function PokemonTable({
  data,
  onRowClick,
}: {
  data: Pokemon[];
  onRowClick: (name: string) => void;
}) {
  const columns: ColumnDef<Pokemon>[] = [
    { accessorKey: "name", header: "Name" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full table-auto">
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((h) => (
              <th key={h.id} className="px-4 py-2 text-left">
                {flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => onRowClick(row.original.name)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
