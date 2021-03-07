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
  };

  handleForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <Row style={{ display: 'flex' }}>
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Username</Label>
              <Input
                onChange={this.handleForm}
                type="email"
                name="email"
                placeholder="Enter a valid email"
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
            <Button
              color="primary"
              onClick={() => RegisterUser({ name, email, password })}
            >
              Submit
            </Button>
            <Button color="danger" className="mx-2">
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
