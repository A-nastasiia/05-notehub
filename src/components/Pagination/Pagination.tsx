
import React from "react";
import ReactPaginate from "react-paginate";

import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;

  nextLabel?: React.ReactNode;
  previousLabel?: React.ReactNode;
  breakLabel?: React.ReactNode;
  pageRangeDisplayed?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
  nextLabel = "→",
  previousLabel = "←",
  breakLabel = "...",
  pageRangeDisplayed = 3,
  ...restProps
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      breakLabel={breakLabel}
      nextLabel={nextLabel}
      onPageChange={handlePageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      previousLabel={previousLabel}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      {...restProps}
    />
  );
};

export default Pagination;