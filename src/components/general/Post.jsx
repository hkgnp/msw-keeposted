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
    <React.Fragment>
      <Card className="cardDesign">
        {/* <CardImg top width="100%" src="" alt="Card image cap" /> */}
        <CardBody>
          <CardImg
            top
            width="100%"
            src={`https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/ObjectId("${props.imageRef}")`}
            alt="Resource image"
          />
          <CardTitle tag="h5">{props.title}</CardTitle>
          <CardTitle tag="h6">{props.username}</CardTitle>
          <CardSubtitle tag="span">{props.category}</CardSubtitle>
          <CardText className="mt-3">{props.description}</CardText>
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
    </React.Fragment>
  );
};

export default Post;
