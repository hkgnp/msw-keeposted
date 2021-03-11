import axios from 'axios';
import React from 'react';

export default class ViewReviews extends React.Component {
  state = {
    comments: [],
  };

  componentDidMount = async () => {
    let searchById = { _id: this.props.reviewId };
    let response = await axios.get(
      'https://quiet-gorge-29042.herokuapp.com/reviews/get',
      searchById
    );
    let comments = response.data;

    this.setState({
      comments: comments,
    });
  };

  render() {
    const { comments } = this.state;
    return (
      <React.Fragment>
        {comments.map((c) => (
          <p>
            {c.date} <br />
            {c.comments}
          </p>
        ))}
      </React.Fragment>
    );
  }
}
