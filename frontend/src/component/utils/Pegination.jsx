import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  // Calculate the range of pages to show
  const getPageRange = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust if we're at the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPageRange();

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* First Page */}
      {!pages.includes(1) && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-10 h-10 rounded-lg ${
              currentPage === 1
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            1
          </button>
          {!pages.includes(2) && <span className="px-2">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === page
              ? "bg-indigo-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {!pages.includes(totalPages) && totalPages > 0 && (
        <>
          {!pages.includes(totalPages - 1) && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-lg ${
              currentPage === totalPages
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
