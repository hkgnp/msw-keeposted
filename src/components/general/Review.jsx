import React from 'react';

const Review = (props) => {
  const date = new Date(props.date);

  return (
    <React.Fragment>
      <p>
        {date.toString().slice(0, 15)} <br />
        {props.comments}
      </p>
    </React.Fragment>
  );
};

export default Review;
