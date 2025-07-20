import React from "react";

type PaginationProps = {
  totalPages: number;
  page: number;
  onPrevious: () => void;
  onNext: () => void;
  onNumberClick: (index: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  page,
  onPrevious,
  onNext,
  onNumberClick,
}) => {
  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex text-sm">
          <li>
            <button
              onClick={onPrevious}
              disabled={page === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-r-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700" // styling
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => onNumberClick(index)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
                  page === index + 1
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={onNext}
              disabled={page === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700" // styling
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
