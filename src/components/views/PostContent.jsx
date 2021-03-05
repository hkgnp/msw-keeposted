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
      searchTerm: e.target.value,
      posts: this.searchFunction(),
    });
  };

  // Handle search function
  searchFunction = () => {
    const { posts, searchTerm } = this.state;
    const searchString = searchTerm.toLowerCase();

    let searchResults = posts.filter((p) =>
      p.description.toLowerCase().includes(searchString)
    );

    return searchResults;
  };

  render() {
    const { posts, currentPage, pageSize, searchTerm } = this.state;

    if (posts.length === 0) {
      return (
        <React.Fragment>
          <SearchBar
            searchTerm={searchTerm}
            handleSearchString={this.handleSearchString}
          />
          <p className="postNumber">There are no resources in the database.</p>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <SearchBar
            searchTerm={searchTerm}
            handleSearchString={this.handleSearchString}
          />
          <p
            className="postNumber"
            // style={{ display: searchTerm.length > 0 ? 'none' : 'block' }}
          >
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
