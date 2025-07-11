"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { PAGE_SIZE } from "@/lib/constants";
import TablePagination from "@/components/ui/TablePagination";

export type SimpleColumn<T> = { header: string; accessor: keyof T };

interface TableProps<T> {
  columns: Array<ColumnDef<T, T> | SimpleColumn<T>>;
  data: T[];
  pageIndex: number;
  totalCount: number;
  isLoading?: boolean;
  errorMsg?: string;
  onPageChange: (newPage: number) => void;
  onRowClick?: (row: T) => void;
}

export default function CustomTable<T>({
  columns,
  data,
  pageIndex,
  totalCount,
  isLoading = false,
  errorMsg,
  onPageChange,
  onRowClick,
}: TableProps<T>) {
  // normalize to ColumnDef<T, T>[]
  const columnDefs = React.useMemo<ColumnDef<T, T>[]>(() => {
    if (!columns.length) return [];
    const first = columns[0] as SimpleColumn<T>;
    if (
      typeof first.accessor !== "undefined" &&
      typeof first.header !== "undefined"
    ) {
      return (columns as SimpleColumn<T>[]).map((col) => ({
        accessorKey: String(col.accessor),
        header: col.header,
        cell: (info) => String(info.getValue()),
      }));
    }
    return columns as ColumnDef<T, T>[];
  }, [columns]);

  const table = useReactTable<T>({
    data,
    columns: columnDefs,
    pageCount: Math.ceil(totalCount / PAGE_SIZE),
    state: { pagination: { pageIndex, pageSize: PAGE_SIZE } },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <TablePagination
        pageIndex={pageIndex}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        onPageChange={onPageChange}
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-600 text-white sticky top-0">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-semibold"
                >
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading && (
            <tr>
              <td colSpan={columnDefs.length} className="px-6 py-4 text-center">
                Loading…
              </td>
            </tr>
          )}
          {errorMsg && !isLoading && (
            <tr>
              <td
                colSpan={columnDefs.length}
                className="px-6 py-4 text-center text-red-600"
              >
                {errorMsg}
              </td>
            </tr>
          )}
          {!isLoading && !errorMsg && table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columnDefs.length}
                className="px-6 py-6 text-center text-gray-400"
              >
                No data available.
              </td>
            </tr>
          )}
          {!isLoading &&
            !errorMsg &&
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`cursor-pointer hover:bg-blue-50 ${
                  row.index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-normal text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <TablePagination
        pageIndex={pageIndex}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        onPageChange={onPageChange}
      />
    </div>
  );
}
