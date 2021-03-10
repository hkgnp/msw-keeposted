import React from 'react';

export default class About extends React.Component {
  componentDidMount = () => {
    document.title = 'msw keeposted: About This App';
  };

  render() {
    return (
      <React.Fragment>
        <p className="px-5 font-weight-bold display-4">
          Keep fellow MSWs posted of resources that you have come across.
        </p>
        <p className="px-5 font-weight-bold" style={{ lineHeight: 2 }}>
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
      </React.Fragment>
    );
  }
}
