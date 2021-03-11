import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Comment = (props) => {
  const { key, comments } = props;

  return (
    <li key={key}>
      <p>{comments}</p>
    </li>
  );
};

export default Comment;
