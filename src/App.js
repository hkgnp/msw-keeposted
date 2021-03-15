import React from 'react';
import jwtDecode from 'jwt-decode';
import './App.css';
import NavigationBar from './components/views/NavigationBar';
import Home from './components/views/Home';
import PostContent from './components/views/PostContent';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreatePost from './components/views/CreatePost';
import About from './components/views/About';
import Signup from './components/views/Signup';
import Login from './components/views/Login';
import ErrorPage from './components/views/ErrorPage';
import Dashboard from './components/views/Dashboard';
import EditPost from './components/views/EditPost';

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
        <Container fluid={true}>
          <Row>
            <Col>
              <NavigationBar user={this.state.user} />
            </Col>
          </Row>
          <Row className="contentContainer">
            <Switch>
              <Route path="/posts" component={PostContent} />
              <Route
                path="/createpost"
                render={(props) => (
                  <CreatePost {...props} user={this.state.user} />
                )}
              />
              <Route
                path="/editpost"
                render={(props) => (
                  <EditPost {...props} user={this.state.user} />
                )}
              />
              <Route path="/about" component={About} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/error" component={ErrorPage} />
              <Route
                path="/dashboard"
                render={(props) => (
                  <Dashboard {...props} user={this.state.user} />
                )}
              />
              <Route path="/" component={Home} />
            </Switch>
          </Row>
        </Container>
      </Router>
    );
  }
}
