import axios from 'axios';
import React from 'react';
import Review from '../general/Review';
import { Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import rolling from '../../rolling.svg';

export default class ViewReviews extends React.Component {
  state = {
    reviews: [],
    reviewsLoaded: false,
    postingComments: false,
    postId: '',
    name: '',
    review: '',
  };

  getReviews = async () => {
    let searchById = { _id: this.props.reviewId };
    let response = await axios.post(
      'https://quiet-gorge-29042.herokuapp.com/reviews/get',
      searchById
    );
    this.setState({
      reviews: response.data,
      reviewsLoaded: true,
      postId: this.props.reviewId,
      postingReviews: false,
    });
  };

  componentDidMount = async () => {
    this.getReviews();
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ postingReviews: true });
    const { name, review, postId } = this.state;
    await axios({
      method: 'post',
      url: 'https://quiet-gorge-29042.herokuapp.com/reviews/post',
      data: {
        postId: postId,
        name: name,
        review: review,
      },
    });
    this.getReviews();
  };

  render() {
    const { reviews, reviewsLoaded, postingReviews } = this.state;
    const reverseReviews = reviews.reverse();
    const { handleReset } = this.props;

    if (reviewsLoaded === false) {
      return (
        <h1 className="m-0">
          Loading <img src={rolling} alt="rolling" style={{ height: '4rem' }} />
        </h1>
      );
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: '20px',
                height: '15rem',
                width: '100%',
                overflow: 'scroll',
              }}
              className="p-3 mb-2"
            >
              {reverseReviews.map((c) => (
                <Review
                  key={c._id}
                  name={c.name}
                  date={c.date}
                  review={c.review}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label>
                  <b>Post a Review</b>
                </Label>
                <Input
                  onChange={this.handleForm}
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="Enter your name"
                />
                <Input
                  onChange={this.handleForm}
                  type="textarea"
                  name="review"
                  rows="2"
                  placeholder="Please post your review!"
                  value={this.state.review}
                />
              </FormGroup>
              <Button onClick={this.handleSubmit}>Post Review</Button>
              <Button color="danger" className="ml-2" onClick={handleReset}>
                Back
              </Button>
              &nbsp;&nbsp;
              {postingReviews && (
                <img src={rolling} alt="rolling" style={{ height: '2rem' }} />
              )}
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}
