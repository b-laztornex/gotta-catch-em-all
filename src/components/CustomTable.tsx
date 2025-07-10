"use client";

import React from "react";
import type { Column } from "@/lib/types";
import Pagination from "./Pagination";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageIndex: number;
  totalCount: number;
  isLoading?: boolean;
  errorMsg?: string;
  onPageChange: (newPage: number) => void;
  onRowClick: (name: string) => void;
}

export default function CustomTable<T extends { name: string }>({
  columns,
  data,
  pageIndex,
  totalCount,
  isLoading = false,
  errorMsg,
  onPageChange,
  onRowClick,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-600">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-4 text-center">
                Loading…
              </td>
            </tr>
          )}
          {errorMsg && !isLoading && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-4 text-center text-red-600"
              >
                Error: {errorMsg}
              </td>
            </tr>
          )}
          {!isLoading && !errorMsg && data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-400"
              >
                No data available.
              </td>
            </tr>
          )}
          {!isLoading &&
            !errorMsg &&
            data.map((row, idx) => (
              <tr
                key={idx}
                className={`cursor-pointer ${
                  idx % 2 === 0
                    ? "bg-white hover:bg-blue-50"
                    : "bg-gray-50 hover:bg-blue-50"
                }`}
                onClick={() => onRowClick(row.name)}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                  >
                    {String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  );
}
