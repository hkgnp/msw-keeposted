import axios from 'axios';
import React from 'react';
import Review from '../general/Review';

export default class ViewReviews extends React.Component {
  state = {
    comments: [],
  };

  componentDidMount = async () => {
    let searchById = { _id: this.props.reviewId };
    let response = await axios.post(
      'https://quiet-gorge-29042.herokuapp.com/reviews/get',
      searchById
    );
    this.setState({
      comments: response.data,
    });
  };

  render() {
    const { comments } = this.state;

    return (
      <React.Fragment>
        <div>
          {comments.map((c) => (
            <Review key={c._id} date={c.date} comments={c.comments} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
