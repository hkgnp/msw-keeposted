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
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {props.category}
          </CardSubtitle>
          <CardText>{props.description}</CardText>
          <CardText>
            {props.address1} {props.address2}
          </CardText>
          <CardText>Singapore {props.postalcode}</CardText>
          <Button color="info" onClick={props.moreDetails}>
            Details
          </Button>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Post;
