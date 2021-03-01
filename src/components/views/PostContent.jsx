import React from 'react';
import Post from './Post';
import ManagePagination from '../general/ManagePagination';
import Paginate from '../general/Paginate';
import axios from 'axios';

export default class PostContent extends React.Component {
  state = {
    pageSize: 3,
    currentPage: 1,
    posts: [],
    loaded: false,
  };

  async componentDidMount() {
    let response = await axios.get('posts.json');
    this.setState({
      posts: response.data,
      loaded: true,
    });
  }

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
