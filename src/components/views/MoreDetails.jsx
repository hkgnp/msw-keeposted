import React from 'react';
import { Button, Row, Col } from 'reactstrap';
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
    postTitle: '',
    imageResize: false,
    imageLink: '',
  };

  componentDidMount = async () => {
    let response = await axios.get(
      'https://developers.onemap.sg/commonapi/search',
      {
        params: {
          searchVal: this.props.activeDetails.querySelectorAll('p')[2]
            .innerHTML,
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
    const image = this.props.activeDetails.querySelector('img').src;
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

  render() {
    // Destructuring and declaring of variables
    const { activeDetails, handleReset } = this.props;
    const { latitude, longitude, imageResize, imageLink } = this.state;
    const title = activeDetails.querySelector('h5').innerHTML;
    const category = activeDetails.querySelector('span').innerHTML;
    const description = activeDetails.querySelectorAll('p')[0].innerHTML;
    const address = activeDetails.querySelectorAll('p')[1].innerHTML;
    const postalCode = activeDetails.querySelectorAll('p')[2].innerHTML;
    const image = activeDetails.querySelector('img').src;

    return (
      <React.Fragment>
        {imageResize && (
          <div className="resize-moredetailsimage">
            <img alt="Original Size" src={imageLink} />
            <span className="close" onClick={this.imageResizeClose}>
              <h1 className="text-light">&times;</h1>
            </span>
          </div>
        )}
        <Row className="mb-3">
          <Col>
            <h1 className="text-center">{title}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Category: {category}</p>
            <p>Description: {description}</p>
            <p>Address: {address}</p>
            <p>Postal Code: {postalCode}</p>
            <Button color="primary" onClick={handleReset} className="mb-3">
              Back
            </Button>
          </Col>
          <Col>
            <img
              className="moredetailsimage"
              src={image}
              onClick={this.imageResize}
              alt=""
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <RenderMap
              className="rendermap"
              latitude={latitude}
              longitude={longitude}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
