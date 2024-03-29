import React from 'react';
import { Badge, Button, Row, Col, Fade } from 'reactstrap';
import '../../App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import RenderMap from '../general/RenderMap';
import axios from 'axios';

export default class MoreDetails extends React.Component {
  state = {
    latitude: '',
    longitude: '',
    post: '',
    postId: '',
    postLoaded: false,
    imageResize: false,
    imageLink: '',
  };

  getPost = async () => {
    // const searchById = { _id: this.props.postId };
    // const response = await axios.post(
    //   'https://msw-keeposted-api.herokuapp.com/resource',
    //   searchById
    // );

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const searchById = { _id: postId };
    const response = await axios.post(
      'https://msw-keeposted-api.herokuapp.com/resource',
      searchById
    );

    this.setState({
      post: response.data,
      postLoaded: true,
    });
  };

  componentDidMount = async () => {
    await this.getPost();
    const { postalcode } = this.state.post.location;
    let response = await axios.get(
      'https://developers.onemap.sg/commonapi/search',
      {
        params: {
          searchVal: postalcode,
          returnGeom: 'Y',
          getAddrDetails: 'Y',
          pageNum: '1',
        },
      }
    );

    this.setState({
      latitude: response.data.results[0].LATITUDE,
      longitude: response.data.results[0].LONGITUDE,
    });
  };

  imageResize = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const image = `https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/${postId}`;

    this.setState({
      imageResize: true,
      imageLink: image,
    });
  };

  imageResizeClose = () => {
    this.setState({
      imageResize: false,
    });
  };

  handleDelete = async () => {
    const baseUrl = 'https://msw-keeposted-api.herokuapp.com';
    await axios({
      method: 'delete',
      url: `${baseUrl}/delete-resource`,
      data: {
        id: this.props.postId,
      },
    });
    window.location = '/posts';
  };

  handleEdit = (e) => {
    this.setState({
      moreDetails: false,
    });
    window.location = `/editpost?id=${e.target.name}`;
  };

  render() {
    // Destructuring and declaring of variables
    const { latitude, longitude, imageResize, imageLink, postLoaded, post } =
      this.state;
    const { title, categories, description, location, date } = this.state.post;
    const formatDate = new Date(date);

    if (postLoaded === false) {
      return <h1>Loading ...</h1>;
    } else {
      return (
        <Col>
          {imageResize && (
            <Fade>
              <span className="close" onClick={this.imageResizeClose}>
                <h1 className="text-light xbutton">&times;</h1>
              </span>
              <img
                className="resize-moredetailsimage"
                alt="Original Size"
                src={imageLink}
              />
            </Fade>
          )}
          <Row className="mb-3">
            <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* <h1 className="closemoredetails" onClick={handleReset}>
                &times;
              </h1> */}
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="mb-4">{title}</h2>
              <p>
                <Badge className="bg-info">Categories</Badge>{' '}
                {categories.join(', ')}
              </p>
              <p>
                <Badge className="bg-info">Description</Badge> {description}
              </p>
              <p>
                <Badge className="bg-info">Address</Badge> {location.address1}{' '}
                {location.address2}
              </p>
              <p>
                <Badge className="bg-info">Date posted</Badge>{' '}
                {formatDate.toString().slice(0, 15)}
              </p>
              <Button
                name={post._id}
                size="sm"
                color="warning"
                onClick={this.handleEdit}
                className="mb-3 mr-2"
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={this.handleDelete}
                className="mb-3"
              >
                Delete
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <img
                className="moredetailsimage"
                src={`https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/${post._id}`}
                onClick={this.imageResize}
                alt="Resource"
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <RenderMap
                className="rendermap"
                latitude={latitude}
                longitude={longitude}
                address1={location.address1}
                address2={location.address2}
                postalcode={location.postalcode}
              />
            </Col>
          </Row>
        </Col>
      );
    }
  }
}
