import React from 'react';
import Post from './Post';
import HandlePagination from '../general/managePagination';

export default class PostContent extends React.Component {
  state = {
    pageSize: 1,
    currentPage: 1,
    posts: [
      {
        _id: 0,
        title: 'Title 123',
        category: 'Category 123',
        description: 'Description 123',
        location: 310098,
      },
      {
        _id: 1,
        title: 'Title ABC',
        category: 'Category ABC',
        description: 'Description ABC',
        location: 119074,
      },
      {
        _id: 2,
        title: 'Title John Smith',
        category: 'Category Smith',
        description: 'Description Smith',
        location: 650626,
      },
      {
        _id: 3,
        title: 'Title John Smith',
        category: 'Category Smith',
        description: 'Description Smith',
        location: 650626,
      },
      {
        _id: 4,
        title: 'Title John Smith',
        category: 'Category Smith',
        description: 'Description Smith',
        location: 650626,
      },
    ],
  };

  renderPosts = () => {
    return this.state.posts.map((p) => (
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
        <HandlePagination
          postsCount={this.state.posts.length}
          pageSize={this.state.pageSize}
          managePageChange={this.managePageChange}
          currentPage={this.state.currentPage}
        />
      </React.Fragment>
    );
  }
}
