import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              onChange={this.handleForm}
              type="username"
              name="username"
              placeholder="Enter a username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              onChange={this.handleForm}
              type="email"
              name="email"
              placeholder="Enter an email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              onChange={this.handleForm}
              type="password"
              name="password"
              placeholder="Enter a complex password"
            />
          </FormGroup>
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
          <Button color="primary">Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}
