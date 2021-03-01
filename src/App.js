import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import PostContent from './components/PostContent';
import Footer from './components/Footer';
import { Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <Container className="parentContainer" fluid={true}>
      <Row>
        <Col>
          <NavigationBar />
        </Col>
      </Row>
      <Row>
        <Col className="postContainer">
          <PostContent />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
