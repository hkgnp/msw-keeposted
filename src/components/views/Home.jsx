import React from 'react';
import { Col, Button } from 'reactstrap';
import '../../App.css';

export default class About extends React.Component {
  componentDidMount = () => {
    document.title = 'msw keeposted: About This App';
  };

  render() {
    return (
      <Col className="home">
        <p className="font-weight-bold" style={{ fontSize: '2rem' }}>
          Keep fellow MSWs posted of resources that you have come across.
        </p>
        <p className="font-weight-bold" style={{ lineHeight: 2 }}>
          Note: As this is a collective resource,{' '}
          <span
            style={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '10px',
              padding: '4px',
            }}
          >
            msw.keeposted
          </span>{' '}
          bears no responsibility for the accuracy of the information found
          here. Instead, we rely on the entire community to ensure that the
          information here can help our own patients.
        </p>
        <h3>
          <Button color="secondary" className="mx-3 p-2" href="/posts">
            <i className="far fa-hand-point-right"></i> Get Started
          </Button>
          <Button color="secondary" className="mx-3 p-2" href="/signup">
            <i className="fas fa-file-signature"></i> Register
          </Button>
        </h3>
      </Col>
    );
  }
}
