import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import PostContent from './components/PostContent';
import Footer from './components/Footer';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Container className="parentContainer" fluid={true}>
        <Row>
          <Col>
            <NavigationBar />
          </Col>
        </Row>
        <Switch>
          <Route path="/posts">
            <Row>
              <Col className="postContainer">
                <PostContent />
              </Col>
            </Row>
          </Route>
        </Switch>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
