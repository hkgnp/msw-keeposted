import React from 'react';
import RenderPosts from './RenderPosts';
import axios from 'axios';
import SearchBar from '../general/SearchBar';
import MoreDetails from '../views/MoreDetails';
import { Col, Fade } from 'reactstrap';
import ViewReviews from '../views/ViewReviews';
import loadingImage from '../../rolling.svg';

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
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
  };

  handleReset = () => {
    this.setState({
      activeDetails: '',
      moreDetails: false,
      viewReviews: false,
      backdrop: false,
    });
    window.scrollTo(0, 0);
  };

  viewReviews = (e) => {
    this.setState({
      viewReviews: true,
      reviewId: e.target.name,
      backdrop: true,
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            {this.state.loaded === false && (
              <img
                className="loading-image"
                src={loadingImage}
                alt="Loading spinner"
              />
            )}
          </div>
          {/* <p className="postNumber">There are no resources in the database.</p> */}
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
                <Fade className="moredetails">
                  <MoreDetails
                    activeDetails={activeDetails}
                    handleReset={this.handleReset}
                  />
                </Fade>
              )}
              {viewReviews && (
                <Fade className="viewreviews">
                  <ViewReviews
                    reviewId={reviewId}
                    handleReset={this.handleReset}
                  />
                </Fade>
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
