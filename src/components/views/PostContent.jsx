import React from 'react';
import RenderPosts from '../general/RenderPosts';
import { ManagePagination } from '../general/ManagePagination';
import axios from 'axios';
import SearchBar from '../general/SearchBar';

export default class PostContent extends React.Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    posts: [],
    loaded: false,
    searchTerm: '',
  };

  // Load all data from database
  async componentDidMount() {
    let response = await axios.get('posts.json');
    this.setState({
      posts: response.data,
      loaded: true,
    });
  }

  // Setting current page to active for page navigation
  managePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  // Handling search bar data
  handleSearchString = (e) => {
    // Sets state of searchbar value
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Handle search function
  searchFunction = () => {
    const { posts, searchTerm } = this.state;
    const searchString = searchTerm.toLowerCase();

    return posts.filter((p) =>
      p.description.toLowerCase().includes(searchString)
    );
  };

  render() {
    const { posts, currentPage, pageSize, searchTerm } = this.state;

    if (posts.length === 0) {
      return (
        <p className="postNumber">
          There are no resources in the database. Click here to add a new
          resource!
        </p>
      );
    } else {
      return (
        <React.Fragment>
          <SearchBar
            searchTerm={searchTerm}
            handleSearchString={this.handleSearchString}
          />
          <p className="postNumber">
            Showing {posts.length} posts in the database
          </p>
          <div className="postContainer">
            <RenderPosts
              posts={this.searchFunction()}
              currentPage={currentPage}
              pageSize={pageSize}
            />
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
}
