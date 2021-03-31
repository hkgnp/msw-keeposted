import React from 'react';
import { Col } from 'reactstrap';

export default class ErrorPage extends React.Component {
  componentDidMount = () => {
    document.title = 'msw keeposted: About This App';
  };

  render() {
    return (
      <Col>
        <h1>Please Bear With Us</h1>
        <p>
          There is an error retrieving the data from the database. Our engineers
          are already fixing the issue. Please wait a while and <a href="https://suspicious-northcutt-d2f899.netlify.app/posts">click here to try again</a>.
        </p>
      </Col>
    );
  }
}
