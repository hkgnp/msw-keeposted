import React from 'react';
import Post from '../general/Post';
import { Paginate, ManagePagination } from '../general/ManagePagination';
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
    } = this.props;

    // Paginate number of posts based on active page and page size
    const allPosts = Paginate(posts, currentPage, pageSize);

    return (
      <React.Fragment>
        <p className="postNumber">
          Showing {posts.length} posts in the database
        </p>
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
