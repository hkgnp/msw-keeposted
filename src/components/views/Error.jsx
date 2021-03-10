import React from 'react';

export default class About extends React.Component {
  componentDidMount = () => {
    document.title = 'msw keeposted: About This App';
  };

  render() {
    return (
      <React.Fragment>
        <h1>About This App</h1>
        <p>
          There is an error retrieving the data from the database. Our engineers
          are already fixing the issue. Please wait.
        </p>
      </React.Fragment>
    );
  }
}
