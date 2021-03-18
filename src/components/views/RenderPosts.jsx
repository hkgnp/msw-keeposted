import React from 'react';
import Post from '../general/Post';
import { Paginate, ManagePagination } from '../general/ManagePagination';
import { FormGroup, Input } from 'reactstrap';
import '../../App.css';

export default class RenderPosts extends React.Component {
  render() {
    // Destructure
    const {
      posts,
      currentPage,
      pageSize,
      managePageChange,
      moreDetails,
      viewReviews,
      setResultsPerPage,
    } = this.props;

    // Paginate number of posts based on active page and page size
    const allPosts = Paginate(posts, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="d-flex justify-content-between align-items-center m-0 p-0">
          <span className="postNumber">
            Showing {posts.length} posts in the database
          </span>
          <FormGroup className="m-0">
            <Input
              type="select"
              name="setFilter"
              className="searchfilter resultsPerPage"
              onChange={setResultsPerPage}
            >
              <option value="">Per Page</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </Input>
          </FormGroup>
        </div>
        <div className="postContainer">
          {allPosts.map((p) => (
            <Post
              key={p._id}
              imageRef={p._id}
              title={p.title}
              categories={p.categories}
              description={p.description}
              address1={p.location.address1}
              address2={p.location.address2}
              postalcode={p.location.postalcode}
              moreDetails={moreDetails}
              viewReviews={viewReviews}
            />
          ))}
        </div>
        <ManagePagination
          postsCount={posts.length}
          pageSize={pageSize}
          managePageChange={managePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}
