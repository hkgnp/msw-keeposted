import React from 'react';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';

export default class About extends React.Component {
  componentDidMount = () => {
    document.title = 'msw keeposted: About This App';
  };

  render() {
    return (
      <Col>
        <h1>About This App</h1>
        <p>
          msw keeposted is a community-driven site that allows medical social
          workers to be updated of the latest resources that can be tapped on
          for their patients.
        </p>
        <p>
          msw keeposted is meant to be <b>community-curated</b>. This means that
          while only registered users can post resources to the site, regular
          users who have tried a particular resource can leave a review for
          other users to see. We believe this approach helps us to continue to
          harness the inter-connectedness we share.
        </p>
        <h2 style={{ marginTop: '2rem' }}>Tech Credits</h2>
        <p>This project is only possible due to the following technologies:</p>
        <ul>
          <li>Github</li>
          <li>Node</li>
          <li>React</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>Heroku</li>
          <li>reactstrap</li>
          <li>Bootstrap</li>
          <li>Google Fonts</li>
          <li>Font Awesome</li>
          <li>Axios</li>
          <li>Build with VS Code</li>
        </ul>
        <h2 style={{ marginTop: '2rem' }}>Contact</h2>
        <p>
          <ListGroup>
            <ListGroupItem>
              <i className="fab fa-github"></i>{' '}
              <a href="https://www.github.com/hkgnp" style={{ color: 'black' }}>
                <u>Github</u>
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <i className="fas fa-at"></i>{' '}
              <a href="mailto:hkgnp.git@gmail.com" style={{ color: 'black' }}>
                <u>Email</u>
              </a>
            </ListGroupItem>
          </ListGroup>
        </p>
      </Col>
    );
  }
}
