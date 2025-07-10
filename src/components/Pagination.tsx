"use client";

import React from "react";
import { PAGE_SIZE } from "@/lib/constants";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  pageIndex,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const maxPage = Math.ceil(totalCount / PAGE_SIZE) - 1;
  const isFirst = pageIndex <= 0;
  const isLast = pageIndex >= maxPage;

  return (
    <div className="px-4 py-3 bg-gray-100 flex justify-between items-center">
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
  );
}
