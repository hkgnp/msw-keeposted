import React from 'react';
import { Button } from 'reactstrap';
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

  render() {
    // Destructuring and declaring of variables
    const { activeDetails, handleReset } = this.props;
    const { latitude, longitude } = this.state;
    const title = activeDetails.querySelector('h5').innerHTML;
    const category = activeDetails.querySelector('h6').innerHTML;
    const description = activeDetails.querySelectorAll('p')[0].innerHTML;
    const address = activeDetails.querySelectorAll('p')[1].innerHTML;
    const postalCode = activeDetails.querySelectorAll('p')[2].innerHTML;

    return (
      <React.Fragment>
        <div>
          <h1>{title}</h1>
          <p>{category}</p>
          <p>{description}</p>
          <p>{address}</p>
          <p>{postalCode}</p>
          <Button color="primary" onClick={handleReset} className="mb-3">
            Back
          </Button>
        </div>
        <RenderMap latitude={latitude} longitude={longitude} />
      </React.Fragment>
    );
  }
}
