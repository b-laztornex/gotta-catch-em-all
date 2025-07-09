import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

interface RowWithName {
  name: string;
  [key: string]: any;
}

interface CustomTableProps<T extends RowWithName> {
  data: T[];
  columns?: ColumnDef<T>[];
  onRowClick?: (name: T["name"]) => void;
  pageIndex: number;
  onPageChange: (newIndex: number) => void;
  pageSize: number;
  totalCount: number;
}

export default function CustomTable<T extends RowWithName>({
  data,
  columns,
  onRowClick,
  pageIndex,
  onPageChange,
  pageSize,
  totalCount,
}: CustomTableProps<T>) {
  const defaultColumns: ColumnDef<T>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
  ];
  const cols = columns ?? defaultColumns;
  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
  });

  const maxPage = Math.ceil(totalCount / pageSize) - 1;

  const isFirst = pageIndex === 0;
  const isLast = pageIndex >= maxPage;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {table.getRowModel().rows.map((row, ri) => {
            const clickHandler = onRowClick
              ? () => onRowClick(row.original.name)
              : undefined;
            const stripeBg = ri % 2 === 0 ? "bg-white" : "bg-gray-50";
            return (
              <tr
                key={row.id}
                onClick={clickHandler}
                className={`${stripeBg} ${
                  clickHandler ? "hover:bg-gray-100 cursor-pointer" : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <button
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={isFirst}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {pageIndex + 1}</span>
        <button
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={isLast}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
