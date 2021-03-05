import React from 'react';
import Post from '../general/Post';
import { Paginate, ManagePagination } from '../general/HandlePagination';
import '../../App.css';

export default class RenderPosts extends React.Component {
  render() {
    // Destructure
    const { posts, currentPage, pageSize } = this.props;
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
              title={p.title}
              category={p.category}
              description={p.description}
              location={p.location}
            />
          ))}
        </div>
        <ManagePagination
          postsCount={posts.length}
          pageSize={pageSize}
          managePageChange={this.managePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}
