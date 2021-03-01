import React from 'react';
import Post from './Post';
import ManagePagination from '../general/ManagePagination';
import Paginate from '../general/Paginate';

export default class PostContent extends React.Component {
  state = {
    pageSize: 3,
    currentPage: 1,
    posts: [
      {
        _id: 0,
        title: 'Title 1',
        category: 'Category 123',
        description: 'Description 123',
        location: 310098,
      },
      {
        _id: 1,
        title: 'Title 2',
        category: 'Category ABC',
        description: 'Description ABC',
        location: 119074,
      },
      {
        _id: 2,
        title: 'Title 3',
        category: 'Category Smith',
        description: 'Description Smith',
        location: 650626,
      },
      {
        _id: 3,
        title: 'Title 4',
        category: 'Category Smith',
        description: 'Description Smith',
        location: 650626,
      },
      {
        _id: 4,
        title: 'Title 5',
        category: 'Category Smith',
        description: 'Description Smith',
        location: 650626,
      },
      {
        _id: 5,
        title: 'Title 6',
        category: 'Category Smith',
        description: 'Description Smith',
        location: 650626,
      },
    ],
  };

  renderPosts = () => {
    const allPosts = Paginate(
      this.state.posts,
      this.state.currentPage,
      this.state.pageSize
    );

    return allPosts.map((p) => (
      <Post
        key={p._id}
        title={p.title}
        category={p.category}
        description={p.description}
        location={p.location}
      />
    ));
  };

  managePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    if (this.state.posts.length === 0)
      return (
        <p className="postNumber">
          There are no resources in the database. Click here to add a new
          resource!
        </p>
      );

    return (
      <React.Fragment>
        <p className="postNumber">
          Showing {this.state.posts.length} posts in the database
        </p>
        <div className="postContainer">{this.renderPosts()}</div>
        <ManagePagination
          postsCount={this.state.posts.length}
          pageSize={this.state.pageSize}
          managePageChange={this.managePageChange}
          currentPage={this.state.currentPage}
        />
      </React.Fragment>
    );
  }
}
