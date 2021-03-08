import React from 'react';
import { Button } from 'reactstrap';
import '../../App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

  setZoom = () => {
    console.log(
      L.map('mapid').setView([this.state.latitude, this.state.longitude], 15)
    );
  };

  render() {
    const { activeDetails, handleReset } = this.props;
    const { latitude, longitude } = this.state;
    const title = activeDetails.querySelector('h5').innerHTML;
    const category = activeDetails.querySelector('h6').innerHTML;
    const description = activeDetails.querySelectorAll('p')[0].innerHTML;
    const address = activeDetails.querySelectorAll('p')[1].innerHTML;
    const postalCode = activeDetails.querySelectorAll('p')[2].innerHTML;

    return (
      <div>
        <div>
          <h1>{title}</h1>
          <p>{category}</p>
          <p>{description}</p>
          <p>{address}</p>
          <p>{postalCode}</p>
          <Button color="danger" onClick={handleReset} className="mb-3">
            Reset
          </Button>
        </div>
        <MapContainer
          center={[1.35, 103.82]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: '300px' }}
          id="mapid"
          onChange={this.setZoom}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGtnbnAiLCJhIjoiY2trb3YxbTl6MDAyMjJxanExYTNwZjZ6YiJ9.gPU5MhHFseHNRjeex2poNg"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}
