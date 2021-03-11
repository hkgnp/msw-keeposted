import React from 'react';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';

export default class About extends React.Component {
  componentDidMount = () => {
    document.title = 'msw keeposted: About This App';
  };

  render() {
    return (
      <Col>
        <h1 style={{ color: '#e86632' }}>About This App</h1>
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          quasi sunt consectetur possimus explicabo placeat deserunt repudiandae
          provident illum sequi, laboriosam cumque temporibus facere qui ex
          voluptates aliquid fuga obcaecati?
        </p>
        <h2 style={{ marginTop: '2rem' }}>Contact</h2>
        <p>
          <ListGroup>
            <ListGroupItem>
              <i class="fab fa-github"></i> Github
            </ListGroupItem>
            <ListGroupItem>
              <i class="fas fa-at"></i> Email
            </ListGroupItem>
          </ListGroup>
        </p>
      </Col>
    );
  }
}
