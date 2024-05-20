import React from "react";

interface Props {
  start: number;
  end: number;
  total: number;
  onNext: VoidFunction;
  onPrev: VoidFunction;
}

export const Pagination = ({start, end, total,  onPrev, onNext}: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex mt-2 xs:mt-0 mb-4">
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 "
          onClick={onPrev}
          disabled={start === 1}
        >
            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>
            Prev
        </button>
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900"
          onClick={onNext}
        >
            Next
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
      <span className="text-sm text-gray-700">
          Showing <span className="font-semibold text-gray-900">{start}</span> to <span className="font-semibold text-gray-90">{end}</span> of <span className="font-semibold text-gray-900 ">{total}</span> Entries
      </span>
    </div>
  );
};
