import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import Comment from '../general/Comment';

export default class PostComments extends React.Component {
  state = {
    showComments: true,
    comments: '',
  };

  render() {
    const { comments } = this.state;

    return (
      <React.Fragment>
        {comments.map((c) => (
          <Comment key={c._id} comments={c.comments} />
        ))}
      </React.Fragment>
    );
  }
}
