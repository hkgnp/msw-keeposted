import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {},
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
    e.preventDefault();
    const { email, password } = this.state;
    let payLoad = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      'https://7000-sapphire-primate-zs7xes07.ws-us03.gitpod.io/user/login',
      payLoad
    );
    const jwt = response.data.date.token;
    console.log(jwt);
    localStorage.setItem('token', jwt);
    window.location.href = '/';
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
      </Col>
    );
  }
}
