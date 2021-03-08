import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Manages the pagination
export const ManagePagination = (props) => {
  // Destructure variables to calculate number of pages
  const { pageSize, postsCount, managePageChange, currentPage } = props;

  // Calculate number of pages
  const pagesCount = Math.ceil(postsCount / pageSize);
  let numberofPagesArray = [];
  for (let i = 1; i < pagesCount + 1; i++) {
    numberofPagesArray.push(i);
  }

  // Sets number of pages and whether the active page is selected or not
  const renderPages = () => {
    return numberofPagesArray.map((p) => (
      <PaginationItem key={p} className={p === currentPage ? 'active' : null}>
        <PaginationLink onClick={() => managePageChange(p)}>{p}</PaginationLink>
      </PaginationItem>
    ));
  };

  return <Pagination aria-label="Page navigation">{renderPages()}</Pagination>;
};

// Manages which posts to display depending on which page is selected
export const Paginate = (posts, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  if (pageNumber === 1) {
    return posts.slice(startIndex, pageSize);
  } else {
    let endIndex = (startIndex / (pageNumber - 1)) * pageNumber;
    return posts.slice(startIndex, endIndex);
  }
};
