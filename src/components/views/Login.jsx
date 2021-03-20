import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';
import loadingImage from '../../rolling.svg';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {},
    loaded: '',
    loginerror: '',
  };

  componentDidMount = () => {
    document.title = 'msw keeposted: Login';
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  };

  handleSubmit = async (e) => {
    // Activate loading image
    this.setState({
      loaded: false,
      loginerror: '',
    });

    // Continue with submit process
    e.preventDefault();
    const { email, password } = this.state;
    const baseUrl = 'https://quiet-gorge-29042.herokuapp.com';
    let response = '';

    try {
      response = await axios({
        method: 'post',
        url: `${baseUrl}/user/login`,
        data: {
          email: email,
          password: password,
        },
      });
      // Get token
      const jwt = response.data.date.token;

      // Store token in local storage
      localStorage.setItem('token', jwt);

      // Redirect to main page
      window.location = '/';
    } catch (e) {
      this.setState({
        loginerror: e.response.data,
        loaded: true,
      });
    }
  };

  handleReset = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  };

  render() {
    // Destructure for validation function
    const { email, password } = this.state.errors;

    return (
      <Col style={{ width: '50%' }}>
        {/* Sign Up Form */}
        <h1>Log In</h1>
        <Form>
          <FormGroup>
            <Label for="email">Username</Label>
            <Input
              onChange={this.handleForm}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={this.state.email}
            />
            {email ? (
              <div className="alert-sm alert-danger p-2">{email}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              onChange={this.handleForm}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
            />
            {password ? (
              <div className="alert-sm alert-danger p-2">{password}</div>
            ) : null}
          </FormGroup>
          <Button color="primary" className="mt-2" onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button
            color="danger"
            className="mx-2 mt-2"
            onClick={this.handleReset}
          >
            Reset
          </Button>
        </Form>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.state.loaded === false && (
            <img src={loadingImage} alt="loading..." />
          )}
          {this.state.loginerror && (
            <div className="alert-sm alert-danger p-2">
              {this.state.loginerror}
            </div>
          )}
        </div>
      </Col>
    );
  }
}
