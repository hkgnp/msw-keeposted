import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import RegisterUser from '../general/RegisterUser';

export default class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    errors: '',
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const errors = await RegisterUser({ name, email, password });
    this.setState({
      errors: errors,
    });
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
    const { name, email, password } = this.state.errors;

    return (
      <React.Fragment>
        <Col className="signup_instructions">
          <h1>Some instructions text</h1>
          <p>Sign up for an account to</p>
          <ul>
            <li>Post resources</li>
            <li>Keep track of bookmarked resources</li>
          </ul>
          <h1>We take your privacy seriously</h1>
          <p>We do not share your data with anyone.</p>
        </Col>
        {/* Sign Up Form */}
        <Col className="login_signup">
          <h1>Register</h1>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                onChange={this.handleForm}
                type="text"
                name="name"
                placeholder="Enter your name"
                value={this.state.name}
              />
              {name ? (
                <div className="alert-sm alert-danger p-2">{name}</div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <Label for="email">Username</Label>
              <Input
                onChange={this.handleForm}
                type="email"
                name="email"
                placeholder="Enter a valid email"
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
                placeholder="Enter a complex password"
                value={this.state.password}
              />
              {password ? (
                <div className="alert-sm alert-danger p-2">{password}</div>
              ) : null}
            </FormGroup>
            <Button
              color="primary"
              className="mt-2"
              onClick={this.handleSubmit}
            >
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
      </React.Fragment>
    );
  }
}
