"use client";
import { PAGE_SIZE } from "@/lib/constants";

export type Column<T> = {
  header: string;
  accessor: keyof T;
};

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageIndex: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
}

export default function Table<T>({
  columns,
  data,
  pageIndex,
  totalCount,
  onPageChange,
}: TableProps<T>) {
  const maxPage = Math.ceil(totalCount / PAGE_SIZE) - 1;
  const isFirst = pageIndex <= 0;
  const isLast = pageIndex >= maxPage;

  return (
    <div className="shadow rounded overflow-hidden">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} className="p-2 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {columns.map((col) => (
                <td key={String(col.accessor)} className="p-2">
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                className="p-4 text-center text-gray-500"
                colSpan={columns.length}
              >
                No data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="p-2 flex justify-between items-center">
        <button
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={isFirst}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {maxPage + 1}
        </span>
        <button
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={isLast}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
