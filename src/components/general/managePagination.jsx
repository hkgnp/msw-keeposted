import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const managePagination = (props) => {
  // Get variables to calculate number of pages
  const pageSize = props.pageSize;
  const postsCount = props.postsCount;
  const managePageChange = props.managePageChange;
  const currentPage = props.currentPage;

  // Calculate number of pages
  const pagesCount = Math.round(postsCount / pageSize);
  let numberofPagesArray = [];
  for (let i = 1; i < pagesCount + 1; i++) {
    numberofPagesArray.push(i);
  }

  const renderPages = () => {
    return numberofPagesArray.map((p) => (
      <PaginationItem className={p === currentPage ? 'active' : null}>
        <PaginationLink onClick={() => managePageChange(p)}>{p}</PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <Pagination aria-label="Page navigation" style={{ padding: '0 18px' }}>
      {renderPages()}
    </Pagination>
  );
};
export default managePagination;
