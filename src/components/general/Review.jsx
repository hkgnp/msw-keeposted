import React from 'react';

const Review = (props) => {
  const date = new Date(props.date);

  return (
    <React.Fragment>
      <p>
        <b>{props.name}</b> <i>{date.toString().slice(0, 15)}</i>
        <br />
        {props.review}
      </p>
    </React.Fragment>
  );
};

export default Review;
