import React from 'react';

import './pagination.css';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  limit: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({currentPage, setCurrentPage, limit}) => {
  const maxPages = Math.ceil(109 / limit);

  const getPrevPage = (currentPage: number, setCurrentPage: (currentPage: number) => void) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getNextPage = (currentPage: number, setCurrentPage: (currentPage: number) => void) => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <div>Current Page: {currentPage}</div>
      <button onClick={() => getPrevPage(currentPage, setCurrentPage)}>
        Previous Page
      </button>
      <button onClick={() => getNextPage(currentPage, setCurrentPage)}>
        Next Page
      </button>
      <div>Total Number of Pages: {maxPages}</div>
    </div>
  );
};

export default Pagination;
