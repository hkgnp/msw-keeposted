import React from 'react';
import './App.css';
import NavigationBar from './components/views/NavigationBar';
import PostContent from './components/views/PostContent';
import Footer from './components/views/Footer';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreatePost from './components/views/CreatePost';

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
            <Row className="contentContainer">
              <Col>
                <PostContent />
              </Col>
            </Row>
          </Route>
          <Route path="/register">
            <Row className="contentContainer">
              <Col>
                <CreatePost />
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
