import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

const Post = (props) => {
  return (
    <Card className="cardDesign">
      <CardBody>
        <CardImg
          top
          width="100%"
          src={`https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/${props.imageRef}`}
          alt="Resource image"
        />
        <CardTitle tag="h5">{props.title}</CardTitle>
        {props.categories.map((c) => (
          <CardSubtitle key={c} tag="span" className="mr-1">
            {c}
          </CardSubtitle>
        ))}
        <CardText className="mt-3" style={{ whiteSpace: 'pre-wrap' }}>
          {props.description}
        </CardText>
        <CardText className="font-italic">
          {props.address1} {props.address2}
        </CardText>
        <CardText className="span">Singapore {props.postalcode}</CardText>
        <Button
          color="info"
          size="sm"
          name={props.imageRef}
          onClick={props.moreDetails}
        >
          Details
        </Button>
        <Button
          size="sm"
          className="ml-2"
          name={props.imageRef}
          onClick={props.viewReviews}
        >
          Reviews
        </Button>
      </CardBody>
    </Card>
  );
};

export default Post;
