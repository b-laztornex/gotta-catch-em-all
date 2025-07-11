import React from "react";

interface TablePaginationProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageChange: (newPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  onPageChange,
}) => (
  <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
    <button
      onClick={() => onPageChange(pageIndex - 1)}
      disabled={!canPreviousPage}
      className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
    >
      Prev
    </button>
    <span className="text-sm">
      Page {pageIndex + 1} of {pageCount}
    </span>
    <button
      onClick={() => onPageChange(pageIndex + 1)}
      disabled={!canNextPage}
      className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
    >
      Next
    </button>
  </div>
);

export default TablePagination;
