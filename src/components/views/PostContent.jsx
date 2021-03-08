import React from 'react';
import RenderPosts from './RenderPosts';
import axios from 'axios';
import SearchBar from '../general/SearchBar';
import MoreDetails from '../views/MoreDetails';
import { Col } from 'reactstrap';

export default class PostContent extends React.Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    posts: [],
    loaded: false,
    searchTerm: '',
    moreDetails: false,
    activeDetails: '',
  };

  // Create div reference to scroll to
  moredetails = React.createRef();

  // Load all data from database
  componentDidMount = async () => {
    document.title = 'msw keeposted: All Resources';
    let response = await axios.get('posts.json');
    this.setState({
      posts: response.data,
      loaded: true,
    });
  };

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

  moreDetails = (e) => {
    this.setState({
      activeDetails: e.target.parentNode,
      moreDetails: true,
    });
    // this.moredetails.current.scrollIntoView();
  };

  handleReset = () => {
    this.setState({
      activeDetails: '',
      moreDetails: false,
    });
    window.scrollTo(0, 0);
  };

  render() {
    const {
      posts,
      currentPage,
      pageSize,
      searchTerm,
      moreDetails,
      activeDetails,
    } = this.state;

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
        <Col style={{ display: 'block' }}>
          <SearchBar
            searchTerm={searchTerm}
            handleSearchString={this.handleSearchString}
          />
          <div>
            {moreDetails && (
              <div ref={this.moredetails} className="moredetails">
                <MoreDetails
                  activeDetails={activeDetails}
                  handleReset={this.handleReset}
                />
              </div>
            )}
            <RenderPosts
              posts={this.searchFunction()}
              currentPage={currentPage}
              pageSize={pageSize}
              managePageChange={this.managePageChange}
              moreDetails={this.moreDetails}
            />
          </div>
        </Col>
      );
    }
  }
}
