"use client";

import React from "react";
import { PAGE_SIZE } from "@/lib/constants";
import type { Column } from "@/lib/types";

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
  const maxPage = Math.ceil(totalCount / PAGE_SIZE) - 1;
  const isFirst = pageIndex <= 0;
  const isLast = pageIndex >= maxPage;

  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
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

      <div className="px-4 py-3 bg-gray-100 flex justify-between items-center rounded-b-lg">
        <button
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={isFirst}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {pageIndex + 1} of {maxPage + 1}
        </span>
        <button
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={isLast}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
