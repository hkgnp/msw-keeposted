import React from 'react';
import RenderPosts from './RenderPosts';
import axios from 'axios';
import SearchBar from '../general/SearchBar';
import MoreDetails from '../views/MoreDetails';
import { Col } from 'reactstrap';
import ViewReviews from '../views/ViewReviews';

export default class PostContent extends React.Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    posts: [],
    loaded: false,
    searchTerm: '',
    moreDetails: false,
    activeDetails: '',
    backdrop: false,
    viewReviews: false,
    reviewId: '',
  };

  // Create div reference to scroll to
  moredetails = React.createRef();

  // Load all data from database
  componentDidMount = async () => {
    document.title = 'msw keeposted: All Resources';
    // let response = await axios.get('posts.json');
    try {
      let response = await axios.get(
        'https://quiet-gorge-29042.herokuapp.com/posts'
      );
      this.setState({
        posts: response.data,
        loaded: true,
      });
    } catch (e) {
      window.location.href = '/error';
      console.log(e);
    }
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
      currentPage: 1,
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
      backdrop: true,
    });
    document.body.classList.add('disablescroll');
  };

  handleReset = () => {
    this.setState({
      activeDetails: '',
      moreDetails: false,
      backdrop: false,
    });
    document.body.classList.remove('disablescroll');
    window.scrollTo(0, 0);
  };

  viewReviews = (e) => {
    console.log(e.target.name);
    this.setState({
      viewReviews: true,
      reviewId: e.target.name,
    });
  };

  render() {
    const {
      posts,
      currentPage,
      pageSize,
      searchTerm,
      moreDetails,
      backdrop,
      activeDetails,
      viewReviews,
      reviewId,
    } = this.state;

    if (posts.length === 0) {
      return (
        <React.Fragment>
          <SearchBar
            searchTerm={searchTerm}
            handleSearchString={this.handleSearchString}
            className="mt-2"
          />
          <p className="postNumber">There are no resources in the database.</p>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {backdrop && <div className="backdrop"></div>}
          <Col style={{ display: 'block' }}>
            <SearchBar
              searchTerm={searchTerm}
              handleSearchString={this.handleSearchString}
            />
            <div>
              {moreDetails && (
                <div className="moredetails">
                  <MoreDetails
                    activeDetails={activeDetails}
                    handleReset={this.handleReset}
                  />
                </div>
              )}
              {viewReviews && (
                <div className="viewReviews">
                  <ViewReviews reviewId={reviewId} />
                </div>
              )}
              <RenderPosts
                posts={this.searchFunction()}
                currentPage={currentPage}
                pageSize={pageSize}
                managePageChange={this.managePageChange}
                moreDetails={this.moreDetails}
                viewReviews={this.viewReviews}
              />
            </div>
          </Col>
        </React.Fragment>
      );
    }
  }
}
