import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  totalPages, 
  currentPage, 
  onPageChange 
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1); // ReactPaginate uses 0-based indexing
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1} // Convert to 0-based indexing
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      previousLabel="‹"
      nextLabel="›"
      breakLabel="..."
    />
  );
};

export default Pagination;