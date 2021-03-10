import React from 'react';
import jwtDecode from 'jwt-decode';
import './App.css';
import NavigationBar from './components/views/NavigationBar';
import Home from './components/views/Home';
import PostContent from './components/views/PostContent';
import { Container, Row, Col } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CreatePost from './components/views/CreatePost';
import About from './components/views/About';
import Signup from './components/views/Signup';
import Login from './components/views/Login';
import ErrorPage from './components/views/ErrorPage';

export default class App extends React.Component {
  state = {};

  componentDidMount = () => {
    // Get user details from localstorage and decode it to get the details
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      this.setState({
        user: user,
      });
    } catch (e) {}
  };

  render() {
    return (
      <Router>
        <Container className="parentContainer" fluid={true}>
          <Row>
            <Col>
              <NavigationBar user={this.state.user} />
            </Col>
          </Row>
          <Row className="contentContainer">
            <Switch>
              <Route path="/posts" component={PostContent} />
              <Route path="/createpost" component={CreatePost} />
              <Route path="/about" component={About} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/error" component={ErrorPage} />
              <Route path="/" component={Home} />
            </Switch>
          </Row>
          {/* <Switch>
            <Route path="/posts">
              <Row className="contentContainer">
                <PostContent />
              </Row>
            </Route>
            <Route path="/createpost">
              <Row className="contentContainer">
                <Col>
                  <CreatePost />
                </Col>
              </Row>
            </Route>
            <Route path="/about">
              <Row className="contentContainer">
                <Col>
                  <About />
                </Col>
              </Row>
            </Route>
            <Route path="/signup">
              <Row className="contentContainer">
                <Signup />
              </Row>
            </Route>
            <Route path="/login">
              <Row className="contentContainer">
                <Login />
              </Row>
            </Route>
            <Route path="/error">
              <Row className="staticContainer">
                <ErrorPage />
              </Row>
            </Route>
            <Route path="/">
              <Row>
                <Col className="home">
                  <Home />
                </Col>
              </Row>
            </Route>
          </Switch> */}
        </Container>
      </Router>
    );
  }
}
